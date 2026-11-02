import 'package:flutter/material.dart';
import '../models/order.dart';
import 'order_receipt_modal.dart';

class DeliveryForm extends StatefulWidget {
  final Order order;

  const DeliveryForm({super.key, required this.order});

  @override
  State<DeliveryForm> createState() => _DeliveryFormState();
}

class _DeliveryFormState extends State<DeliveryForm> {
  double _calculatedTotal = 0;
  final TextEditingController _notesCtrl = TextEditingController();
  final Map<int, TextEditingController> _controllers = {};

  double _calculatedSubtotal = 0;

  @override
  void dispose() {
    _notesCtrl.dispose();
    for (var c in _controllers.values) {
      c.dispose();
    }
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    for (var item in widget.order.items) {
      _controllers[item.id] = TextEditingController(text: item.quantity.toString());
      _controllers[item.id]!.addListener(_calculateTotal);
    }
    _calculateTotal();
  }

  void _calculateTotal() {
    double subtotal = 0;
    for (var item in widget.order.items) {
      final text = _controllers[item.id]?.text ?? '0';
      final qty = int.tryParse(text) ?? 0;
      subtotal += qty * item.unitPrice;
    }
    final net = subtotal - widget.order.discount;
    setState(() {
      _calculatedSubtotal = subtotal;
      _calculatedTotal = net > 0 ? net : 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
        left: 20,
        right: 20,
        top: 20,
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Handle bar
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Título
            Row(
              children: [
                const Icon(Icons.local_shipping, color: Color(0xFF3B82F6)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Entregar a ${widget.order.client.name}',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              'Ajusta las cantidades si el cliente no acepta todo el pedido',
              style: TextStyle(fontSize: 13, color: Colors.grey.shade600),
            ),
            const Divider(height: 24),

            // Lista de productos con campos editables
            ...widget.order.items.map((item) {
              final controller = _controllers[item.id]!;
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Row(
                  children: [
                    Expanded(
                      flex: 3,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              if (item.isBonification)
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                                  margin: const EdgeInsets.only(right: 6),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFFECFDF5),
                                    borderRadius: BorderRadius.circular(4),
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
                              Flexible(
                                child: Text(
                                  item.productName,
                                  style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 14,
                                    color: item.isBonification ? const Color(0xFF065F46) : Colors.black87,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          Text(
                            item.isBonification
                                ? 'Pedido: ${item.quantity} ${item.productUnit} · GRATIS (Promoción)'
                                : 'Pedido: ${item.quantity} ${item.productUnit} · Bs. ${item.unitPrice.toStringAsFixed(2)} c/u',
                            style: TextStyle(
                              fontSize: 12,
                              color: item.isBonification ? const Color(0xFF059669) : Colors.grey.shade500,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    // Botón -
                    IconButton(
                      onPressed: () {
                        int val = int.tryParse(controller.text) ?? 0;
                        if (val > 0) {
                          controller.text = (val - 1).toString();
                        }
                      },
                      icon: const Icon(Icons.remove_circle_outline),
                      color: Colors.red.shade400,
                      iconSize: 28,
                    ),
                    // Campo de cantidad
                    SizedBox(
                      width: 50,
                      child: TextField(
                        controller: controller,
                        keyboardType: TextInputType.number,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                        decoration: InputDecoration(
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 4,
                            vertical: 8,
                          ),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                    ),
                    // Botón +
                    IconButton(
                      onPressed: () {
                        int val = int.tryParse(controller.text) ?? 0;
                        if (val < item.quantity) {
                          controller.text = (val + 1).toString();
                        }
                      },
                      icon: const Icon(Icons.add_circle_outline),
                      color: Colors.green.shade400,
                      iconSize: 28,
                    ),
                  ],
                ),
              );
            }),

            const Divider(height: 16),
            if (widget.order.discount > 0) ...[
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Subtotal productos:', style: TextStyle(color: Colors.grey, fontSize: 13)),
                  Text('Bs. ${_calculatedSubtotal.toStringAsFixed(2)}', style: const TextStyle(color: Colors.grey, fontSize: 13)),
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
                  Text('- Bs. ${widget.order.discount.toStringAsFixed(2)}', style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 13)),
                ],
              ),
              const Divider(height: 14),
            ],

            // Total calculado
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Total a cobrar:',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                Text(
                  'Bs. ${_calculatedTotal.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF3B82F6),
                  ),
                ),
              ],
            ),

            // Aviso si es parcial y campo de notas
            if (_calculatedTotal < widget.order.total) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.orange.shade50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.orange.shade200),
                ),
                child: Row(
                  children: [
                    Icon(Icons.warning_amber, color: Colors.orange.shade700, size: 18),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Entrega parcial — Se devolverán productos no aceptados',
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.orange.shade800,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _notesCtrl,
                decoration: InputDecoration(
                  labelText: 'Motivo de devolución (obligatorio para parciales)',
                  hintText: 'Ej. Cliente no tenía dinero, producto dañado...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                ),
                maxLines: 2,
              ),
            ],

            const SizedBox(height: 12),

            // Botón para previsualizar boleta
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {
                  final Map<int, int> customQty = {};
                  for (var item in widget.order.items) {
                    final text = _controllers[item.id]?.text ?? '0';
                    int qty = int.tryParse(text) ?? item.quantity;
                    customQty[item.id] = qty;
                  }
                  OrderReceiptModal.show(
                    context,
                    order: widget.order,
                    customDeliveredQuantities: customQty,
                  );
                },
                icon: const Icon(Icons.receipt_long, size: 18, color: Color(0xFF2563EB)),
                label: const Text(
                  'Previsualizar Boleta de Entrega',
                  style: TextStyle(color: Color(0xFF2563EB), fontWeight: FontWeight.bold),
                ),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Color(0xFFBFDBFE)),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Botones
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context, null),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text('Cancelar'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  flex: 2,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      // Validar notas en parciales
                      bool isPartial = _calculatedTotal < widget.order.total;
                      if (isPartial && _notesCtrl.text.trim().isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Por favor, indica el motivo de la devolución'),
                            backgroundColor: Colors.red,
                          ),
                        );
                        return;
                      }

                      List<Map<String, int>> deliveredItems = [];
                      for (var item in widget.order.items) {
                        final text = _controllers[item.id]?.text ?? '0';
                        int qty = int.tryParse(text) ?? 0;
                        if (qty < 0) qty = 0;
                        if (qty > item.quantity) qty = item.quantity;
                        deliveredItems.add({
                          'orderItemId': item.id,
                          'deliveredQuantity': qty,
                        });
                      }
                      Navigator.pop(context, {
                        'deliveredItems': deliveredItems,
                        'notes': isPartial ? _notesCtrl.text.trim() : null,
                      });
                    },
                    icon: const Icon(Icons.check_circle, size: 18),
                    label: const Text(
                      'Confirmar Entrega',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}
