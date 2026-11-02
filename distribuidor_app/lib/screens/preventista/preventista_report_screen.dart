import 'package:flutter/material.dart';
import '../../services/preventista_order_service.dart';

class PreventistaReportScreen extends StatefulWidget {
  const PreventistaReportScreen({super.key});

  @override
  State<PreventistaReportScreen> createState() =>
      _PreventistaReportScreenState();
}

class _PreventistaReportScreenState extends State<PreventistaReportScreen> {
  String _preset = 'today';
  DateTimeRange? _customRange;
  Map<String, dynamic>? _report;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchReport();
  }

  Future<void> _fetchReport() async {
    setState(() => _loading = true);
    try {
      Map<String, dynamic> data;
      if (_preset == 'custom' && _customRange != null) {
        final start =
            "${_customRange!.start.year}-${_customRange!.start.month.toString().padLeft(2, '0')}-${_customRange!.start.day.toString().padLeft(2, '0')}";
        final end =
            "${_customRange!.end.year}-${_customRange!.end.month.toString().padLeft(2, '0')}-${_customRange!.end.day.toString().padLeft(2, '0')}";
        data = await PreventistaOrderService.getDailyReport(
          startDate: start,
          endDate: end,
        );
      } else {
        data = await PreventistaOrderService.getDailyReport(date: _preset);
      }

      if (mounted) {
        setState(() {
          _report = data;
          _loading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  Future<void> _pickDateRange() async {
    final now = DateTime.now();
    final picked = await showDateRangePicker(
      context: context,
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
      initialDateRange:
          _customRange ??
          DateTimeRange(start: DateTime(now.year, now.month, 1), end: now),
      helpText: 'SELECCIONAR RANGO DE FECHAS',
      cancelText: 'CANCELAR',
      confirmText: 'CONSULTAR',
    );

    if (picked != null) {
      setState(() {
        _preset = 'custom';
        _customRange = picked;
      });
      _fetchReport();
    }
  }

  double get _totalSold {
    final sum = _report?['summary']?['totalAmount'];
    if (sum == null) return 0.0;
    return (sum is num) ? sum.toDouble() : double.tryParse('$sum') ?? 0.0;
  }

  double get _totalBruto {
    final sum = _report?['summary']?['totalBruto'];
    if (sum == null) return _totalSold;
    return (sum is num) ? sum.toDouble() : double.tryParse('$sum') ?? 0.0;
  }

  double get _totalDiscount {
    final d = _report?['summary']?['totalDiscount'];
    if (d == null) return 0.0;
    return (d is num) ? d.toDouble() : double.tryParse('$d') ?? 0.0;
  }

  int get _totalUnits {
    final units = _report?['summary']?['totalProductsUnits'];
    if (units == null) return 0;
    return (units is num) ? units.toInt() : int.tryParse('$units') ?? 0;
  }

  int get _totalBonifications {
    final b = _report?['summary']?['totalBonificationUnits'];
    if (b == null) return 0;
    return (b is num) ? b.toInt() : int.tryParse('$b') ?? 0;
  }

  int get _totalRegularUnits {
    final r = _report?['summary']?['totalRegularUnits'];
    if (r == null) return _totalUnits - _totalBonifications;
    return (r is num) ? r.toInt() : int.tryParse('$r') ?? 0;
  }

  List<dynamic> get _bonificationsSummary {
    return (_report?['bonificationsSummary'] as List?) ?? [];
  }

  /// Vista previa de Ticket Térmico (formato para impresoras Epson / Bluetooth)
  void _showThermalReceiptPreview() {
    if (_report == null) return;
    final summary = _report!['summary'] as Map<String, dynamic>? ?? {};
    final products = (_report!['productsSummary'] as List?) ?? [];
    final start = _report!['startDate'] ?? '';
    final end = _report!['endDate'] ?? '';

    final receiptText = StringBuffer();
    receiptText.writeln("================================");
    receiptText.writeln("       DISTRIBUIDORA PAPAS      ");
    receiptText.writeln("       REPORTE DE VENTAS        ");
    receiptText.writeln("================================");
    receiptText.writeln("Periodo: $start al $end");
    receiptText.writeln(
      "Fecha imp: ${DateTime.now().toString().substring(0, 16)}",
    );
    receiptText.writeln("--------------------------------");
    receiptText.writeln("Cant  Producto             Total");
    receiptText.writeln("--------------------------------");
    for (final p in products) {
      final name = (p['name'] ?? '').toString().padRight(16).substring(0, 16);
      final regularQty = p['regularQuantity'] ?? p['totalQuantity'] ?? 0;
      final qty = regularQty.toString().padRight(5);
      final amt = ((p['totalAmount'] ?? 0) as num)
          .toStringAsFixed(1)
          .padLeft(7);
      receiptText.writeln("$qty $name $amt");
    }
    if (_bonificationsSummary.isNotEmpty) {
      receiptText.writeln("--------------------------------");
      receiptText.writeln("BONIFICACIONES (REGALO / GRATIS):");
      receiptText.writeln("Cant  Producto");
      for (final b in _bonificationsSummary) {
        final bName = (b['name'] ?? '').toString().padRight(18).substring(0, 18);
        final bQty = (b['bonificationQuantity'] ?? 0).toString().padRight(5);
        receiptText.writeln("$bQty $bName");
      }
      receiptText.writeln("Total Bonif.:      $_totalBonifications unid");
    }
    receiptText.writeln("--------------------------------");
    receiptText.writeln("Pedidos Tomados:   ${summary['totalOrders'] ?? 0}");
    receiptText.writeln("Tiendas Atendidas: ${summary['totalStores'] ?? 0}");
    receiptText.writeln("Total Bolsas/Unid: $_totalUnits");
    if (_totalBonifications > 0) {
      receiptText.writeln("  - Venta regular: $_totalRegularUnits");
      receiptText.writeln("  - Bonificac.:    $_totalBonifications");
    }
    receiptText.writeln("--------------------------------");
    if (_totalDiscount > 0) {
      receiptText.writeln(
        "Subtotal bruto:    Bs. ${_totalBruto.toStringAsFixed(2)}",
      );
      receiptText.writeln(
        "Descuentos aplic.: Bs. ${_totalDiscount.toStringAsFixed(2)}",
      );
      receiptText.writeln("--------------------------------");
    }
    receiptText.writeln(
      "TOTAL RECAUDADO:   Bs. ${_totalSold.toStringAsFixed(2)}",
    );
    receiptText.writeln("================================");
    receiptText.writeln("\n\n   _________________________   ");
    receiptText.writeln("        Firma Preventista       ");
    receiptText.writeln("\n   _________________________   ");
    receiptText.writeln("         Firma Almacen          \n");

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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
              const Row(
                children: [
                  Icon(Icons.print, color: Color(0xFF3B82F6), size: 24),
                  SizedBox(width: 8),
                  Text(
                    'Ticket Térmico',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              const SizedBox(height: 6),
              // Text(
              //   'Formato monocromático 58mm / 80mm listo para enviar a impresoras portátiles bluetooth.',
              //   style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
              // ),
              const SizedBox(height: 14),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFFF9FAFB),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: SelectableText(
                  receiptText.toString(),
                  style: const TextStyle(
                    fontFamily: 'Courier',
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                    height: 1.3,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () => Navigator.pop(ctx),
                  icon: const Icon(Icons.check),
                  label: const Text('Cerrar Vista de Ticket'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF3B82F6),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final summary = _report?['summary'] as Map<String, dynamic>?;
    final products = (_report?['productsSummary'] as List?) ?? [];
    final startDateStr = _report?['startDate'] ?? '';
    final endDateStr = _report?['endDate'] ?? '';

    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6),
      appBar: AppBar(
        title: const Text('Reporte de Ventas'),
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.print_outlined),
            onPressed: _report == null ? null : _showThermalReceiptPreview,
            tooltip: 'Ticket Térmico / Epson',
          ),
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchReport,
            tooltip: 'Recargar',
          ),
        ],
      ),
      body: Column(
        children: [
          // ── Selector de Periodo (Hoy, 7 Días, Mes, Rango de Fechas) ──
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _PeriodChip(
                    label: '☀️ Hoy',
                    isSelected: _preset == 'today',
                    onTap: () {
                      setState(() {
                        _preset = 'today';
                        _customRange = null;
                      });
                      _fetchReport();
                    },
                  ),
                  const SizedBox(width: 8),
                  _PeriodChip(
                    label: '⏮️ Ayer',
                    isSelected: _preset == 'yesterday',
                    onTap: () {
                      setState(() {
                        _preset = 'yesterday';
                        _customRange = null;
                      });
                      _fetchReport();
                    },
                  ),
                  const SizedBox(width: 8),
                  _PeriodChip(
                    label: '📅 7 Días',
                    isSelected: _preset == 'this_week',
                    onTap: () {
                      setState(() {
                        _preset = 'this_week';
                        _customRange = null;
                      });
                      _fetchReport();
                    },
                  ),
                  const SizedBox(width: 8),
                  _PeriodChip(
                    label: '🗓️ Este Mes',
                    isSelected: _preset == 'this_month',
                    onTap: () {
                      setState(() {
                        _preset = 'this_month';
                        _customRange = null;
                      });
                      _fetchReport();
                    },
                  ),
                  const SizedBox(width: 8),
                  _PeriodChip(
                    label: '⏮️ Mes Ant.',
                    isSelected: _preset == 'last_month',
                    onTap: () {
                      setState(() {
                        _preset = 'last_month';
                        _customRange = null;
                      });
                      _fetchReport();
                    },
                  ),
                  const SizedBox(width: 8),
                  _PeriodChip(
                    label: _customRange != null
                        ? '🗓️ Rango Elegido'
                        : '🗓️ Desde-Hasta',
                    isSelected: _preset == 'custom',
                    onTap: _pickDateRange,
                  ),
                ],
              ),
            ),
          ),

          // Sub-barra con fecha visible
          if (startDateStr.isNotEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              color: const Color(0xFFEFF6FF),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Periodo: $startDateStr al $endDateStr',
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1D4ED8),
                    ),
                  ),
                  GestureDetector(
                    onTap: _pickDateRange,
                    child: const Text(
                      'Cambiar fechas',
                      style: TextStyle(
                        fontSize: 11,
                        color: Color(0xFF2563EB),
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ),
                ],
              ),
            ),

          // ── Contenido Principal ──
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _report == null
                ? const Center(child: Text('No hay datos disponibles'))
                : RefreshIndicator(
                    onRefresh: _fetchReport,
                    child: ListView(
                      padding: const EdgeInsets.all(14),
                      children: [
                        // ── 4 Tarjetas de Métricas del Periodo ──
                        Row(
                          children: [
                            Expanded(
                              child: _MetricCard(
                                icon: '💰',
                                title: 'Venta Total',
                                value: 'Bs. ${_totalSold.toStringAsFixed(1)}',
                                subtitle: 'Recaudación bruta',
                                color: Colors.green,
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: _MetricCard(
                                icon: '🥔',
                                title: 'Bolsas/Unid',
                                value: '$_totalUnits',
                                subtitle: 'Volumen total',
                                color: Colors.amber.shade900,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            Expanded(
                              child: _MetricCard(
                                icon: '📦',
                                title: 'Pedidos',
                                value: '${summary?['totalOrders'] ?? 0}',
                                subtitle: 'Tomados',
                                color: Colors.indigo,
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: _MetricCard(
                                icon: '🏪',
                                title: 'Tiendas',
                                value: '${summary?['totalStores'] ?? 0}',
                                subtitle: 'Alcanzadas',
                                color: Colors.blue,
                              ),
                            ),
                          ],
                        ),

                        // Fila de descuentos (solo si hay descuentos en el período)
                        if (_totalDiscount > 0) ...[
                          const SizedBox(height: 10),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 14,
                              vertical: 12,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.amber.shade50,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(color: Colors.amber.shade200),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.03),
                                  blurRadius: 6,
                                ),
                              ],
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  '🏷️ Resumen de Descuentos del Período',
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF92400E),
                                  ),
                                ),
                                const SizedBox(height: 10),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      'Subtotal bruto:',
                                      style: TextStyle(
                                        fontSize: 13,
                                        color: Colors.grey.shade700,
                                      ),
                                    ),
                                    Text(
                                      'Bs. ${_totalBruto.toStringAsFixed(2)}',
                                      style: TextStyle(
                                        fontSize: 13,
                                        color: Colors.grey.shade700,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text(
                                      'Descuentos aplicados:',
                                      style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.bold,
                                        color: Color(0xFFB45309),
                                      ),
                                    ),
                                    Text(
                                      '- Bs. ${_totalDiscount.toStringAsFixed(2)}',
                                      style: const TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.red,
                                      ),
                                    ),
                                  ],
                                ),
                                const Divider(height: 14),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text(
                                      'Total neto a cobrar:',
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w900,
                                        color: Color(0xFF065F46),
                                      ),
                                    ),
                                    Text(
                                      'Bs. ${_totalSold.toStringAsFixed(2)}',
                                      style: const TextStyle(
                                        fontSize: 15,
                                        fontWeight: FontWeight.w900,
                                        color: Color(0xFF059669),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],

                        // ── Resumen de Bonificaciones del Período (si las hay) ──
                        if (_totalBonifications > 0) ...[
                          const SizedBox(height: 10),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 14,
                              vertical: 12,
                            ),
                            decoration: BoxDecoration(
                              color: const Color(0xFFECFDF5),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: const Color(0xFFA7F3D0),
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.03),
                                  blurRadius: 6,
                                ),
                              ],
                            ),
                            child: Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFFD1FAE5),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: const Text('🎁', style: TextStyle(fontSize: 22)),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Bonificaciones del Período',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13,
                                          color: Color(0xFF065F46),
                                        ),
                                      ),
                                      Text(
                                        '$_totalBonifications unidades entregadas como regalo',
                                        style: TextStyle(
                                          fontSize: 11,
                                          color: Colors.grey.shade600,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Text(
                                  '$_totalBonifications unid',
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w900,
                                    color: Color(0xFF059669),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],

                        const SizedBox(height: 16),

                        // ── Botón de Ticket Térmico (Epson / Bluetooth) ──
                        Container(
                          width: double.infinity,
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF2563EB), Color(0xFF1D4ED8)],
                            ),
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(
                                  0xFF2563EB,
                                ).withValues(alpha: 0.3),
                                blurRadius: 8,
                                offset: const Offset(0, 3),
                              ),
                            ],
                          ),
                          child: Material(
                            color: Colors.transparent,
                            child: InkWell(
                              borderRadius: BorderRadius.circular(16),
                              onTap: _showThermalReceiptPreview,
                              child: const Padding(
                                padding: EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 14,
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.print,
                                      color: Colors.white,
                                      size: 20,
                                    ),
                                    SizedBox(width: 10),
                                    Text(
                                      'Ver Ticket Térmico',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 16),

                        // ── Desglose de Productos Vendidos ──
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.04),
                                blurRadius: 6,
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  const Text(
                                    '🥔 Productos Vendidos en el Periodo',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                      color: Colors.black87,
                                    ),
                                  ),
                                  Text(
                                    '${products.length} productos',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: Colors.grey,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              if (products.isEmpty)
                                const Center(
                                  child: Padding(
                                    padding: EdgeInsets.all(16.0),
                                    child: Text(
                                      'Sin ventas registradas en este periodo',
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.grey,
                                      ),
                                    ),
                                  ),
                                )
                              else
                                ...products.map((prod) {
                                  final totalAmt = prod['totalAmount'] ?? 0;
                                  final boniQty = (prod['bonificationQuantity'] ?? 0) as int;
                                  final regularQty = prod['regularQuantity'] ?? (prod['totalQuantity'] ?? 0) - boniQty;

                                  return Container(
                                    margin: const EdgeInsets.only(bottom: 8),
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 12,
                                      vertical: 10,
                                    ),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFF9FAFB),
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(
                                        color: Colors.grey.shade200,
                                      ),
                                    ),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                prod['name'] ?? '',
                                                style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 13,
                                                ),
                                              ),
                                              Text(
                                                '${prod['category'] ?? ''} • ${prod['unit'] ?? ''}',
                                                style: TextStyle(
                                                  fontSize: 11,
                                                  color: Colors.grey.shade600,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.end,
                                          children: [
                                            Wrap(
                                              alignment: WrapAlignment.end,
                                              spacing: 4,
                                              runSpacing: 4,
                                              children: [
                                                Container(
                                                  padding:
                                                      const EdgeInsets.symmetric(
                                                        horizontal: 8,
                                                        vertical: 2,
                                                      ),
                                                  decoration: BoxDecoration(
                                                    color: Colors.amber.shade50,
                                                    borderRadius:
                                                        BorderRadius.circular(6),
                                                    border: Border.all(
                                                      color: Colors.amber.shade200,
                                                    ),
                                                  ),
                                                  child: Text(
                                                    '$regularQty venta',
                                                    style: TextStyle(
                                                      fontSize: 11,
                                                      fontWeight: FontWeight.bold,
                                                      color: Colors.amber.shade900,
                                                    ),
                                                  ),
                                                ),
                                                if (boniQty > 0)
                                                  Container(
                                                    padding:
                                                        const EdgeInsets.symmetric(
                                                          horizontal: 6,
                                                          vertical: 2,
                                                        ),
                                                    decoration: BoxDecoration(
                                                      color: const Color(0xFFECFDF5),
                                                      borderRadius:
                                                          BorderRadius.circular(6),
                                                      border: Border.all(
                                                        color: const Color(0xFFA7F3D0),
                                                      ),
                                                    ),
                                                    child: Text(
                                                      '🎁 +$boniQty bonif.',
                                                      style: const TextStyle(
                                                        fontSize: 10,
                                                        fontWeight: FontWeight.bold,
                                                        color: Color(0xFF059669),
                                                      ),
                                                    ),
                                                  ),
                                              ],
                                            ),
                                            const SizedBox(height: 3),
                                            Text(
                                              'Bs. ${(totalAmt is num) ? totalAmt.toStringAsFixed(1) : totalAmt.toString()}',
                                              style: const TextStyle(
                                                fontSize: 13,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.green,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  );
                                }),
                            ],
                          ),
                        ),

                        // ── Desglose Detallado de Bonificaciones Entregadas ──
                        if (_bonificationsSummary.isNotEmpty) ...[
                          const SizedBox(height: 16),
                          Container(
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: const Color(0xFFA7F3D0),
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.04),
                                  blurRadius: 6,
                                ),
                              ],
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Row(
                                      children: [
                                        Text('🎁', style: TextStyle(fontSize: 16)),
                                        SizedBox(width: 6),
                                        Text(
                                          'Bonificaciones Entregadas',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 14,
                                            color: Color(0xFF065F46),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Text(
                                      '$_totalBonifications unid. gratis',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: Color(0xFF059669),
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 12),
                                ..._bonificationsSummary.map((boni) {
                                  return Container(
                                    margin: const EdgeInsets.only(bottom: 8),
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 12,
                                      vertical: 10,
                                    ),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFF0FDF4),
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(
                                        color: const Color(0xFFDCFCE7),
                                      ),
                                    ),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                boni['name'] ?? '',
                                                style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 13,
                                                  color: Color(0xFF065F46),
                                                ),
                                              ),
                                              Text(
                                                '${boni['category'] ?? ''} • ${boni['unit'] ?? ''}',
                                                style: TextStyle(
                                                  fontSize: 11,
                                                  color: Colors.grey.shade600,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                            horizontal: 10,
                                            vertical: 4,
                                          ),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFFD1FAE5),
                                            borderRadius:
                                                BorderRadius.circular(8),
                                            border: Border.all(
                                              color: const Color(0xFFA7F3D0),
                                            ),
                                          ),
                                          child: Text(
                                            '🎁 ${boni['bonificationQuantity']} unidades',
                                            style: const TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFF065F46),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  );
                                }),
                              ],
                            ),
                          ),
                        ],

                        const SizedBox(height: 20),
                      ],
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}

class _PeriodChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _PeriodChip({
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

class _MetricCard extends StatelessWidget {
  final String icon;
  final String title;
  final String value;
  final String subtitle;
  final Color color;

  const _MetricCard({
    required this.icon,
    required this.title,
    required this.value,
    required this.subtitle,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 6),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey,
                ),
              ),
              Text(icon, style: const TextStyle(fontSize: 16)),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            value,
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w900,
              color: color,
            ),
          ),
          Text(
            subtitle,
            style: TextStyle(fontSize: 10, color: Colors.grey.shade500),
          ),
        ],
      ),
    );
  }
}
