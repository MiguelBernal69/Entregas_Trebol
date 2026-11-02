import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  User? _user;
  bool _loading = true;

  User? get user => _user;
  bool get loading => _loading;
  bool get isLoggedIn => _user != null;

  AuthProvider() {
    _loadUser();
  }

  Future<void> _loadUser() async {
    _user = await AuthService.getUser();
    _loading = false;
    notifyListeners();
  }

  Future<String?> login(String email, String password) async {
    final result = await AuthService.login(email, password);
    if (result['success']) {
      _user = User.fromJson(result['user']);
      notifyListeners();
      return null;
    }
    return result['message'];
  }

  Future<void> logout() async {
    await AuthService.logout();
    _user = null;
    notifyListeners();
  }
}
