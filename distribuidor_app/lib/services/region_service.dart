import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:latlong2/latlong.dart';
import '../config/api.dart';
import 'auth_service.dart';

class RegionInfo {
  final int id;
  final String name;
  final String color;
  final List<LatLng> points;

  const RegionInfo({
    required this.id,
    required this.name,
    required this.color,
    this.points = const [],
  });

  factory RegionInfo.fromJson(Map<String, dynamic> json) {
    List<LatLng> pts = [];
    if (json['polygon'] != null && json['polygon']['coordinates'] != null) {
      try {
        final coords = json['polygon']['coordinates'];
        if (coords is List && coords.isNotEmpty) {
          final ring = coords[0] is List && coords[0].isNotEmpty && coords[0][0] is List
              ? coords[0]
              : coords;
          for (final item in ring) {
            if (item is List && item.length >= 2) {
              final lng = (item[0] as num).toDouble();
              final lat = (item[1] as num).toDouble();
              pts.add(LatLng(lat, lng));
            }
          }
        }
      } catch (_) {}
    }

    return RegionInfo(
      id: json['id'] as int,
      name: json['name'] as String,
      color: json['color'] as String? ?? '#3B82F6',
      points: pts,
    );
  }
}


class RegionService {
  static Future<Map<String, String>> _headers() async {
    final token = await AuthService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  /// Retorna las zonas asignadas al usuario autenticado (preventista/distribuidor)
  static Future<List<RegionInfo>> getMyRegions() async {
    final res = await http.get(
      Uri.parse('${Api.baseUrl}/regions/me'),
      headers: await _headers(),
    );
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((r) => RegionInfo.fromJson(r)).toList();
    }
    throw Exception('Error al cargar zonas asignadas');
  }
}
