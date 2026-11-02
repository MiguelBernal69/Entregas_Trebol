import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../models/order.dart';
import '../../models/client.dart';
import '../../models/product.dart';
import '../../services/preventista_order_service.dart';
import '../../services/client_service.dart';
import '../../widgets/order_receipt_modal.dart';

const _statusColor = {
  'pendiente': Color(0xFFFEF9C3),
  'aceptado': Color(0xFFDBEAFE),
  'asignado': Color(0xFFEDE9FE),
  'entregado': Color(0xFFDCFCE7),
};

const _statusText = {
  'pendiente': Color(0xFFCA8A04),
  'aceptado': Color(0xFF2563EB),
  'asignado': Color(0xFF7C3AED),
  'entregado': Color(0xFF16A34A),
};

class PreventistaOrdersScreen extends StatefulWidget {
  const PreventistaOrdersScreen({super.key});

  @override
  State<PreventistaOrdersScreen> createState() =>
      _PreventistaOrdersScreenState();
}

class _PreventistaOrdersScreenState extends State<PreventistaOrdersScreen> {
  final List<Order> _orders = [];
  bool _loading = true;
  bool _loadingMore = false;
  int _page = 1;
  bool _hasMore = true;
  final ScrollController _scrollController = ScrollController();

  // Filtros por día y estado
  String _dateFilter = 'today';
  DateTime? _selectedCustomDate;
  String _statusFilter = 'all';

