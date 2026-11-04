class Api {
  // ─────────────────────────────────────────────────────────────
  //  CONFIGURACIÓN DE ENTORNO
  //  El valor local se usa si no se define API_BASE_URL al compilar.
  //
  //  DESARROLLO local:
  //    → Si usas emulador Android, 10.0.2.2 representa el localhost del PC.
  //    → Si usas dispositivo físico, cambia 10.0.2.2 por la IP local del PC.
  //
  //  PRODUCCIÓN (VPS):
  //    → flutter build apk --release --dart-define=API_BASE_URL=http://TU_IP_PUBLICA/api
  //    → Si tienes dominio + SSL: 'https://api.tudominio.com/api'
  // ─────────────────────────────────────────────────────────────
  // static const String baseUrl = String.fromEnvironment(
  //   'API_BASE_URL',
  //   defaultValue: 'http://192.168.100.4:3001/api',
  // );

  static const String baseUrl = 'http://169.58.255.180:3001/api'; // VPS contabo
  //static const String baseUrl = 'http://localhost:3001/api'; // Solo web/desktop
  //static const String baseUrl = 'http://192.168.1.148:3000/api'; // Local dev (dispositivo físico WiFi)
  //static const String baseUrl = 'http://192.168.100.4:3000/api';
  //static const String baseUrl = 'http://192.168.3.162:3000/api';

  /// Convierte la photoUrl guardada en la DB a una URL completa accesible.
  /// Maneja tanto rutas relativas ('uploads/clients/foto.jpg')
  /// como URLs absolutas antiguas ('http://localhost:3000/uploads/...').
  static String getImageUrl(String photoUrl) {
    if (photoUrl.isEmpty) return '';

    final serverBase = baseUrl.replaceAll('/api', ''); // http://IP:3000

    // URL absoluta con localhost (datos viejos) → reemplazar por IP actual
    if (photoUrl.startsWith('http') && photoUrl.contains('localhost')) {
      final uri = Uri.parse(photoUrl);
      return '$serverBase${uri.path}${uri.query.isEmpty ? '' : '?${uri.query}'}';
    }

    // URL absoluta normal → devolver tal cual
    if (photoUrl.startsWith('http')) return photoUrl;

    // Ruta relativa (formato actual) → construir URL con la base del servidor
    return '$serverBase/${photoUrl.startsWith('/') ? photoUrl.substring(1) : photoUrl}';
  }
}
