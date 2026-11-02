import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import '../config/api.dart';
import '../models/client.dart';
import 'auth_service.dart';

class ClientService {
  static Future<Map<String, String>> _headers() async {
    final token = await AuthService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  static Future<List<Client>> getClients() async {
    final res = await http.get(
      Uri.parse('${Api.baseUrl}/clients'),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((c) => Client.fromJson(c)).toList();
    }
    throw Exception('Error al cargar clientes');
  }

  static Future<Client> createClient({
    required String name,
    required String ownerName,
    required String phone,
    required String address,
    required double latitude,
    required double longitude,
    File? imageFile,
  }) async {
    final token = await AuthService.getToken();
    final request = http.MultipartRequest(
      'POST',
      Uri.parse('${Api.baseUrl}/clients'),
    );
    request.headers['Authorization'] = 'Bearer $token';
    request.fields['name'] = name;
    request.fields['ownerName'] = ownerName;
    request.fields['phone'] = phone;
    request.fields['address'] = address;
    request.fields['latitude'] = latitude.toString();
    request.fields['longitude'] = longitude.toString();

    if (imageFile != null) {
      request.files.add(await http.MultipartFile.fromPath(
        'photo',
        imageFile.path,
        contentType: MediaType('image', 'jpeg'),
      ));
    }

    final response = await request.send();
    final body = await response.stream.bytesToString();
    if (response.statusCode == 201) {
      return Client.fromJson(jsonDecode(body));
    }
    try {
      final decoded = jsonDecode(body);
      throw Exception(decoded['message'] ?? 'Error al crear cliente: ${response.statusCode}');
    } catch (e) {
      throw Exception('Error del servidor (${response.statusCode}): ${body.length > 100 ? body.substring(0, 100) : body}');
    }
  }

  static Future<Client> updateClient({
    required int id,
    required String name,
    required String ownerName,
    required String phone,
    required String address,
    required double latitude,
    required double longitude,
    File? imageFile,
  }) async {
    final token = await AuthService.getToken();
    final request = http.MultipartRequest(
      'PUT',
      Uri.parse('${Api.baseUrl}/clients/$id'),
    );
    request.headers['Authorization'] = 'Bearer $token';
    request.fields['name'] = name;
    request.fields['ownerName'] = ownerName;
    request.fields['phone'] = phone;
    request.fields['address'] = address;
    request.fields['latitude'] = latitude.toString();
    request.fields['longitude'] = longitude.toString();

    if (imageFile != null) {
      request.files.add(await http.MultipartFile.fromPath(
        'photo',
        imageFile.path,
        contentType: MediaType('image', 'jpeg'),
      ));
    }

    final response = await request.send();
    final body = await response.stream.bytesToString();
    if (response.statusCode == 200) {
      return Client.fromJson(jsonDecode(body));
    }
    try {
      final decoded = jsonDecode(body);
      throw Exception(
        decoded['message'] ?? 'Error al actualizar cliente (${response.statusCode})',
      );
    } catch (e) {
      throw Exception('Error del servidor (${response.statusCode}): ${body.length > 100 ? body.substring(0, 100) : body}');
    }
  }

  static Future<void> deleteClient(int id) async {
    final res = await http.delete(
      Uri.parse('${Api.baseUrl}/clients/$id'),
      headers: await _headers(),
    );
    if (res.statusCode != 200) throw Exception('Error al eliminar cliente');
  }
}
