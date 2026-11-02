import 'package:shared_preferences/shared_preferences.dart';

class VisitService {
  static String _todayKey() {
    final now = DateTime.now();
    final yyyy = now.year.toString().padLeft(4, '0');
    final mm = now.month.toString().padLeft(2, '0');
    final dd = now.day.toString().padLeft(2, '0');
    return 'visited_no_order_${yyyy}_${mm}_$dd';
  }

  /// Retorna los IDs de clientes marcados hoy como visitados sin pedido
  static Future<Set<int>> getNoOrderVisitedToday() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final list = prefs.getStringList(_todayKey()) ?? [];
      return list.map((e) => int.tryParse(e)).whereType<int>().toSet();
    } catch (_) {
      return {};
    }
  }

  /// Marca un cliente como visitado hoy (sin pedido / no compró)
  static Future<void> markAsVisitedNoOrder(int clientId, {String? reason}) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final key = _todayKey();
      final list = prefs.getStringList(key) ?? [];
      final idStr = clientId.toString();
      if (!list.contains(idStr)) {
        list.add(idStr);
        await prefs.setStringList(key, list);
      }
    } catch (_) {}
  }

  /// Desmarca un cliente visitado sin pedido para que vuelva a estar pendiente
  static Future<void> unmarkVisitedNoOrder(int clientId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final key = _todayKey();
      final list = prefs.getStringList(key) ?? [];
      list.remove(clientId.toString());
      await prefs.setStringList(key, list);
    } catch (_) {}
  }
}