  @override
  void initState() {
    super.initState();
    _fetchOrders();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
            _scrollController.position.maxScrollExtent - 200 &&
        !_loadingMore &&
        _hasMore) {
      _fetchMoreOrders();
    }
  }

  Future<void> _fetchOrders() async {
    setState(() {
      _loading = true;
      _page = 1;
      _hasMore = true;
      _orders.clear();
    });
    try {
      final data = await PreventistaOrderService.getMyOrders(
        page: 1,
        date: _dateFilter,
      );
      setState(() {
        _orders.addAll(data);
        _loading = false;
        if (data.length < 30) _hasMore = false;
      });
    } catch (e) {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  Future<void> _fetchMoreOrders() async {
    setState(() => _loadingMore = true);
    try {
      final nextPage = _page + 1;
      final data = await PreventistaOrderService.getMyOrders(
        page: nextPage,
        date: _dateFilter,
      );
      setState(() {
        _orders.addAll(data);
        _page = nextPage;
        _loadingMore = false;
        if (data.length < 30) _hasMore = false;
      });
    } catch (e) {
      if (mounted) {
        setState(() => _loadingMore = false);
      }
    }
  }

  Future<void> _pickCustomDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _selectedCustomDate ?? DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
      helpText: 'SELECCIONAR JORNADA',
      cancelText: 'CANCELAR',
      confirmText: 'FILTRAR',
    );
    if (picked != null) {
      final formatted =
          "${picked.year}-${picked.month.toString().padLeft(2, '0')}-${picked.day.toString().padLeft(2, '0')}";
      setState(() {
        _dateFilter = formatted;
        _selectedCustomDate = picked;
      });
      _fetchOrders();
    }
  }


  void _openCreateOrder() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => CreateOrderSheet(
        onSaved: () {
          Navigator.pop(context);
          _fetchOrders();
        },
      ),
    );
  }

  void _openEditOrder(Order order) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => CreateOrderSheet(
        initialOrder: order,
        onSaved: () {
          Navigator.pop(context);
          _fetchOrders();
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final filteredOrders = _orders.where((o) {
      if (_statusFilter == 'all') return true;
      if (_statusFilter == 'entregado') {
        return ['entregado', 'entrega_parcial'].contains(o.status);
      }
      return o.status == _statusFilter;
    }).toList();

    final uniqueStores = _orders.map((o) => o.client.id).toSet().length;
    final totalAmount = _orders.fold<double>(
      0.0,
      (sum, o) => sum + o.total,
    );

    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6),
      appBar: AppBar(
        title: const Text('Mis Pedidos por Jornada'),
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchOrders,
            tooltip: 'Recargar',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openCreateOrder,
        backgroundColor: const Color(0xFF3B82F6),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: Column(
        children: [
          // ── Selector de Jornada / Día ──
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _DateFilterChip(
                    label: '☀️ Hoy',
                    isSelected: _dateFilter == 'today',
                    onTap: () {
                      setState(() {
                        _dateFilter = 'today';
                        _selectedCustomDate = null;
                      });
                      _fetchOrders();
                    },
                  ),
                  const SizedBox(width: 8),
                  _DateFilterChip(
                    label: '⏮️ Ayer',
                    isSelected: _dateFilter == 'yesterday',
                    onTap: () {
                      setState(() {
                        _dateFilter = 'yesterday';
                        _selectedCustomDate = null;
                      });
                      _fetchOrders();
                    },
                  ),
                  const SizedBox(width: 8),
                  _DateFilterChip(
                    label: _selectedCustomDate != null
                        ? '📅 $_dateFilter'
                        : '📅 Elegir fecha',
                    isSelected: _selectedCustomDate != null,
                    onTap: _pickCustomDate,
                  ),
                  const SizedBox(width: 8),
                  _DateFilterChip(
                    label: '📋 Ver Todos',
                    isSelected: _dateFilter == 'all',
                    onTap: () {
                      setState(() {
                        _dateFilter = 'all';
                        _selectedCustomDate = null;
                      });
                      _fetchOrders();
                    },
                  ),
                ],
              ),
            ),
          ),

          // ── Resumen de la Jornada ──
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(
                top: BorderSide(color: Colors.grey.shade200),
                bottom: BorderSide(color: Colors.grey.shade200),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _SummaryMetric(
                  icon: Icons.store,
                  label: 'Tiendas',
                  value: '$uniqueStores',
                  color: Colors.blue,
                ),
                Container(width: 1, height: 26, color: Colors.grey.shade200),
                _SummaryMetric(
                  icon: Icons.shopping_bag,
                  label: 'Pedidos',
                  value: '${_orders.length}',
                  color: Colors.indigo,
                ),
                Container(width: 1, height: 26, color: Colors.grey.shade200),
                _SummaryMetric(
                  icon: Icons.monetization_on,
                  label: 'Total',
                  value: 'Bs. ${totalAmount.toStringAsFixed(1)}',
                  color: Colors.green,
                ),
              ],
            ),
          ),

          // ── Filtros por Estado ──
          Container(
            color: const Color(0xFFF9FAFB),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _StatusPill(
                    label: 'Todos (${_orders.length})',
                    isSelected: _statusFilter == 'all',
                    onTap: () => setState(() => _statusFilter = 'all'),
                  ),
                  _StatusPill(
                    label:
                        'Pendientes (${_orders.where((o) => o.status == 'pendiente').length})',
                    isSelected: _statusFilter == 'pendiente',
                    onTap: () => setState(() => _statusFilter = 'pendiente'),
                  ),
                  _StatusPill(
                    label:
                        'Aceptados (${_orders.where((o) => o.status == 'aceptado').length})',
                    isSelected: _statusFilter == 'aceptado',
                    onTap: () => setState(() => _statusFilter = 'aceptado'),
                  ),
                  _StatusPill(
                    label:
                        'Asignados (${_orders.where((o) => o.status == 'asignado').length})',
                    isSelected: _statusFilter == 'asignado',
                    onTap: () => setState(() => _statusFilter = 'asignado'),
                  ),
                  _StatusPill(
                    label:
                        'Entregados (${_orders.where((o) => ['entregado', 'entrega_parcial'].contains(o.status)).length})',
                    isSelected: _statusFilter == 'entregado',
                    onTap: () => setState(() => _statusFilter = 'entregado'),
                  ),
                ],
              ),
            ),
          ),

          // ── Lista de Pedidos ──
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : filteredOrders.isEmpty
                ? Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.receipt_long,
                            size: 48,
                            color: Colors.grey,
                          ),
                          const SizedBox(height: 12),
                          const Text(
                            'No hay pedidos en esta jornada',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.grey,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            _dateFilter == 'today'
                                ? 'Aún no registraste pedidos hoy. Presiona + para agregar uno.'
                                : 'No se encontraron pedidos con los filtros seleccionados.',
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 12,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                : RefreshIndicator(
                    onRefresh: _fetchOrders,
                    child: ListView.builder(
                      controller: _scrollController,
                      padding: const EdgeInsets.all(16),
                      itemCount: filteredOrders.length + (_hasMore ? 1 : 0),
                      itemBuilder: (context, index) {
                        if (index == filteredOrders.length) {
                          return const Padding(
                            padding: EdgeInsets.symmetric(vertical: 24),
                            child: Center(
                              child: CircularProgressIndicator(),
                            ),
                          );
                        }

                        final order = filteredOrders[index];

                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        elevation: 0,
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Text(
                                    'Pedido #${order.id}',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  if (['pendiente', 'aceptado'].contains(order.status)) ...[
                                    InkWell(
                                      onTap: () => _openEditOrder(order),
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 8,
                                          vertical: 3,
                                        ),
                                        decoration: BoxDecoration(
                                          color: Colors.blue.shade50,
                                          borderRadius: BorderRadius.circular(6),
                                          border: Border.all(
                                            color: const Color(0xFF3B82F6),
                                            width: 1,
                                          ),
                                        ),
                                        child: const Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Icon(
                                              Icons.edit,
                                              size: 13,
                                              color: Color(0xFF3B82F6),
                                            ),
                                            SizedBox(width: 4),
                                            Text(
                                              'Editar',
                                              style: TextStyle(
                                                fontSize: 11,
                                                fontWeight: FontWeight.bold,
                                                color: Color(0xFF3B82F6),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 6),
                                  ],
                                  InkWell(
                                    onTap: () => OrderReceiptModal.show(context, order: order),
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 8,
                                        vertical: 3,
                                      ),
                                      decoration: BoxDecoration(
                                        color: Colors.grey.shade100,
                                        borderRadius: BorderRadius.circular(6),
                                        border: Border.all(
                                          color: Colors.grey.shade300,
                                          width: 1,
                                        ),
                                      ),
                                      child: const Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Icon(
                                            Icons.receipt_long,
                                            size: 13,
                                            color: Color(0xFF475569),
                                          ),
                                          SizedBox(width: 4),
                                          Text(
                                            'Boleta',
                                            style: TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFF475569),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  const Spacer(),
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 10,
                                      vertical: 4,
                                    ),
                                    decoration: BoxDecoration(
                                      color: _statusColor[order.status],
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Text(
                                      order.status.toUpperCase(),
                                      style: TextStyle(
                                        fontSize: 10,
                                        fontWeight: FontWeight.w900,
                                        color: _statusText[order.status],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                order.client.name,
                                style: const TextStyle(fontWeight: FontWeight.w600),
                              ),
                              Text(
                                order.client.address,
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: Colors.grey,
                                ),
                              ),
                              if (order.notes != null) ...[
                                const SizedBox(height: 4),
                                Text(
                                  '📝 ${order.notes}',
                                  style: const TextStyle(
                                    fontSize: 13,
                                    color: Colors.orange,
                                  ),
                                ),
                              ],
                              const Divider(height: 16),
                              ...order.items.where((i) => !i.isBonification).map(
                                (item) => Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      '${item.productName} x${item.quantity}',
                                      style: const TextStyle(fontSize: 13),
                                    ),
                                    Text(
                                      'Bs. ${(item.unitPrice * item.quantity).toStringAsFixed(2)}',
                                      style: const TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              // Bonificaciones 🎁
                              if (order.items.any((i) => i.isBonification)) ...[
                                const SizedBox(height: 4),
                                ...order.items.where((i) => i.isBonification).map(
                                  (item) => Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Row(
                                        children: [
                                          Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                                            decoration: BoxDecoration(
                                              color: const Color(0xFFD1FAE5),
                                              borderRadius: BorderRadius.circular(4),
                                              border: Border.all(color: const Color(0xFF6EE7B7)),
                                            ),
                                            child: const Text('🎁 Bon.', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFF065F46))),
                                          ),
                                          const SizedBox(width: 6),
                                          Text('${item.productName} x${item.quantity}', style: const TextStyle(fontSize: 13, color: Color(0xFF059669))),
                                        ],
                                      ),
                                      const Text('GRATIS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF059669))),
                                    ],
                                  ),
                                ),
                              ],
                              const Divider(height: 16),
                              if (order.discount > 0) ...[
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text('Subtotal:', style: TextStyle(fontSize: 12, color: Colors.grey)),
                                    Text('Bs. ${order.subtotal.toStringAsFixed(2)}', style: const TextStyle(fontSize: 12, color: Colors.grey)),
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
                                      child: const Text('🏷️ Descuento preventista', style: TextStyle(fontSize: 11, color: Color(0xFFB45309), fontWeight: FontWeight.bold)),
                                    ),
                                    Text('- Bs. ${order.discount.toStringAsFixed(2)}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.red)),
                                  ],
                                ),
                                const SizedBox(height: 4),
                              ],
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    order.discount > 0 ? 'Total a cobrar' : 'Total',
                                    style: const TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                    'Bs. ${order.total.toStringAsFixed(2)}',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFF3B82F6),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 10),
                              SizedBox(
                                width: double.infinity,
                                child: OutlinedButton.icon(
                                  style: OutlinedButton.styleFrom(
                                    padding: const EdgeInsets.symmetric(vertical: 8),
                                    side: BorderSide(color: Colors.blue.shade200),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    visualDensity: VisualDensity.compact,
                                  ),
                                  icon: const Icon(Icons.print_outlined, size: 16, color: Color(0xFF2563EB)),
                                  label: const Text(
                                    'Ver / Imprimir Boleta',
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: Color(0xFF2563EB),
                                    ),
                                  ),
                                  onPressed: () => OrderReceiptModal.show(context, order: order),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
          ),
        ],
      ),
    );
  }
}


