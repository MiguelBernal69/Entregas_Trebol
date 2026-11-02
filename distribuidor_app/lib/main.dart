import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'screens/login_screen.dart';

import 'screens/preventista/preventista_home_screen.dart';

import 'screens/distribuidor/distribuidor_home_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AuthProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App Pedidos',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF3B82F6)),
        useMaterial3: true,
      ),
      home: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          if (auth.loading) {
            return const Scaffold(body: Center(child: CircularProgressIndicator()));
          }
          if (!auth.isLoggedIn) return const LoginScreen();

          // Redirige según el rol
          switch (auth.user?.role) {
            case 'distribuidor':
              return const DistribuidorHomeScreen();
            case 'preventista':
              return const PreventistaHomeScreen();
            default:
              return const Scaffold(
                body: Center(child: Text('Rol no permitido en esta app')));
          }
        },
      ),
    );
  }
}