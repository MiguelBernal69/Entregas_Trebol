import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/order.dart';
import '../services/order_service.dart';
import '../providers/auth_provider.dart';
import 'map_screen.dart';
import '../widgets/client_details_sheet.dart';
import '../widgets/delivery_form.dart';
import '../widgets/order_receipt_modal.dart';
import '../config/api.dart';
import '../config/version.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final GlobalKey<_PaginatedOrderListState> _pendingListKey = GlobalKey();
  final GlobalKey<_PaginatedOrderListState> _historyListKey = GlobalKey();
  List<Order> _pendingOrders = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _tabController.addListener(() {
      if (mounted) setState(() {});
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _onPendingOrdersUpdated(List<Order> orders) {
    _pendingOrders = orders;
  }

  void _refreshAll() {
    _pendingListKey.currentState?.refresh();
    _historyListKey.currentState?.refresh();
  }

  Future<void> _openPendingMap() async {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(child: CircularProgressIndicator()),
    );

    try {
      final allPending = await OrderService.getMyOrders(status: 'asignado');
      if (mounted) {
        Navigator.pop(context);
        if (allPending.isEmpty) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('No tienes pedidos pendientes para mostrar en el mapa'),
              duration: Duration(seconds: 3),
              behavior: SnackBarBehavior.floating,
            ),
          );
          return;
        }
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => MapScreen(
              orders: allPending,
              title: 'Mapa - Pendientes (${allPending.length})',
            ),
          ),
        ).then((_) => _refreshAll());
      }
    } catch (_) {
      if (mounted) {
        Navigator.pop(context);
        if (_pendingOrders.isNotEmpty) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => MapScreen(
                orders: _pendingOrders,
                title: 'Mapa - Pendientes (${_pendingOrders.length})',
              ),
            ),
          ).then((_) => _refreshAll());
        }
      }
    }
  }

  Future<void> _openDeliveredMap() async {
    final now = DateTime.now();
    final today =
        "${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}";

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(child: CircularProgressIndicator()),
    );

    try {
      final delivered = await OrderService.getMyOrders(
        status: 'entregado',
        date: today,
      );
      if (mounted) {
        Navigator.pop(context);
        if (delivered.isEmpty) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Aún no tienes pedidos entregados hoy para ver en el mapa'),
              duration: Duration(seconds: 3),
              behavior: SnackBarBehavior.floating,
            ),
          );
          return;
        }
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => MapScreen(
              orders: delivered,
              title: 'Mapa - Entregados Hoy (${delivered.length})',
            ),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al cargar mapa de entregados: $e'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 3),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  /// Muestra el diálogo de entrega con cantidades editables para entrega parcial
  Future<void> _deliver(Order order) async {
    final result = await showModalBottomSheet<Map<String, dynamic>?>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) => DeliveryForm(order: order),
    );

    if (result == null) return;

    final deliveredItems = result['deliveredItems'] as List<Map<String, int>>;
    final notes = result['notes'] as String?;

    // Determinar si es entrega completa o parcial
    bool isPartial = false;
    for (var item in deliveredItems) {
      final orderItem = order.items.firstWhere((i) => i.id == item['orderItemId']);
      if (item['deliveredQuantity']! < orderItem.quantity) {
        isPartial = true;
        break;
      }
    }

    try {
      final ok = await OrderService.deliverOrder(
        order.id,
        deliveredItems: deliveredItems,
        notes: notes,
      );

      if (ok && mounted) {
        final messenger = ScaffoldMessenger.of(context);
        messenger.clearSnackBars();
        messenger.showSnackBar(
          SnackBar(
            content: Text(isPartial ? '⚠️ Entrega parcial registrada' : '✅ Pedido entregado'),
            backgroundColor: isPartial ? Colors.orange : Colors.green,
            duration: const Duration(seconds: 3),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            action: SnackBarAction(
              label: 'VER BOLETA',
              textColor: Colors.white,
              onPressed: () {
                messenger.hideCurrentSnackBar();
                final userName = context.read<AuthProvider>().user?.name;
                OrderReceiptModal.show(
                  context,
                  order: order,
                  distributorName: userName,
                );
              },
            ),
          ),
        );

        // Forzar cierre a los 3 segundos para evitar que el sistema de accesibilidad de Android/Samsung lo deje congelado
        Future.delayed(const Duration(seconds: 3), () {
          try {
            messenger.hideCurrentSnackBar();
          } catch (_) {}
        });

        // Quitar de pendientes al instante y actualizar historial
        _pendingListKey.currentState?.removeOrder(order.id);
        _historyListKey.currentState?.refresh();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString().replaceAll('Exception: ', '')),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = context.read<AuthProvider>().user;
    final now = DateTime.now();
    final today =
        "${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}";

    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6),
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Text(
                  'Mi Ruta',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFF6FF),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: const Color(0xFFBFDBFE)),
                  ),
                  child: const Text(
                    AppVersion.version,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF2563EB),
                    ),
                  ),
                ),
              ],
            ),
            Text(
              'Hola, ${user?.name ?? ''}',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(
              _tabController.index == 0 ? Icons.map_outlined : Icons.pin_drop,
              color: _tabController.index == 0 ? null : const Color(0xFF10B981),
            ),
            tooltip: _tabController.index == 0
                ? 'Ver mapa de ruta pendiente'
                : 'Ver mapa de entregados hoy',
            onPressed: () {
              if (_tabController.index == 0) {
                _openPendingMap();
              } else {
                _openDeliveredMap();
              }
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => context.read<AuthProvider>().logout(),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: const Color(0xFF3B82F6),
          labelColor: const Color(0xFF3B82F6),
          unselectedLabelColor: Colors.grey,
          tabs: const [
            Tab(text: 'Pendientes', icon: Icon(Icons.pending_actions)),
            Tab(text: 'Historial Hoy', icon: Icon(Icons.history)),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _PaginatedOrderList(
            key: _pendingListKey,
            status: 'asignado',
            emptyMessage: 'No tienes pedidos pendientes',
            onDeliver: _deliver,
            onOrdersUpdated: _onPendingOrdersUpdated,
          ),
          _PaginatedOrderList(
            key: _historyListKey,
            status: 'entregado',
            date: today,
            emptyMessage: 'Aún no has entregado pedidos hoy',
            isHistory: true,
            headerWidget: Container(
              margin: const EdgeInsets.only(bottom: 12),
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: _openDeliveredMap,
                icon: const Icon(Icons.map_outlined, color: Colors.white, size: 20),
                label: const Text(
                  'Ver mapa de entregados hoy',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                  elevation: 1,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ─── Lista de pedidos con Paginación Infinita ──────────────────────

class _PaginatedOrderList extends StatefulWidget {
  final String status;
  final String? date;
  final String emptyMessage;
  final bool isHistory;
  final Function(Order)? onDeliver;
  final Function(List<Order>)? onOrdersUpdated;
  final Widget? headerWidget;

  const _PaginatedOrderList({
    super.key,
    required this.status,
    this.date,
    required this.emptyMessage,
    this.isHistory = false,
    this.onDeliver,
    this.onOrdersUpdated,
    this.headerWidget,
  });

  @override
  State<_PaginatedOrderList> createState() => _PaginatedOrderListState();
}

class _PaginatedOrderListState extends State<_PaginatedOrderList>
    with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;

  final ScrollController _scrollController = ScrollController();
  final List<Order> _orders = [];
  bool _loading = true;
  bool _loadingMore = false;
  bool _hasMore = true;

  // Tamaño de página: carga rápida inicial y al bajar scroll
  static const int _pageSize = 15;

  @override
  void initState() {
    super.initState();
    _fetchInitial();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (!_scrollController.hasClients) return;
    if (_scrollController.position.pixels >=
            _scrollController.position.maxScrollExtent - 250 &&
        !_loadingMore &&
        !_loading &&
        _hasMore) {
      _loadMore();
    }
  }

  Future<void> _fetchInitial() async {
    setState(() {
      _loading = true;
      _hasMore = true;
    });

    try {
      final results = await OrderService.getMyOrders(
        status: widget.status,
        date: widget.date,
        skip: 0,
        take: _pageSize,
      );

      if (mounted) {
        setState(() {
          _orders.clear();
          _orders.addAll(results);
          _loading = false;
          _hasMore = results.length >= _pageSize;
        });
        widget.onOrdersUpdated?.call(_orders);
      }
    } catch (_) {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  Future<void> _loadMore() async {
    if (_loadingMore || !_hasMore) return;

    setState(() => _loadingMore = true);

    try {
      final results = await OrderService.getMyOrders(
        status: widget.status,
        date: widget.date,
        skip: _orders.length,
        take: _pageSize,
      );

      if (mounted) {
        setState(() {
          _orders.addAll(results);
          _loadingMore = false;
          _hasMore = results.length >= _pageSize;
        });
        widget.onOrdersUpdated?.call(_orders);
      }
    } catch (_) {
      if (mounted) {
        setState(() => _loadingMore = false);
      }
    }
  }

  Future<void> refresh() async {
    await _fetchInitial();
  }

  void removeOrder(int orderId) {
    setState(() {
      _orders.removeWhere((o) => o.id == orderId);
    });
    widget.onOrdersUpdated?.call(_orders);
    // Si quedan pocos elementos en pantalla y hay más en el servidor, pedir la siguiente tanda
    if (_orders.length < 5 && _hasMore && !_loadingMore) {
      _loadMore();
    }
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);

    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }

    final hasHeader = widget.headerWidget != null;

    if (_orders.isEmpty) {
      return RefreshIndicator(
        onRefresh: _fetchInitial,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16),
          children: [
            if (hasHeader) widget.headerWidget!,
            SizedBox(height: MediaQuery.of(context).size.height * 0.2),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(widget.isHistory ? '🕒' : '📦',
                      style: const TextStyle(fontSize: 48)),
                  const SizedBox(height: 12),
                  Text(widget.emptyMessage,
                      style: const TextStyle(color: Colors.grey)),
                ],
              ),
            ),
          ],
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _fetchInitial,
      child: ListView.builder(
        controller: _scrollController,
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.all(16),
        itemCount: _orders.length + 1 + (hasHeader ? 1 : 0),
        itemBuilder: (context, index) {
          if (hasHeader && index == 0) {
            return widget.headerWidget!;
          }

          final orderIndex = hasHeader ? index - 1 : index;

          if (orderIndex < _orders.length) {
            final order = _orders[orderIndex];
            return _OrderCard(
              order: order,
              onDeliver: widget.onDeliver != null
                  ? () => widget.onDeliver!(order)
                  : null,
              isHistory: widget.isHistory,
              onUpdate: _fetchInitial,
            );
          }

          // Pie de lista: indicador de carga infinita o fin de lista
          if (_loadingMore) {
            return const Padding(
              padding: EdgeInsets.symmetric(vertical: 20),
              child: Center(
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(strokeWidth: 2.5),
                    ),
                    SizedBox(width: 12),
                    Text(
                      'Cargando más pedidos...',
                      style: TextStyle(color: Colors.grey, fontSize: 13),
                    ),
                  ],
                ),
              ),
            );
          }

          if (!_hasMore && _orders.length >= _pageSize) {
            return Padding(
              padding: const EdgeInsets.only(top: 8, bottom: 24),
              child: Center(
                child: Text(
                  'Has llegado al final • ${_orders.length} pedidos',
                  style: TextStyle(
                    color: Colors.grey.shade400,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            );
          }

          return const SizedBox(height: 16);
        },
      ),
    );
  }
}

// ─── Card de cada pedido ───────────────────────────────────

class _OrderCard extends StatelessWidget {
  final Order order;
  final VoidCallback? onDeliver;
  final bool isHistory;
  final VoidCallback? onUpdate;

  const _OrderCard({
    required this.order,
    this.onDeliver,
    this.isHistory = false,
    this.onUpdate,
  });

  @override
  Widget build(BuildContext context) {
    final bool isPartial = order.isPartial;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: _getStatusColor(isHistory, isPartial).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _getStatusLabel(isHistory, isPartial, order.id),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                      color: _getStatusColor(isHistory, isPartial),
                    ),
                  ),
                ),
                const Spacer(),
                const Icon(Icons.location_on, size: 14, color: Colors.grey),
                const SizedBox(width: 2),
                Flexible(
                  child: Text(
                    order.client.address,
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Cliente
            Row(
              children: [
                if (order.client.photoUrl != null &&
                    order.client.photoUrl!.isNotEmpty)
                  ClipOval(
                    child: Image.network(
                      Api.getImageUrl(order.client.photoUrl!),
                      height: 36,
                      width: 36,
                      fit: BoxFit.cover,
                      errorBuilder: (_, _, _) => const Icon(
                        Icons.store,
                        size: 18,
                        color: Colors.blueGrey,
                      ),
                    ),
                  )
                else
                  const Icon(Icons.store, size: 18, color: Colors.blueGrey),
                const SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        order.client.name,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        order.client.ownerName,
                        style: const TextStyle(
                          fontSize: 13,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.account_circle, color: Colors.blue),
                  onPressed: () {
                    ClientDetailsSheet.show(
                      context,
                      id: order.client.id,
                      name: order.client.name,
                      ownerName: order.client.ownerName,
                      phone: order.client.phone,
                      address: order.client.address,
                      latitude: order.client.latitude,
                      longitude: order.client.longitude,
                      photoUrl: order.client.photoUrl,
                      onUpdate: onUpdate,
                    );
                  },
                ),
              ],
            ),
            const SizedBox(height: 8),

            // Teléfono
            Row(
              children: [
                const Icon(Icons.phone, size: 16, color: Colors.grey),
                const SizedBox(width: 8),
                Text(order.client.phone, style: const TextStyle(fontSize: 13)),
              ],
            ),

            if (order.notes != null) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.note, size: 16, color: Colors.orange),
                  const SizedBox(width: 8),
                  Flexible(
                    child: Text(
                      order.notes!,
                      style: const TextStyle(fontSize: 13),
                    ),
                  ),
                ],
              ),
            ],

            const Divider(height: 20),

            // Productos Regulares
            ...order.items.where((i) => !i.isBonification).map(
              (item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 2.5),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Row(
                        children: [
                          Flexible(
                            child: RichText(
                              text: TextSpan(
                                style: const TextStyle(fontSize: 13, color: Colors.black87),
                                children: [
                                  TextSpan(
                                    text: '${item.productName} x${item.quantity}',
                                    style: const TextStyle(fontWeight: FontWeight.w600),
                                  ),
                                  TextSpan(
                                    text: ' (Bs. ${item.unitPrice.toStringAsFixed(1)} c/u)',
                                    style: TextStyle(color: Colors.grey.shade600, fontSize: 11),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          // Mostrar cantidad entregada si es parcial
                          if (isHistory && item.deliveredQuantity != null && item.deliveredQuantity! < item.quantity) ...[
                            const SizedBox(width: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                              decoration: BoxDecoration(
                                color: Colors.orange.shade50,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                '→ ${item.deliveredQuantity}',
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.orange.shade800,
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    Text(
                      'Bs. ${(item.unitPrice * (isHistory ? item.actualDelivered : item.quantity)).toStringAsFixed(2)}',
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: Colors.black87,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Ítems de Bonificación (Regalos sin costo)
            if (order.items.any((i) => i.isBonification)) ...[
              const SizedBox(height: 4),
              ...order.items.where((i) => i.isBonification).map(
                (item) => Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2.5),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1.5),
                            decoration: BoxDecoration(
                              color: const Color(0xFFECFDF5),
                              borderRadius: BorderRadius.circular(5),
                              border: Border.all(color: const Color(0xFFA7F3D0)),
                            ),
                            child: const Text(
                              '🎁 Bonif.',
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF059669),
                              ),
                            ),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            '${item.productName} x${item.quantity}',
                            style: const TextStyle(
                              fontSize: 13,
                              color: Color(0xFF065F46),
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                        decoration: BoxDecoration(
                          color: const Color(0xFFECFDF5),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: const Text(
                          'GRATIS',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFF059669),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],

            const Divider(height: 16),
            if (order.discount > 0) ...[
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Subtotal productos:', style: TextStyle(fontSize: 12, color: Colors.grey)),
                  Text(
                    'Bs. ${(isHistory ? order.subtotalEntregado : order.subtotal).toStringAsFixed(2)}',
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),
              const SizedBox(height: 2),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1.5),
                    decoration: BoxDecoration(
                      color: Colors.amber.shade50,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: Colors.amber.shade300),
                    ),
                    child: const Text(
                      '🏷️ Descuento preventista',
                      style: TextStyle(fontSize: 11, color: Color(0xFFB45309), fontWeight: FontWeight.bold),
                    ),
                  ),
                  Text(
                    '- Bs. ${order.discount.toStringAsFixed(2)}',
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.red),
                  ),
                ],
              ),
              const SizedBox(height: 4),
            ],
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  isHistory && order.isPartial
                      ? 'Total cobrado'
                      : (order.discount > 0 ? 'Total a cobrar' : 'Total'),
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                ),
                Text(
                  'Bs. ${(isHistory ? order.totalEntregado : order.total).toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                    color: Color(0xFF3B82F6),
                  ),
                ),
              ],
            ),

            if (!isHistory) ...[
              const SizedBox(height: 12),
              // Botones en pendientes
              Row(
                children: [
                  OutlinedButton.icon(
                    onPressed: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) =>
                            MapScreen(orders: [order], focusOrder: order),
                      ),
                    ),
                    icon: const Icon(Icons.map_outlined, size: 16),
                    label: const Text('Mapa'),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 11),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  OutlinedButton.icon(
                    onPressed: () {
                      final userName = context.read<AuthProvider>().user?.name;
                      OrderReceiptModal.show(
                        context,
                        order: order,
                        distributorName: userName,
                      );
                    },
                    icon: const Icon(Icons.print, size: 16, color: Color(0xFF2563EB)),
                    label: const Text('Boleta', style: TextStyle(color: Color(0xFF2563EB), fontWeight: FontWeight.bold)),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 11),
                      side: const BorderSide(color: Color(0xFFBFDBFE)),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                  if (onDeliver != null) ...[
                    const SizedBox(width: 8),
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: onDeliver,
                        icon: const Icon(Icons.check_circle_outline, size: 16),
                        label: const Text('Entregar'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          foregroundColor: Colors.white,
                          elevation: 0,
                          padding: const EdgeInsets.symmetric(vertical: 11),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ],

            if (isHistory) ...[
              const SizedBox(height: 12),
              Row(
                children: [
                  OutlinedButton.icon(
                    onPressed: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => MapScreen(
                          orders: [order],
                          focusOrder: order,
                          title: 'Ubicación entrega #${order.id}',
                        ),
                      ),
                    ),
                    icon: const Icon(Icons.map_outlined, size: 16, color: Color(0xFF10B981)),
                    label: const Text(
                      'Mapa',
                      style: TextStyle(
                        color: Color(0xFF10B981),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 11),
                      side: const BorderSide(color: Color(0xFFA7F3D0)),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        final userName = context.read<AuthProvider>().user?.name;
                        OrderReceiptModal.show(
                          context,
                          order: order,
                          distributorName: userName,
                        );
                      },
                      icon: const Icon(Icons.print, size: 16, color: Color(0xFF2563EB)),
                      label: const Text(
                        'Ver / Imprimir Boleta',
                        style: TextStyle(color: Color(0xFF2563EB), fontWeight: FontWeight.bold),
                      ),
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: Color(0xFFBFDBFE)),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        padding: const EdgeInsets.symmetric(vertical: 11),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }

  Color _getStatusColor(bool history, bool partial) {
    if (!history) return const Color(0xFF8B5CF6);
    if (partial) return Colors.orange;
    return Colors.green;
  }

  String _getStatusLabel(bool history, bool partial, int orderId) {
    if (!history) return 'Pedido #$orderId';
    if (partial) return 'PARCIAL';
    return 'ENTREGADO';
  }
}
