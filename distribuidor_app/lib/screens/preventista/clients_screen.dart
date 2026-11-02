import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../../models/client.dart';
import '../../services/client_service.dart';
import '../../services/preventista_order_service.dart';
import '../../services/visit_service.dart';
import '../../services/region_service.dart';
import '../../config/api.dart';
import '../../widgets/client_details_sheet.dart';
import 'preventista_orders_screen.dart';

class ClientsScreen extends StatefulWidget {
  const ClientsScreen({super.key});

  @override
  State<ClientsScreen> createState() => _ClientsScreenState();
}

class _ClientsScreenState extends State<ClientsScreen> with WidgetsBindingObserver {
  List<Client> _clients = [];
  Set<int> _orderVisitedClientIds = {};
  Set<int> _noOrderVisitedClientIds = {};
  Set<int> get _visitedClientIds => {..._orderVisitedClientIds, ..._noOrderVisitedClientIds};

  List<RegionInfo> _myZones = [];
  bool _loading = true;
  bool _showVisited = false;
  DateTime _lastFetchDate = DateTime.now();

  Position? _myPosition;
  StreamSubscription<Position>? _positionStream;
  final MapController _mapController = MapController();

  Color _parseZoneColor(String hex) {
    try {
      final clean = hex.replaceAll('#', '');
      return Color(int.parse('FF$clean', radix: 16));
    } catch (_) {
      return const Color(0xFF3B82F6);
    }
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _lastFetchDate = DateTime.now();
    _fetchClients();
    _initLocationStream();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _positionStream?.cancel();
    super.dispose();
  }

