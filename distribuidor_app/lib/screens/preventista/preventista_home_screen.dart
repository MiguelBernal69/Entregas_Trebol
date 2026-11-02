import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/client_service.dart';
import '../../services/region_service.dart';
// import '../../services/order_service.dart'; // We would fetch orders stats similarly if needed
import 'clients_screen.dart';
import 'preventista_orders_screen.dart';
import 'preventista_report_screen.dart';
import '../../config/version.dart';

class PreventistaHomeScreen extends StatefulWidget {
  const PreventistaHomeScreen({super.key});

  @override
  State<PreventistaHomeScreen> createState() => _PreventistaHomeScreenState();
}

class _PreventistaHomeScreenState extends State<PreventistaHomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const _PreventistaDashboard(),
    const ClientsScreen(),
    const PreventistaOrdersScreen(),
    const PreventistaReportScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: _screens),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
        selectedItemColor: const Color(0xFF3B82F6),
        unselectedItemColor: Colors.grey.shade500,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_outlined),
            activeIcon: Icon(Icons.dashboard),
            label: 'Resumen',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.groups_outlined),
            activeIcon: Icon(Icons.groups),
            label: 'Clientes',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_bag_outlined),
            activeIcon: Icon(Icons.shopping_bag),
            label: 'Pedidos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.analytics_outlined),
            activeIcon: Icon(Icons.analytics),
            label: 'Reporte',
          ),
        ],
      ),
    );
  }
}


class _PreventistaDashboard extends StatefulWidget {
  const _PreventistaDashboard();

  @override
  State<_PreventistaDashboard> createState() => _PreventistaDashboardState();
}

class _PreventistaDashboardState extends State<_PreventistaDashboard> {
  bool _loading = true;
  int _clientsCount = 0;
  List<RegionInfo> _myZones = [];

  @override
  void initState() {
    super.initState();
    _fetchStats();
  }

  Future<void> _fetchStats() async {
    setState(() => _loading = true);
    try {
      final results = await Future.wait([
        ClientService.getClients(),
        RegionService.getMyRegions(),
      ]);

      if (mounted) {
        setState(() {
          _clientsCount = (results[0] as List).length;
          _myZones = results[1] as List<RegionInfo>;
          _loading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _loading = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: $e'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 10),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = context.read<AuthProvider>().user;

    return Scaffold(
      backgroundColor: const Color(0xFFF3F4F6),
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Text(
                  'Panel Preventista',
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
              'Hola, ${user?.name ?? ""}',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(Icons.refresh), onPressed: _fetchStats),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => context.read<AuthProvider>().logout(),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _fetchStats,
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // --- Banner de Zonas Asignadas ---
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.05),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.map_outlined,
                                  size: 18, color: Color(0xFF3B82F6)),
                              SizedBox(width: 8),
                              Text(
                                'Tus zonas de preventa',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black87,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          if (_myZones.isEmpty)
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 12, vertical: 8),
                              decoration: BoxDecoration(
                                color: const Color(0xFFFEF3C7),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(
                                    color: const Color(0xFFFDE68A)),
                              ),
                              child: const Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(Icons.warning_amber_rounded,
                                      size: 14,
                                      color: Color(0xFFD97706)),
                                  SizedBox(width: 6),
                                  Text(
                                    'Sin zonas asignadas — contacta al admin',
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: Color(0xFFD97706),
                                    ),
                                  ),
                                ],
                              ),
                            )
                          else
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: _myZones
                                  .map((zone) => _ZoneChip(zone: zone))
                                  .toList(),
                            ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 20),

                    const Text(
                      'Resumen de tu Zona',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.black87,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: _StatCard(
                            title: 'Tus Clientes',
                            value: '$_clientsCount',
                            subtitle: 'En tu ruta',
                            icon: Icons.store_mall_directory,
                            color: Colors.blue,
                          ),
                        ),
                        const SizedBox(width: 12),
                        const Expanded(
                          child: _StatCard(
                            title: 'Pedidos Hoy',
                            value: '--',
                            subtitle: 'En desarrollo',
                            icon: Icons.shopping_cart_checkout,
                            color: Colors.purple,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}

/// Chip de color para mostrar una zona asignada
class _ZoneChip extends StatelessWidget {
  final RegionInfo zone;
  const _ZoneChip({required this.zone});

  Color _parseColor(String hex) {
    try {
      final cleaned = hex.replaceFirst('#', '');
      final value = int.parse(
        cleaned.length == 6 ? 'FF\$cleaned' : cleaned,
        radix: 16,
      );
      return Color(value);
    } catch (_) {
      return const Color(0xFF3B82F6);
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _parseColor(zone.color);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.3),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 6,
            height: 6,
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.7),
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            zone.name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final String subtitle;
  final IconData icon;
  final MaterialColor color;

  const _StatCard({
    required this.title,
    required this.value,
    required this.subtitle,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 28),
          const SizedBox(height: 12),
          Text(
            value,
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.w900,
              color: color.shade700,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),
          Text(
            subtitle,
            style: const TextStyle(fontSize: 12, color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
