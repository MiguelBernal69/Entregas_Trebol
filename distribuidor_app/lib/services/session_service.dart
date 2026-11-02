import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api.dart';
import 'auth_service.dart';

class SessionService {
  static Future<Map<String, String>> _headers() async {
    final token = await AuthService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  /// Obtiene la sesión activa del distribuidor (o null si no hay)
  static Future<Map<String, dynamic>?> getActiveSession() async {
    final res = await http.get(
      Uri.parse('${Api.baseUrl}/distributor/session'),
      headers: await _headers(),
    ).timeout(const Duration(seconds: 8));

    if (res.statusCode == 200) {
      final data = jsonDecode(res.body);
      return data;
    }
    return null;
  }

  /// Abre una nueva sesión de distribución
  static Future<Map<String, dynamic>?> openSession() async {
    final res = await http.post(
      Uri.parse('${Api.baseUrl}/distributor/session/open'),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    }
    throw Exception(jsonDecode(res.body)['message'] ?? 'Error al abrir sesión');
  }

  /// Obtiene el reporte de la sesión activa
  static Future<Map<String, dynamic>> getSessionReport() async {
    final res = await http.get(
      Uri.parse('${Api.baseUrl}/distributor/session/report'),
      headers: await _headers(),
    ).timeout(const Duration(seconds: 10));

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    }
    throw Exception(jsonDecode(res.body)['message'] ?? 'Error al obtener reporte');
  }

  /// Cierra la sesión activa del distribuidor
  static Future<Map<String, dynamic>?> closeSession() async {
    final res = await http.post(
      Uri.parse('${Api.baseUrl}/distributor/session/close'),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    }
    throw Exception(jsonDecode(res.body)['message'] ?? 'Error al cerrar sesión');
  }
}
