import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api.dart';
import '../models/order.dart';
import '../models/product.dart';
import 'auth_service.dart';

class PreventistaOrderService {
  static Future<Map<String, String>> _headers() async {
    final token = await AuthService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  static Future<List<Order>> getMyOrders({
    int page = 1,
    int limit = 30,
    String? date,
  }) async {
    final dateParam = (date != null && date != 'all') ? '&date=$date' : '';
    final res = await http.get(
      Uri.parse('${Api.baseUrl}/orders?page=$page&limit=$limit$dateParam'),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((o) => Order.fromJson(o)).toList();
    }
    throw Exception('Error al cargar pedidos');
  }

  static Future<Map<String, dynamic>> getDailyReport({
    String? date,
    String? startDate,
    String? endDate,
  }) async {
    String query = '';
    if (startDate != null && endDate != null) {
      query = '?startDate=$startDate&endDate=$endDate';
    } else if (date != null && date.isNotEmpty) {
      query = '?date=$date';
    }
    final url = '${Api.baseUrl}/orders/daily-report$query';
    final res = await http.get(
      Uri.parse(url),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    throw Exception('Error al cargar reporte de ventas');
  }



  static Future<List<Product>> getProducts() async {
    final res = await http.get(
      Uri.parse('${Api.baseUrl}/products'),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((p) => Product.fromJson(p)).toList();
    }
    throw Exception('Error al cargar productos');
  }

  static Future<Order> createOrder({
    required int clientId,
    String? notes,
    double? discount,
    required List<Map<String, dynamic>> items,
  }) async {
    final res = await http.post(
      Uri.parse('${Api.baseUrl}/orders'),
      headers: await _headers(),
      body: jsonEncode({
        'clientId': clientId,
        'notes': notes,
        'discount': discount ?? 0.0,
        'items': items, // cada item puede tener isBonification: true
      }),
    );
    final data = jsonDecode(res.body);
    if (res.statusCode == 201) return Order.fromJson(data);
    throw Exception(data['message'] ?? 'Error al crear pedido');
  }

  static Future<Order> updateOrder({
    required int orderId,
    String? notes,
    double? discount,
    required List<Map<String, dynamic>> items,
  }) async {
    final res = await http.put(
      Uri.parse('${Api.baseUrl}/orders/$orderId'),
      headers: await _headers(),
      body: jsonEncode({
        'notes': notes,
        if (discount != null) 'discount': discount,
        'items': items,
      }),
    );
    final data = jsonDecode(res.body);
    if (res.statusCode == 200) return Order.fromJson(data);
    throw Exception(data['message'] ?? 'Error al actualizar pedido');
  }

  static Future<List<int>> getMyVisitedToday() async {
    final res = await http.get(
      Uri.parse('${Api.baseUrl}/orders/my-visited-today'),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      final data = jsonDecode(res.body);
      return List<int>.from(data['clientIds'] ?? []);
    }
    throw Exception('Error al cargar clientes visitados hoy');
  }
}
