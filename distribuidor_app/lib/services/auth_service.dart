import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/api.dart';
import '../models/user.dart';

class AuthService {
  static Future<Map<String, dynamic>> login(
    String email,
    String password,
  ) async {
    final res = await http.post(
      Uri.parse('${Api.baseUrl}/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    final data = jsonDecode(res.body);

    if (res.statusCode == 200) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', data['token']);
      await prefs.setString('user', jsonEncode(data['user']));
      return {'success': true, 'user': data['user']};
    }

    return {'success': false, 'message': data['message']};
  }

  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    await prefs.remove('user');
  }

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  static Future<User?> getUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userStr = prefs.getString('user');
    if (userStr == null) return null;
    return User.fromJson(jsonDecode(userStr));
  }
}