// ── Formulario crear / editar pedido ───────────────────────────
class CreateOrderSheet extends StatefulWidget {
  final VoidCallback onSaved;
  final Client? initialClient;
  final Order? initialOrder;
  const CreateOrderSheet({
    super.key,
    required this.onSaved,
    this.initialClient,
    this.initialOrder,
  });

  @override
  State<CreateOrderSheet> createState() => _CreateOrderSheetState();
}

class _CreateOrderSheetState extends State<CreateOrderSheet> {
  List<Client> _clients = [];
  List<Product> _products = [];
  Client? _selectedClient;
  final _notesCtrl = TextEditingController();
  final _discountCtrl = TextEditingController();
  bool _applyDiscount = false;
  bool _applyBonification = false;
  final List<Map<String, dynamic>> _items = [];      // items regulares
  final List<Map<String, dynamic>> _bonusItems = []; // items de bonificación
  // Controllers de cantidad por productId
  final Map<int, TextEditingController> _qtyControllers = {};
  final Map<int, TextEditingController> _bonusQtyControllers = {};
  bool _loading = true;
  bool _saving = false;
  String? _error;
  final _productSearchCtrl = TextEditingController();
  final _bonusProductSearchCtrl = TextEditingController();
  String _productSearchQuery = '';
  String _bonusProductSearchQuery = '';
  String _selectedCategory = 'Todas';
  String _selectedBonusCategory = 'Todas';

  List<String> get _categories {
    final cats = _products.map((p) => p.category).toSet().toList()..sort();
    return ['Todas', ...cats];
  }

  List<Product> get _filteredProducts {
    return _products.where((p) {
      final matchesCat = _selectedCategory == 'Todas' || p.category == _selectedCategory;
      final q = _productSearchQuery.trim().toLowerCase();
      final matchesSearch = q.isEmpty || p.name.toLowerCase().contains(q);
      return matchesCat && matchesSearch;
    }).toList();
  }

  List<Product> get _filteredBonusProducts {
    return _products.where((p) {
      final matchesCat = _selectedBonusCategory == 'Todas' || p.category == _selectedBonusCategory;
      final q = _bonusProductSearchQuery.trim().toLowerCase();
      final matchesSearch = q.isEmpty || p.name.toLowerCase().contains(q);
      return matchesCat && matchesSearch;
    }).toList();
  }

  @override
  void initState() {
    super.initState();
    if (widget.initialClient != null) {
      _selectedClient = widget.initialClient;
    }
    if (widget.initialOrder?.notes != null) {
      _notesCtrl.text = widget.initialOrder!.notes!;
    }
    if (widget.initialOrder != null && widget.initialOrder!.discount > 0) {
      _applyDiscount = true;
      _discountCtrl.text = widget.initialOrder!.discount.toStringAsFixed(1);
    }
    _loadData();
  }

  @override
  void dispose() {
    _notesCtrl.dispose();
    _discountCtrl.dispose();
    _productSearchCtrl.dispose();
    _bonusProductSearchCtrl.dispose();
    for (final ctrl in _qtyControllers.values) {
      ctrl.dispose();
    }
    for (final ctrl in _bonusQtyControllers.values) {
      ctrl.dispose();
    }
    super.dispose();
  }