  Future<void> _initLocationStream() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) return;

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) return;
      }

      if (permission == LocationPermission.deniedForever) return;

      try {
        final pos = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
        );
        if (mounted) setState(() => _myPosition = pos);
      } catch (_) {}

      _positionStream = Geolocator.getPositionStream(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          distanceFilter: 3,
        ),
      ).listen((Position position) {
        if (mounted) setState(() => _myPosition = position);
      });
    } catch (_) {}
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      final now = DateTime.now();
      // Si el día calendario cambió (a medianoche o al reabrir la app), recargar para resetear visitados
      if (now.day != _lastFetchDate.day || now.month != _lastFetchDate.month || now.year != _lastFetchDate.year) {
        _lastFetchDate = now;
        _fetchClients();
      } else {
        _refreshVisited();
      }
    }
  }

  Future<void> _fetchClients() async {
    setState(() => _loading = true);
    try {
      final results = await Future.wait([
        ClientService.getClients(),
        PreventistaOrderService.getMyVisitedToday(),
        VisitService.getNoOrderVisitedToday(),
        RegionService.getMyRegions(),
      ]);
      setState(() {
        _clients = results[0] as List<Client>;
        _orderVisitedClientIds = (results[1] as List<int>).toSet();
        _noOrderVisitedClientIds = results[2] as Set<int>;
        _myZones = results[3] as List<RegionInfo>;
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  Future<void> _refreshVisited() async {
    try {
      final results = await Future.wait([
        PreventistaOrderService.getMyVisitedToday(),
        VisitService.getNoOrderVisitedToday(),
      ]);
      setState(() {
        _orderVisitedClientIds = (results[0] as List<int>).toSet();
        _noOrderVisitedClientIds = results[1] as Set<int>;
      });
    } catch (_) {}
  }

  Future<void> _markNoOrder(Client client) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: [
            Icon(Icons.storefront_outlined, color: Colors.amber.shade700),
            const SizedBox(width: 8),
            const Text('Registrar Visita', style: TextStyle(fontSize: 18)),
          ],
        ),
        content: Text(
          '¿Marcar a "${client.name}" como visitado sin compra hoy?\n\nEl punto se marcará como visitado y no quedará pendiente.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFD97706),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: const Text('Confirmar'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      await VisitService.markAsVisitedNoOrder(client.id);
      await _refreshVisited();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Visita registrada para ${client.name} (Sin pedido)'),
            backgroundColor: Colors.amber.shade800,
            duration: const Duration(seconds: 3),
          ),
        );
      }
    }
  }

  Future<void> _unmarkNoOrder(Client client) async {
    await VisitService.unmarkVisitedNoOrder(client.id);
    await _refreshVisited();
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('"${client.name}" volvió a estar pendiente de visita'),
          duration: const Duration(seconds: 3),
        ),
      );
    }
  }

  void _showClientDetails(Client client) {
    ClientDetailsSheet.show(
      context,
      id: client.id,
      name: client.name,
      ownerName: client.ownerName,
      phone: client.phone,
      address: client.address,
      latitude: client.latitude,
      longitude: client.longitude,
      photoUrl: client.photoUrl,
      isVisited: _visitedClientIds.contains(client.id),
      visitedWithOrder: _orderVisitedClientIds.contains(client.id),
      onUpdate: _fetchClients,
      onCreateOrder: () => _openOrderSheet(client),
      onMarkNoOrder: () => _markNoOrder(client),
      onUnmarkNoOrder: () => _unmarkNoOrder(client),
    );
  }

  void _openOrderSheet(Client client) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => CreateOrderSheet(
        initialClient: client,
        onSaved: () {
          Navigator.pop(context);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Pedido credo exitosamente')),
          );
          _refreshVisited();
        },
      ),
    );
  }

  void _openForm({Client? client}) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => ClientFormSheet(
        client: client,
        onSaved: () {
          Navigator.pop(context);
          _fetchClients();
        },
      ),
    );
  }

  Future<void> _delete(int id) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Desactivar cliente'),
        content: const Text('¿Estás seguro?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text(
              'Desactivar',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
    if (confirm != true) return;
    await ClientService.deleteClient(id);
    _fetchClients();
  }

  bool _isMapMode = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6),
      appBar: AppBar(
        title: const Text('Directorio de Clientes'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Actualizar clientes y pedidos de hoy',
            onPressed: _fetchClients,
          ),
          Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: SegmentedButton<bool>(
              segments: const [
                ButtonSegment(
                  value: false,
                  icon: Icon(Icons.list),
                  label: Text('Lista'),
                ),
                ButtonSegment(
                  value: true,
                  icon: Icon(Icons.map_outlined),
                  label: Text('Mapa'),
                ),
              ],
              selected: {_isMapMode},
              onSelectionChanged: (Set<bool> newSelection) {
                setState(() {
                  _isMapMode = newSelection.first;
                });
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _openForm(),
        backgroundColor: const Color(0xFF3B82F6),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _clients.isEmpty
          ? const Center(
              child: Text(
                'No hay clientes registrados',
                style: TextStyle(color: Colors.grey),
              ),
            )
          : _isMapMode
          ? Stack(
              children: [
                FlutterMap(
                  mapController: _mapController,
                  options: MapOptions(
                    initialCenter: _myPosition != null
                        ? LatLng(_myPosition!.latitude, _myPosition!.longitude)
                        : (_clients.isNotEmpty && _clients.first.latitude != 0.0
                            ? LatLng(
                                _clients.first.latitude,
                                _clients.first.longitude,
                              )
                            : const LatLng(-17.3895, -66.1568)),
                    initialZoom: 14,
                  ),
                  children: [
                    TileLayer(
                      urlTemplate:
                          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                      userAgentPackageName: 'com.example.distribuidor_app',
                    ),
                    if (_myZones.isNotEmpty)
                      PolygonLayer(
                        polygons: _myZones
                            .where((z) => z.points.isNotEmpty)
                            .map((zone) {
                              final color = _parseZoneColor(zone.color);
                              return Polygon(
                                points: zone.points,
                                color: color.withValues(alpha: 0.18),
                                borderColor: color,
                                borderStrokeWidth: 2.5,
                                isFilled: true,
                                label: zone.name,
                              );
                            })
                            .toList(),
                      ),
                    MarkerLayer(
                      markers: [
                        ..._clients
                            .where((c) {
                              if (_visitedClientIds.contains(c.id)) {
                                return _showVisited;
                              }
                              return true;
                            })
                            .map((client) {
                              final isVisited = _visitedClientIds.contains(
                                client.id,
                              );
                              final withOrder = _orderVisitedClientIds.contains(
                                client.id,
                              );
                              return Marker(
                                point: LatLng(client.latitude, client.longitude),
                                width: 40,
                                height: 40,
                                child: GestureDetector(
                                  onTap: () => _showClientDetails(client),
                                  child: Icon(
                                    Icons.location_pin,
                                    color: !isVisited
                                        ? Colors.red
                                        : (withOrder
                                            ? Colors.blue
                                            : Colors.amber.shade700),
                                    size: 40,
                                  ),
                                ),
                              );
                            }),
                        // Mi ubicación en tiempo real
                        if (_myPosition != null)
                          Marker(
                            point: LatLng(
                              _myPosition!.latitude,
                              _myPosition!.longitude,
                            ),
                            width: 44,
                            height: 44,
                            child: Stack(
                              alignment: Alignment.center,
                              children: [
                                Container(
                                  width: 44,
                                  height: 44,
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF3B82F6).withValues(alpha: 0.25),
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                Container(
                                  width: 22,
                                  height: 22,
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF2563EB),
                                    shape: BoxShape.circle,
                                    border: Border.all(color: Colors.white, width: 3),
                                    boxShadow: const [
                                      BoxShadow(
                                        color: Colors.black26,
                                        blurRadius: 4,
                                        offset: Offset(0, 2),
                                      ),
                                    ],
                                  ),
                                  child: const Icon(
                                    Icons.person,
                                    size: 12,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                      ],
                    ),
                  ],
                ),
                // HUD Superior
                Positioned(
                  top: 10,
                  left: 10,
                  right: 10,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.95),
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: const [
                        BoxShadow(color: Colors.black12, blurRadius: 4),
                      ],
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          children: [
                            const Text(
                              '✅ Visitados',
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: Colors.green,
                              ),
                            ),
                            Text(
                              '${_visitedClientIds.length}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        Container(
                          width: 1,
                          height: 20,
                          color: Colors.grey.shade300,
                        ),
                        Column(
                          children: [
                            const Text(
                              '🔴 Ptes',
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: Colors.red,
                              ),
                            ),
                            Text(
                              '${_clients.length - _visitedClientIds.length}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        Container(
                          width: 1,
                          height: 20,
                          color: Colors.grey.shade300,
                        ),
                        Column(
                          children: [
                            const Text(
                              '📋 Total',
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey,
                              ),
                            ),
                            Text(
                              '${_clients.length}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        Container(
                          width: 1,
                          height: 20,
                          color: Colors.grey.shade300,
                        ),
                        GestureDetector(
                          onTap: () =>
                              setState(() => _showVisited = !_showVisited),
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: _showVisited
                                  ? Colors.blue
                                  : Colors.blue.shade50,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              _showVisited
                                  ? 'Ocultar\nvisitados'
                                  : 'Ver\nvisitados',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: _showVisited
                                    ? Colors.white
                                    : Colors.blue,
                              ),
                            ),
                          ),
                        ),
                        Container(
                          width: 1,
                          height: 20,
                          color: Colors.grey.shade300,
                        ),
                        InkWell(
                          onTap: _fetchClients,
                          borderRadius: BorderRadius.circular(8),
                          child: Container(
                            padding: const EdgeInsets.all(6),
                            child: const Icon(
                              Icons.refresh,
                              size: 20,
                              color: Color(0xFF3B82F6),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Chips de Zonas asignadas sobre el mapa
                if (_myZones.isNotEmpty)
                  Positioned(
                    top: 75,
                    left: 10,
                    right: 10,
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: _myZones.map((zone) {
                          final color = _parseZoneColor(zone.color);
                          return Container(
                            margin: const EdgeInsets.only(right: 8),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 10,
                              vertical: 5,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.95),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(color: color, width: 1.5),
                              boxShadow: const [
                                BoxShadow(color: Colors.black12, blurRadius: 4),
                              ],
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Container(
                                  width: 8,
                                  height: 8,
                                  decoration: BoxDecoration(
                                    color: color,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  zone.name,
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                    color: color,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                  ),

                // Botón flotante para centrar en mi ubicación GPS
                Positioned(
                  bottom: 80,
                  right: 16,
                  child: FloatingActionButton.small(
                    heroTag: 'my_location_clients_map',
                    backgroundColor: Colors.white,
                    elevation: 4,
                    onPressed: () async {
                      if (_myPosition != null) {
                        _mapController.move(
                          LatLng(_myPosition!.latitude, _myPosition!.longitude),
                          16,
                        );
                      } else {
                        final messenger = ScaffoldMessenger.of(context);
                        await _initLocationStream();
                        if (_myPosition != null) {
                          _mapController.move(
                            LatLng(_myPosition!.latitude, _myPosition!.longitude),
                            16,
                          );
                        } else {
                          messenger.showSnackBar(
                            const SnackBar(
                              content: Text('Obteniendo ubicación GPS... Verifica tener el GPS activado.'),
                            ),
                          );
                        }
                      }
                    },
                    child: const Icon(Icons.my_location, color: Color(0xFF2563EB)),
                  ),
                ),
              ],
            )
          : RefreshIndicator(
              onRefresh: _fetchClients,
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: _clients.length,
                itemBuilder: (context, index) {
                  final client = _clients[index];
                  final isVisited = _visitedClientIds.contains(client.id);
                  final withOrder = _orderVisitedClientIds.contains(client.id);

                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                    child: ListTile(
                      onTap: () => _showClientDetails(client),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      leading: CircleAvatar(
                        backgroundColor: isVisited
                            ? (withOrder
                                ? const Color(0xFFDCFCE7)
                                : const Color(0xFFFEF3C7))
                            : const Color(0xFF3B82F6).withValues(alpha: 0.1),
                        child: Text(
                          isVisited ? '✓' : '🏪',
                          style: TextStyle(
                            fontSize: isVisited ? 18 : 20,
                            fontWeight: FontWeight.bold,
                            color: isVisited
                                ? (withOrder
                                    ? const Color(0xFF16A34A)
                                    : const Color(0xFFD97706))
                                : Colors.black,
                          ),
                        ),
                      ),
                      title: Text(
                        client.name,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (isVisited)
                            Container(
                              margin: const EdgeInsets.only(top: 2, bottom: 4),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 6,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: withOrder
                                    ? const Color(0xFFDCFCE7)
                                    : const Color(0xFFFEF3C7),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                withOrder ? '✓ Con Pedido' : '✓ Visitado (Sin Compra)',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: withOrder
                                      ? const Color(0xFF16A34A)
                                      : const Color(0xFFD97706),
                                ),
                              ),
                            ),
                          Text(
                            client.ownerName,
                            style: const TextStyle(fontSize: 13),
                          ),
                          Text(
                            client.address,
                            style: const TextStyle(
                              fontSize: 12,
                              color: Colors.grey,
                            ),
                          ),
                          Text(
                            client.phone,
                            style: const TextStyle(
                              fontSize: 12,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                      trailing: PopupMenuButton(
                        itemBuilder: (_) => [
                          const PopupMenuItem(
                            value: 'edit',
                            child: Text('Editar'),
                          ),
                          const PopupMenuItem(
                            value: 'delete',
                            child: Text(
                              'Desactivar',
                              style: TextStyle(color: Colors.red),
                            ),
                          ),
                        ],
                        onSelected: (val) {
                          if (val == 'edit') _openForm(client: client);
                          if (val == 'delete') _delete(client.id);
                        },
                      ),
                    ),
                  );
                },
              ),
            ),
    );
  }
}

// ── Formulario en bottom sheet con mapa ──────────────────────
class ClientFormSheet extends StatefulWidget {
  final Client? client;
  final VoidCallback onSaved;

  const ClientFormSheet({super.key, this.client, required this.onSaved});

  @override
  State<ClientFormSheet> createState() => _ClientFormSheetState();
}

class _ClientFormSheetState extends State<ClientFormSheet> {
  final _nameCtrl = TextEditingController();
  final _ownerCtrl = TextEditingController();
  final _phoneCtrl = TextEditingController();
  final _addressCtrl = TextEditingController();
  double? _lat;
  double? _lng;
  bool _saving = false;
  String? _error;
  bool _showMap = false;
  File? _imageFile;

  Future<void> _pickImage() async {
    showModalBottomSheet(
      context: context,
      builder: (_) => SafeArea(
        child: Wrap(
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Cámara'),
              onTap: () async {
                Navigator.pop(context);
                final picked = await ImagePicker().pickImage(
                  source: ImageSource.camera,
                  imageQuality: 70,
                );
                if (picked != null) {
                  setState(() => _imageFile = File(picked.path));
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Galería'),
              onTap: () async {
                Navigator.pop(context);
                final picked = await ImagePicker().pickImage(
                  source: ImageSource.gallery,
                  imageQuality: 70,
                );
                if (picked != null) {
                  setState(() => _imageFile = File(picked.path));
                }
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    if (widget.client != null) {
      final c = widget.client!;
      _nameCtrl.text = c.name;
      _ownerCtrl.text = c.ownerName;
      _phoneCtrl.text = c.phone;
      _addressCtrl.text = c.address;
      _lat = c.latitude;
      _lng = c.longitude;
    }
  }

  Future<void> _useMyLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) return;
    LocationPermission perm = await Geolocator.checkPermission();
    if (perm == LocationPermission.denied) {
      perm = await Geolocator.requestPermission();
    }
    if (perm == LocationPermission.denied) return;

    final pos = await Geolocator.getCurrentPosition();
    setState(() {
      _lat = pos.latitude;
      _lng = pos.longitude;
      _showMap = true;
    });
  }

  Future<void> _save() async {
    if (_lat == null || _lng == null) {
      setState(() => _error = 'Debes seleccionar la ubicación en el mapa');
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      if (widget.client != null) {
        await ClientService.updateClient(
          id: widget.client!.id,
          name: _nameCtrl.text,
          ownerName: _ownerCtrl.text,
          phone: _phoneCtrl.text,
          address: _addressCtrl.text,
          latitude: _lat!,
          longitude: _lng!,
          imageFile: _imageFile,
        );
      } else {
        await ClientService.createClient(
          name: _nameCtrl.text,
          ownerName: _ownerCtrl.text,
          phone: _phoneCtrl.text,
          address: _addressCtrl.text,
          latitude: _lat!,
          longitude: _lng!,
          imageFile: _imageFile,
        );
      }
      widget.onSaved();
    } catch (e) {
      setState(() {
        _error = e.toString();
        _saving = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.92,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // Handle
          Container(
            margin: const EdgeInsets.symmetric(vertical: 12),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.grey.shade300,
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              children: [
                Text(
                  widget.client != null ? 'Editar cliente' : 'Nuevo cliente',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Spacer(),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
          ),

          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  GestureDetector(
                    onTap: _pickImage,
                    child: Container(
                      height: 140,
                      width: double.infinity,
                      margin: const EdgeInsets.only(bottom: 20),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: Colors.grey.shade300,
                          style: BorderStyle.solid,
                        ),
                      ),
                      child: _imageFile != null
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(16),
                              child: Image.file(_imageFile!, fit: BoxFit.cover),
                            )
                          : (widget.client?.photoUrl != null &&
                                widget.client!.photoUrl!.isNotEmpty)
                          ? ClipRRect(
                              borderRadius: BorderRadius.circular(16),
                              child: Image.network(
                                widget.client!.photoUrl!.startsWith('http')
                                    ? widget.client!.photoUrl!
                                    : '${Api.baseUrl.replaceAll('/api', '')}/${widget.client!.photoUrl}',
                                fit: BoxFit.cover,
                              ),
                            )
                          : const Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.camera_alt,
                                  size: 40,
                                  color: Colors.grey,
                                ),
                                SizedBox(height: 8),
                                Text(
                                  'Tocar para añadir foto',
                                  style: TextStyle(color: Colors.grey),
                                ),
                              ],
                            ),
                    ),
                  ),
                  _Field(ctrl: _nameCtrl, label: 'Nombre del negocio'),
                  _Field(ctrl: _ownerCtrl, label: 'Nombre del dueño'),
                  _Field(
                    ctrl: _phoneCtrl,
                    label: 'Teléfono',
                    keyboard: TextInputType.phone,
                  ),
                  _Field(ctrl: _addressCtrl, label: 'Dirección'),

                  const SizedBox(height: 12),

                  // Botones de ubicación
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: _useMyLocation,
                          icon: const Icon(Icons.my_location, size: 16),
                          label: const Text('Mi ubicación'),
                          style: OutlinedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () => setState(() => _showMap = true),
                          icon: const Icon(Icons.map_outlined, size: 16),
                          label: const Text('Elegir en mapa'),
                          style: OutlinedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),

                  // Mapa para elegir ubicación
                  if (_showMap) ...[
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: SizedBox(
                        height: 220,
                        child: FlutterMap(
                          options: MapOptions(
                            initialCenter: _lat != null
                                ? LatLng(_lat!, _lng!)
                                : const LatLng(-17.3895, -66.1568),
                            initialZoom: 15,
                            onTap: (_, point) => setState(() {
                              _lat = point.latitude;
                              _lng = point.longitude;
                            }),
                          ),
                          children: [
                            TileLayer(
                              urlTemplate:
                                  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                              userAgentPackageName:
                                  'com.example.distribuidor_app',
                            ),
                            if (_lat != null)
                              MarkerLayer(
                                markers: [
                                  Marker(
                                    point: LatLng(_lat!, _lng!),
                                    width: 40,
                                    height: 40,
                                    child: const Icon(
                                      Icons.location_pin,
                                      color: Colors.red,
                                      size: 40,
                                    ),
                                  ),
                                ],
                              ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Toca el mapa para marcar la ubicación',
                      style: TextStyle(fontSize: 12, color: Colors.grey),
                      textAlign: TextAlign.center,
                    ),
                  ],

                  // Coordenadas
                  if (_lat != null) ...[
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: Colors.green.shade50,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.check_circle,
                            color: Colors.green,
                            size: 16,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'Lat: ${_lat!.toStringAsFixed(5)}, Lng: ${_lng!.toStringAsFixed(5)}',
                            style: const TextStyle(
                              fontSize: 12,
                              color: Colors.green,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],

                  if (_error != null) ...[
                    const SizedBox(height: 10),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.red.shade50,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        _error!,
                        style: TextStyle(
                          color: Colors.red.shade700,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],

                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _saving ? null : _save,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF3B82F6),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: _saving
                          ? const SizedBox(
                              height: 18,
                              width: 18,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2,
                              ),
                            )
                          : Text(
                              widget.client != null
                                  ? 'Guardar cambios'
                                  : 'Crear cliente',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Field extends StatelessWidget {
  final TextEditingController ctrl;
  final String label;
  final TextInputType keyboard;

  const _Field({
    required this.ctrl,
    required this.label,
    this.keyboard = TextInputType.text,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: TextField(
        controller: ctrl,
        keyboardType: keyboard,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 14,
            vertical: 12,
          ),
        ),
      ),
    );
  }
}
