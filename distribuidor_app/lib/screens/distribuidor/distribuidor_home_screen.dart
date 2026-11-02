import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../services/session_service.dart';
import '../orders_screen.dart';
import 'report_screen.dart';

class DistribuidorHomeScreen extends StatefulWidget {
  const DistribuidorHomeScreen({super.key});

  @override
  State<DistribuidorHomeScreen> createState() => _DistribuidorHomeScreenState();
}

class _DistribuidorHomeScreenState extends State<DistribuidorHomeScreen> {
  int _currentIndex = 0;
  bool _hasSession = false;
  bool _loadingSession = true;

  @override
  void initState() {
    super.initState();
    _checkSession();
  }

  Future<void> _checkSession() async {
    setState(() => _loadingSession = true);
    try {
      final session = await SessionService.getActiveSession();
      setState(() {
        _hasSession = session != null;
        _loadingSession = false;
      });
    } catch (_) {
      setState(() => _loadingSession = false);
    }
  }

  Future<void> _startDay() async {
    setState(() => _loadingSession = true);
    try {
      await SessionService.openSession();
      setState(() {
        _hasSession = true;
        _loadingSession = false;
      });
    } catch (e) {
      setState(() => _loadingSession = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString()), backgroundColor: Colors.red),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loadingSession) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (!_hasSession) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Entregas Papas'),
          actions: [
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: () => context.read<AuthProvider>().logout(),
            ),
          ],
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.local_shipping, size: 80, color: Colors.blue.shade200),
              const SizedBox(height: 16),
              const Text(
                '¿Listo para empezar la ruta?',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 40),
                child: Text(
                  'El administrador te ha asignado carga, pero necesitas iniciar tu día para empezar a entregar.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey),
                ),
              ),
              const SizedBox(height: 32),
              ElevatedButton.icon(
                onPressed: _startDay,
                icon: const Icon(Icons.play_arrow),
                label: const Text(
                  'Iniciar Día',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 32,
                    vertical: 16,
                  ),
                  backgroundColor: const Color(0xFF3B82F6),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: [
          const OrdersScreen(),
          ReportScreen(onSessionEnded: _checkSession),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
        selectedItemColor: const Color(0xFF3B82F6),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.local_shipping),
            label: 'Mi Ruta',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.assessment),
            label: 'Reporte',
          ),
        ],
      ),
    );
  }
}