  Future<void> _loadData() async {
    try {
      final clients = await ClientService.getClients();
      final products = await PreventistaOrderService.getProducts();
      setState(() {
        _clients = clients;
        _products = products;
        
        if (widget.initialOrder != null) {
          try {
            _selectedClient = _clients.firstWhere((c) => c.id == widget.initialOrder!.client.id);
          } catch (_) {}
        } else if (_selectedClient != null) {
          try {
            _selectedClient = _clients.firstWhere((c) => c.id == _selectedClient!.id);
          } catch (_) {}
        }

        // Prefill items if editing
        if (widget.initialOrder != null && _items.isEmpty) {
          for (final item in widget.initialOrder!.items) {
            if (item.isBonification) {
              _bonusItems.add({
                'productId': item.productId,
                'quantity': item.quantity,
                'name': item.productName,
              });
              if (!_applyBonification) _applyBonification = true;
            } else {
              _items.add({
                'productId': item.productId,
                'quantity': item.quantity,
                'name': item.productName,
                'price': item.unitPrice,
              });
            }
          }
        }
        
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  int _getItemQuantity(int productId) {
    final idx = _items.indexWhere((i) => i['productId'] == productId);
    return idx >= 0 ? (_items[idx]['quantity'] as int) : 0;
  }

  int _getBonusQuantity(int productId) {
    final idx = _bonusItems.indexWhere((i) => i['productId'] == productId);
    return idx >= 0 ? (_bonusItems[idx]['quantity'] as int) : 0;
  }

  void _addProduct(Product product) {
    final idx = _items.indexWhere((i) => i['productId'] == product.id);
    if (idx >= 0) {
      final current = _items[idx]['quantity'] as int;
      _updateQty(product.id, current + 1);
    } else {
      setState(() {
        _items.add({
          'productId': product.id,
          'quantity': 1,
          'name': product.name,
          'price': product.price,
        });
      });
      final ctrl = _qtyControllers[product.id];
      if (ctrl != null) {
        ctrl.text = '1';
      }
    }
  }

  void _decrementProduct(Product product) {
    final idx = _items.indexWhere((i) => i['productId'] == product.id);
    if (idx < 0) return;
    final current = _items[idx]['quantity'] as int;
    if (current > 1) {
      _updateQty(product.id, current - 1);
    } else {
      _removeProduct(product.id);
    }
  }

  void _addBonusProduct(Product product) {
    final idx = _bonusItems.indexWhere((i) => i['productId'] == product.id);
    if (idx >= 0) {
      final current = _bonusItems[idx]['quantity'] as int;
      _updateBonusQty(product.id, current + 1);
    } else {
      setState(() {
        _bonusItems.add({
          'productId': product.id,
          'quantity': 1,
          'name': product.name,
        });
      });
      final ctrl = _bonusQtyControllers[product.id];
      if (ctrl != null) {
        ctrl.text = '1';
      }
    }
  }

  void _decrementBonusProduct(Product product) {
    final idx = _bonusItems.indexWhere((i) => i['productId'] == product.id);
    if (idx < 0) return;
    final current = _bonusItems[idx]['quantity'] as int;
    if (current > 1) {
      _updateBonusQty(product.id, current - 1);
    } else {
      _removeBonusProduct(product.id);
    }
  }

  void _updateBonusQty(int productId, int qty) {
    if (qty < 1) return;
    setState(() {
      final idx = _bonusItems.indexWhere((i) => i['productId'] == productId);
      if (idx >= 0) _bonusItems[idx]['quantity'] = qty;
    });
    final ctrl = _bonusQtyControllers[productId];
    if (ctrl != null && ctrl.text != '$qty') {
      ctrl.text = '$qty';
      ctrl.selection = TextSelection.fromPosition(
        TextPosition(offset: ctrl.text.length),
      );
    }
  }

  void _removeBonusProduct(int productId) {
    setState(() => _bonusItems.removeWhere((i) => i['productId'] == productId));
    _bonusQtyControllers[productId]?.dispose();
    _bonusQtyControllers.remove(productId);
  }

  TextEditingController _getBonusQtyController(int productId, int currentQty) {
    return _bonusQtyControllers.putIfAbsent(
      productId,
      () => TextEditingController(text: '$currentQty'),
    );
  }

  void _removeProduct(int productId) {
    setState(() => _items.removeWhere((i) => i['productId'] == productId));
    _qtyControllers[productId]?.dispose();
    _qtyControllers.remove(productId);
  }

  void _updateQty(int productId, int qty) {
    if (qty < 1) return;
    setState(() {
      final idx = _items.indexWhere((i) => i['productId'] == productId);
      if (idx >= 0) _items[idx]['quantity'] = qty;
    });
    // Sincronizar el campo de texto si existe
    final ctrl = _qtyControllers[productId];
    if (ctrl != null && ctrl.text != '$qty') {
      ctrl.text = '$qty';
      ctrl.selection = TextSelection.fromPosition(
        TextPosition(offset: ctrl.text.length),
      );
    }
  }

  TextEditingController _getQtyController(int productId, int currentQty) {
    return _qtyControllers.putIfAbsent(
      productId,
      () => TextEditingController(text: '$currentQty'),
    );
  }

  double get _subtotal => _items.fold(
    0.0,
    (s, i) => s + (i['price'] as double) * (i['quantity'] as int),
  );

  double get _discountValue {
    if (!_applyDiscount) return 0.0;
    final val = double.tryParse(_discountCtrl.text.replaceAll(',', '.')) ?? 0.0;
    return val > 0 ? val : 0.0;
  }

  double get _netTotal {
    final net = _subtotal - _discountValue;
    return net > 0 ? net : 0.0;
  }

  Future<void> _save() async {
    if (_selectedClient == null) {
      setState(() => _error = 'Selecciona un cliente');
      return;
    }
    // Asegurar que solo viajen cantidades válidas mayores a 0
    _items.removeWhere((i) => (i['quantity'] as int) <= 0);
    _bonusItems.removeWhere((i) => (i['quantity'] as int) <= 0);

    if (_items.isEmpty) {
      setState(() => _error = 'Agrega al menos un producto regular con cantidad mayor a 0');
      return;
    }

    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      final discountToSave = _applyDiscount ? _discountValue : 0.0;

      // Combinar items regulares + items de bonificación
      final allItems = [
        ..._items.map((i) => {
          'productId': i['productId'],
          'quantity': i['quantity'],
          'isBonification': false,
        }),
        if (_applyBonification)
          ..._bonusItems.map((i) => {
            'productId': i['productId'],
            'quantity': i['quantity'],
            'isBonification': true,
          }),
      ];

      if (widget.initialOrder != null) {
        await PreventistaOrderService.updateOrder(
          orderId: widget.initialOrder!.id,
          notes: _notesCtrl.text.isEmpty ? null : _notesCtrl.text,
          discount: discountToSave,
          items: allItems,
        );
      } else {
        await PreventistaOrderService.createOrder(
          clientId: _selectedClient!.id,
          notes: _notesCtrl.text.isEmpty ? null : _notesCtrl.text,
          discount: discountToSave,
          items: allItems,
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
    final isEditing = widget.initialOrder != null;
    return Container(
      height: MediaQuery.of(context).size.height * 0.92,
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: _loading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
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
                        isEditing ? 'Editar pedido #${widget.initialOrder!.id}' : 'Nuevo pedido',
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
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Cliente
                        const Text(
                          'Cliente',
                          style: TextStyle(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 8),
                        DropdownButtonFormField<Client>(
                          initialValue: _selectedClient,
                          hint: const Text('Seleccionar cliente'),
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            contentPadding: const EdgeInsets.symmetric(
                              horizontal: 14,
                              vertical: 12,
                            ),
                          ),
                          items: _clients
                              .map(
                                (c) => DropdownMenuItem(
                                  value: c,
                                  child: Text(c.name),
                                ),
                              )
                              .toList(),
                          onChanged: isEditing ? null : (c) => setState(() => _selectedClient = c),
                        ),

                        const SizedBox(height: 16),

                        // Notas
                        TextField(
                          controller: _notesCtrl,
                          decoration: InputDecoration(
                            labelText: 'Notas (opcional)',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),

                        const SizedBox(height: 16),

                        // Productos
                        const Text(
                          'Productos',
                          style: TextStyle(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 8),

                        // Buscador instantáneo de productos
                        TextField(
                          controller: _productSearchCtrl,
                          decoration: InputDecoration(
                            hintText: 'Buscar producto...',
                            hintStyle: TextStyle(fontSize: 13, color: Colors.grey.shade400),
                            prefixIcon: const Icon(Icons.search, size: 20, color: Color(0xFF3B82F6)),
                            suffixIcon: _productSearchQuery.isNotEmpty
                                ? IconButton(
                                    icon: const Icon(Icons.clear, size: 18, color: Colors.grey),
                                    onPressed: () {
                                      _productSearchCtrl.clear();
                                      setState(() => _productSearchQuery = '');
                                    },
                                  )
                                : null,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            filled: true,
                            fillColor: Colors.grey.shade50,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade300),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade200),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: const BorderSide(color: Color(0xFF3B82F6), width: 1.5),
                            ),
                          ),
                          style: const TextStyle(fontSize: 13),
                          onChanged: (val) {
                            setState(() => _productSearchQuery = val);
                          },
                        ),
                        const SizedBox(height: 8),

                        // Tabs de categoría
                        if (_categories.length > 2) ...[
                          SizedBox(
                            height: 36,
                            child: ListView(
                              scrollDirection: Axis.horizontal,
                              children: _categories.map((cat) {
                                final isSelected = _selectedCategory == cat;
                                final colors = {
                                  'Categoría A': const Color(0xFF3B82F6),
                                  'Categoría B': const Color(0xFF8B5CF6),
                                  'Categoría C': const Color(0xFFD97706),
                                  'Categoría D': const Color(0xFF16A34A),
                                };
                                final color = colors[cat] ?? const Color(0xFF6B7280);
                                return Padding(
                                  padding: const EdgeInsets.only(right: 8),
                                  child: GestureDetector(
                                    onTap: () => setState(() => _selectedCategory = cat),
                                    child: AnimatedContainer(
                                      duration: const Duration(milliseconds: 200),
                                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                      decoration: BoxDecoration(
                                        color: isSelected ? color : color.withAlpha(20),
                                        borderRadius: BorderRadius.circular(20),
                                        border: Border.all(
                                          color: color,
                                          width: isSelected ? 0 : 1,
                                        ),
                                      ),
                                      child: Text(
                                        cat,
                                        style: TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.w600,
                                          color: isSelected ? Colors.white : color,
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              }).toList(),
                            ),
                          ),
                          const SizedBox(height: 8),
                        ],

                        // Lista de productos filtrados
                        if (_filteredProducts.isEmpty)
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            child: Center(
                              child: Text(
                                'No se encontraron productos para "$_productSearchQuery"',
                                style: TextStyle(fontSize: 12, color: Colors.grey.shade500, fontStyle: FontStyle.italic),
                              ),
                            ),
                          )
                        else
                          ..._filteredProducts.map(
                            (p) {
                              final currentQty = _getItemQuantity(p.id);
                              final isSelected = currentQty > 0;
                              return Container(
                                margin: const EdgeInsets.symmetric(vertical: 3),
                                decoration: BoxDecoration(
                                  color: isSelected ? const Color(0xFFEFF6FF) : Colors.white,
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(
                                    color: isSelected ? const Color(0xFF3B82F6) : Colors.grey.shade200,
                                    width: isSelected ? 1.5 : 1,
                                  ),
                                ),
                                child: ListTile(
                                  contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                                  dense: true,
                                  title: Text(
                                    p.name,
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                      color: isSelected ? const Color(0xFF1E40AF) : Colors.black87,
                                    ),
                                  ),
                                  subtitle: Text(
                                    'Bs. ${p.price.toStringAsFixed(2)} / ${p.unit}',
                                    style: const TextStyle(fontSize: 12),
                                  ),
                                  trailing: isSelected
                                      ? Container(
                                          decoration: BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.circular(8),
                                            border: Border.all(color: const Color(0xFF3B82F6)),
                                          ),
                                          child: Row(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              IconButton(
                                                icon: const Icon(Icons.remove, size: 18, color: Color(0xFF3B82F6)),
                                                onPressed: () => _decrementProduct(p),
                                                padding: EdgeInsets.zero,
                                                constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                                              ),
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 6),
                                                child: Text(
                                                  '$currentQty',
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 14,
                                                    color: Color(0xFF1E40AF),
                                                  ),
                                                ),
                                              ),
                                              IconButton(
                                                icon: const Icon(Icons.add, size: 18, color: Color(0xFF3B82F6)),
                                                onPressed: () => _addProduct(p),
                                                padding: EdgeInsets.zero,
                                                constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                                              ),
                                            ],
                                          ),
                                        )
                                      : ElevatedButton.icon(
                                          onPressed: () => _addProduct(p),
                                          icon: const Icon(Icons.add, size: 16),
                                          label: const Text('Agregar', style: TextStyle(fontSize: 12)),
                                          style: ElevatedButton.styleFrom(
                                            backgroundColor: const Color(0xFF3B82F6),
                                            foregroundColor: Colors.white,
                                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                            elevation: 0,
                                          ),
                                        ),
                                ),
                              );
                            },
                          ),

                        // Items seleccionados
                        if (_items.isNotEmpty) ...[
                          const Divider(),
                          const Text(
                            'Resumen',
                            style: TextStyle(fontWeight: FontWeight.w600),
                          ),
                          const SizedBox(height: 8),
                          ..._items.map(
                            (item) {
                              final productId = item['productId'] as int;
                              final qty = item['quantity'] as int;
                              final ctrl = _getQtyController(productId, qty);
                              return Padding(
                                padding: const EdgeInsets.symmetric(vertical: 4),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        item['name'],
                                        style: const TextStyle(fontSize: 13),
                                      ),
                                    ),
                                    // Botón -
                                    IconButton(
                                      icon: const Icon(
                                        Icons.remove_circle_outline,
                                        size: 20,
                                      ),
                                      padding: EdgeInsets.zero,
                                      constraints: const BoxConstraints(),
                                      onPressed: () => _updateQty(
                                        productId,
                                        qty - 1,
                                      ),
                                    ),
                                    const SizedBox(width: 4),
                                    // Campo de cantidad editable por teclado
                                    SizedBox(
                                      width: 52,
                                      height: 36,
                                      child: TextField(
                                        controller: ctrl,
                                        textAlign: TextAlign.center,
                                        keyboardType: TextInputType.number,
                                        inputFormatters: [
                                          FilteringTextInputFormatter.digitsOnly,
                                        ],
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 14,
                                        ),
                                        decoration: InputDecoration(
                                          isDense: true,
                                          contentPadding: const EdgeInsets.symmetric(
                                            horizontal: 4,
                                            vertical: 8,
                                          ),
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.circular(8),
                                            borderSide: const BorderSide(
                                              color: Color(0xFF3B82F6),
                                            ),
                                          ),
                                          focusedBorder: OutlineInputBorder(
                                            borderRadius: BorderRadius.circular(8),
                                            borderSide: const BorderSide(
                                              color: Color(0xFF3B82F6),
                                              width: 2,
                                            ),
                                          ),
                                        ),
                                        onChanged: (val) {
                                          final parsed = int.tryParse(val);
                                          if (parsed != null && parsed >= 1) {
                                            final idx = _items.indexWhere(
                                              (i) => i['productId'] == productId,
                                            );
                                            if (idx >= 0) {
                                              setState(() {
                                                _items[idx]['quantity'] = parsed;
                                              });
                                            }
                                          }
                                        },
                                        onSubmitted: (val) {
                                          final parsed = int.tryParse(val);
                                          if (parsed == null || parsed < 1) {
                                            ctrl.text = '$qty';
                                          }
                                        },
                                      ),
                                    ),
                                    const SizedBox(width: 4),
                                    // Botón +
                                    IconButton(
                                      icon: const Icon(
                                        Icons.add_circle_outline,
                                        size: 20,
                                      ),
                                      padding: EdgeInsets.zero,
                                      constraints: const BoxConstraints(),
                                      onPressed: () => _updateQty(
                                        productId,
                                        qty + 1,
                                      ),
                                    ),
                                    // Botón eliminar
                                    IconButton(
                                      icon: const Icon(
                                        Icons.delete_outline,
                                        color: Colors.red,
                                        size: 20,
                                      ),
                                      padding: EdgeInsets.zero,
                                      constraints: const BoxConstraints(),
                                      onPressed: () => _removeProduct(productId),
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                          const Divider(height: 20),

                          // ── Opción de Descuento Preventista ──
                          Container(
                            margin: const EdgeInsets.symmetric(vertical: 4),
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: _applyDiscount ? const Color(0xFFFEF3C7) : const Color(0xFFF9FAFB),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: _applyDiscount ? const Color(0xFFF59E0B) : Colors.grey.shade300,
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        Icon(
                                          Icons.discount_outlined,
                                          size: 18,
                                          color: _applyDiscount ? const Color(0xFFB45309) : Colors.grey.shade700,
                                        ),
                                        const SizedBox(width: 8),
                                        Text(
                                          '¿Aplicar descuento al pedido?',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 13,
                                            color: _applyDiscount ? const Color(0xFF92400E) : Colors.black87,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Switch(
                                      value: _applyDiscount,
                                      activeColor: const Color(0xFFD97706),
                                      onChanged: (val) {
                                        setState(() {
                                          _applyDiscount = val;
                                          if (!val) _discountCtrl.clear();
                                        });
                                      },
                                    ),
                                  ],
                                ),
                                if (_applyDiscount) ...[
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      const Text(
                                        'Monto de descuento:  Bs. ',
                                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                                      ),
                                      SizedBox(
                                        width: 110,
                                        height: 38,
                                        child: TextField(
                                          controller: _discountCtrl,
                                          keyboardType: const TextInputType.numberWithOptions(decimal: true),
                                          textAlign: TextAlign.center,
                                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                                          decoration: InputDecoration(
                                            hintText: '0.00',
                                            isDense: true,
                                            contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                                            focusedBorder: OutlineInputBorder(
                                              borderRadius: BorderRadius.circular(8),
                                              borderSide: const BorderSide(color: Color(0xFFD97706), width: 2),
                                            ),
                                          ),
                                          onChanged: (_) => setState(() {}),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 4),
                                  const Text(
                                    'Este descuento se restará para que los repartidores solo cobren el total neto.',
                                    style: TextStyle(fontSize: 11, color: Color(0xFF92400E)),
                                  ),
                                ],
                              ],
                            ),
                          ),

                          const SizedBox(height: 8),

                          // ── Sección de Bonificaciones ──
                          Container(
                            margin: const EdgeInsets.symmetric(vertical: 4),
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: _applyBonification ? const Color(0xFFECFDF5) : const Color(0xFFF9FAFB),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: _applyBonification ? const Color(0xFF10B981) : Colors.grey.shade300,
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        Icon(
                                          Icons.card_giftcard,
                                          size: 18,
                                          color: _applyBonification ? const Color(0xFF059669) : Colors.grey.shade700,
                                        ),
                                        const SizedBox(width: 8),
                                        Text(
                                          '¿Agregar bonificación?',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 13,
                                            color: _applyBonification ? const Color(0xFF065F46) : Colors.black87,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Switch(
                                      value: _applyBonification,
                                      activeColor: const Color(0xFF10B981),
                                      onChanged: (val) {
                                        setState(() {
                                          _applyBonification = val;
                                          if (!val) {
                                            _bonusItems.clear();
                                            for (final c in _bonusQtyControllers.values) c.dispose();
                                            _bonusQtyControllers.clear();
                                          }
                                        });
                                      },
                                    ),
                                  ],
                                ),
                                if (_applyBonification) ...[
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Productos bonificados: se suman a la cantidad pero no al precio.',
                                    style: TextStyle(fontSize: 11, color: Color(0xFF065F46)),
                                  ),
                                  const SizedBox(height: 10),

                                  // Tabs de categoría para bonificaciones
                                  if (_categories.length > 2) ...[
                                    SizedBox(
                                      height: 34,
                                      child: ListView(
                                        scrollDirection: Axis.horizontal,
                                        children: _categories.map((cat) {
                                          final isSel = _selectedBonusCategory == cat;
                                          return Padding(
                                            padding: const EdgeInsets.only(right: 6),
                                            child: GestureDetector(
                                              onTap: () => setState(() => _selectedBonusCategory = cat),
                                              child: AnimatedContainer(
                                                duration: const Duration(milliseconds: 180),
                                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                                                decoration: BoxDecoration(
                                                  color: isSel ? const Color(0xFF10B981) : const Color(0xFF10B981).withAlpha(20),
                                                  borderRadius: BorderRadius.circular(20),
                                                  border: Border.all(
                                                    color: const Color(0xFF10B981),
                                                    width: isSel ? 0 : 1,
                                                  ),
                                                ),
                                                child: Text(
                                                  cat,
                                                  style: TextStyle(
                                                    fontSize: 11,
                                                    fontWeight: FontWeight.w600,
                                                    color: isSel ? Colors.white : const Color(0xFF059669),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          );
                                        }).toList(),
                                      ),
                                    ),
                                    const SizedBox(height: 6),
                                  ],

                                  // Buscador de productos bonificados
                                  TextField(
                                    controller: _bonusProductSearchCtrl,
                                    decoration: InputDecoration(
                                      hintText: 'Buscar producto bonificado...',
                                      hintStyle: const TextStyle(fontSize: 13, color: Colors.grey),
                                      prefixIcon: const Icon(Icons.search, size: 18, color: Colors.grey),
                                      suffixIcon: _bonusProductSearchCtrl.text.isNotEmpty
                                          ? IconButton(
                                              icon: const Icon(Icons.clear, size: 18),
                                              onPressed: () {
                                                _bonusProductSearchCtrl.clear();
                                                setState(() => _bonusProductSearchQuery = '');
                                              },
                                            )
                                          : null,
                                      isDense: true,
                                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: BorderSide(color: Colors.grey.shade300),
                                      ),
                                      enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: BorderSide(color: Colors.grey.shade300),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: const BorderSide(color: Color(0xFF10B981)),
                                      ),
                                      filled: true,
                                      fillColor: Colors.grey.shade50,
                                    ),
                                    style: const TextStyle(fontSize: 13),
                                    onChanged: (val) => setState(() => _bonusProductSearchQuery = val),
                                  ),
                                  const SizedBox(height: 8),

                                  // Lista de productos para bonificar
                                  if (_filteredBonusProducts.isEmpty)
                                    const Padding(
                                      padding: EdgeInsets.symmetric(vertical: 12),
                                      child: Center(
                                        child: Text(
                                          'No se encontraron productos',
                                          style: TextStyle(fontSize: 13, color: Colors.grey),
                                        ),
                                      ),
                                    )
                                  else
                                    ..._filteredBonusProducts.map((p) {
                                      final bonusQty = _getBonusQuantity(p.id);
                                      final isSelected = bonusQty > 0;
                                      return Container(
                                        margin: const EdgeInsets.symmetric(vertical: 3),
                                        decoration: BoxDecoration(
                                          color: isSelected ? const Color(0xFFECFDF5) : Colors.white,
                                          borderRadius: BorderRadius.circular(10),
                                          border: Border.all(
                                            color: isSelected ? const Color(0xFF10B981) : Colors.grey.shade200,
                                            width: isSelected ? 1.5 : 1,
                                          ),
                                        ),
                                        child: ListTile(
                                          dense: true,
                                          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                                          title: Text(
                                            p.name,
                                            style: TextStyle(
                                              fontSize: 13,
                                              fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                              color: isSelected ? const Color(0xFF065F46) : Colors.black87,
                                            ),
                                          ),
                                          subtitle: Text(
                                            '${p.unit} • Ref: Bs. ${p.price.toStringAsFixed(2)}',
                                            style: const TextStyle(fontSize: 11, color: Colors.grey),
                                          ),
                                          trailing: isSelected
                                              ? Container(
                                                  decoration: BoxDecoration(
                                                    color: Colors.white,
                                                    borderRadius: BorderRadius.circular(8),
                                                    border: Border.all(color: const Color(0xFF10B981)),
                                                  ),
                                                  child: Row(
                                                    mainAxisSize: MainAxisSize.min,
                                                    children: [
                                                      IconButton(
                                                        icon: const Icon(Icons.remove, size: 18, color: Color(0xFF10B981)),
                                                        onPressed: () => _decrementBonusProduct(p),
                                                        padding: EdgeInsets.zero,
                                                        constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                                                      ),
                                                      Padding(
                                                        padding: const EdgeInsets.symmetric(horizontal: 6),
                                                        child: Text(
                                                          '$bonusQty',
                                                          style: const TextStyle(
                                                            fontWeight: FontWeight.bold,
                                                            fontSize: 13,
                                                            color: Color(0xFF065F46),
                                                          ),
                                                        ),
                                                      ),
                                                      IconButton(
                                                        icon: const Icon(Icons.add, size: 18, color: Color(0xFF10B981)),
                                                        onPressed: () => _addBonusProduct(p),
                                                        padding: EdgeInsets.zero,
                                                        constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                                                      ),
                                                    ],
                                                  ),
                                                )
                                              : ElevatedButton.icon(
                                                  onPressed: () => _addBonusProduct(p),
                                                  icon: const Icon(Icons.add, size: 16),
                                                  label: const Text('Bonificar', style: TextStyle(fontSize: 12)),
                                                  style: ElevatedButton.styleFrom(
                                                    backgroundColor: const Color(0xFF10B981),
                                                    foregroundColor: Colors.white,
                                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                                    shape: RoundedRectangleBorder(
                                                      borderRadius: BorderRadius.circular(8),
                                                    ),
                                                    elevation: 0,
                                                  ),
                                                ),
                                        ),
                                      );
                                    }),

                                  // Items de bonificación seleccionados
                                  if (_bonusItems.isNotEmpty) ...[
                                    const Divider(height: 12),
                                    const Text(
                                      '🎁 Bonificaciones seleccionadas',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 12,
                                        color: Color(0xFF059669),
                                      ),
                                    ),
                                    const SizedBox(height: 6),
                                    ..._bonusItems.map((item) {
                                      final productId = item['productId'] as int;
                                      final qty = item['quantity'] as int;
                                      final ctrl = _getBonusQtyController(productId, qty);
                                      return Padding(
                                        padding: const EdgeInsets.symmetric(vertical: 3),
                                        child: Row(
                                          children: [
                                            Expanded(
                                              child: Text(
                                                item['name'],
                                                style: const TextStyle(fontSize: 13, color: Color(0xFF065F46)),
                                              ),
                                            ),
                                            // -
                                            IconButton(
                                              icon: const Icon(Icons.remove_circle_outline, size: 20, color: Color(0xFF10B981)),
                                              padding: EdgeInsets.zero,
                                              constraints: const BoxConstraints(),
                                              onPressed: () => _updateBonusQty(productId, qty - 1),
                                            ),
                                            const SizedBox(width: 4),
                                            SizedBox(
                                              width: 48,
                                              height: 34,
                                              child: TextField(
                                                controller: ctrl,
                                                textAlign: TextAlign.center,
                                                keyboardType: TextInputType.number,
                                                inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                                decoration: InputDecoration(
                                                  isDense: true,
                                                  contentPadding: const EdgeInsets.symmetric(horizontal: 4, vertical: 7),
                                                  border: OutlineInputBorder(
                                                    borderRadius: BorderRadius.circular(8),
                                                    borderSide: const BorderSide(color: Color(0xFF10B981)),
                                                  ),
                                                  focusedBorder: OutlineInputBorder(
                                                    borderRadius: BorderRadius.circular(8),
                                                    borderSide: const BorderSide(color: Color(0xFF10B981), width: 2),
                                                  ),
                                                ),
                                                onChanged: (val) {
                                                  final parsed = int.tryParse(val);
                                                  if (parsed != null && parsed >= 1) {
                                                    final idx = _bonusItems.indexWhere((i) => i['productId'] == productId);
                                                    if (idx >= 0) setState(() => _bonusItems[idx]['quantity'] = parsed);
                                                  }
                                                },
                                              ),
                                            ),
                                            const SizedBox(width: 4),
                                            // +
                                            IconButton(
                                              icon: const Icon(Icons.add_circle_outline, size: 20, color: Color(0xFF10B981)),
                                              padding: EdgeInsets.zero,
                                              constraints: const BoxConstraints(),
                                              onPressed: () => _updateBonusQty(productId, qty + 1),
                                            ),
                                            // Eliminar
                                            IconButton(
                                              icon: const Icon(Icons.delete_outline, color: Colors.red, size: 18),
                                              padding: EdgeInsets.zero,
                                              constraints: const BoxConstraints(),
                                              onPressed: () => _removeBonusProduct(productId),
                                            ),
                                          ],
                                        ),
                                      );
                                    }),
                                    const SizedBox(height: 4),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                      decoration: BoxDecoration(
                                        color: const Color(0xFF10B981).withAlpha(20),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          const Text(
                                            '🎁 Bonificación total:',
                                            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF059669)),
                                          ),
                                          Text(
                                            '${_bonusItems.fold(0, (s, i) => s + (i['quantity'] as int))} unidades GRATIS',
                                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF059669)),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ],
                              ],
                            ),
                          ),

                          const SizedBox(height: 8),

                          // ── Desglose de Totales ──
                          if (_applyDiscount && _discountValue > 0) ...[
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text('Subtotal:', style: TextStyle(color: Colors.grey, fontSize: 13)),
                                Text('Bs. ${_subtotal.toStringAsFixed(2)}', style: const TextStyle(color: Colors.grey, fontSize: 13, fontWeight: FontWeight.w500)),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text('Descuento preventista:', style: TextStyle(color: Colors.red, fontWeight: FontWeight.w600, fontSize: 13)),
                                Text('- Bs. ${_discountValue.toStringAsFixed(2)}', style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 13)),
                              ],
                            ),
                            const Divider(height: 12),
                          ],

                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                _applyDiscount && _discountValue > 0 ? 'Total a cobrar' : 'Total',
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                              ),
                              Text(
                                'Bs. ${_netTotal.toStringAsFixed(2)}',
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 18,
                                  color: Color(0xFF3B82F6),
                                ),
                              ),
                            ],
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
                                    isEditing ? 'Guardar cambios' : 'Crear pedido',
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

class _DateFilterChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _DateFilterChip({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF3B82F6) : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? const Color(0xFF3B82F6) : Colors.grey.shade300,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: isSelected ? Colors.white : Colors.black87,
          ),
        ),
      ),
    );
  }
}

class _SummaryMetric extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const _SummaryMetric({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16, color: color),
        const SizedBox(width: 6),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                color: Colors.grey.shade600,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              value,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _StatusPill extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _StatusPill({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(right: 6),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: isSelected ? Colors.black87 : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? Colors.black87 : Colors.grey.shade300,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
            color: isSelected ? Colors.white : Colors.grey.shade700,
          ),
        ),
      ),
    );
  }
}

