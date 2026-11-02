class Api {
  // ─────────────────────────────────────────────────────────────
  //  CONFIGURACIÓN DE ENTORNO
  //  Cambia SOLO esta línea según el entorno:
  //
  //  DESARROLLO local:
  //    → Si usas emulador Android:  'http://10.0.2.2:3000/api'
  //    → Si usas dispositivo físico: 'http://192.168.X.X:3000/api'
  //
  //  PRODUCCIÓN (VPS):
  //    → 'http://TU_IP_O_DOMINIO:3000/api'
  //    → Si tienes dominio + SSL: 'https://api.tudominio.com/api'
  // ─────────────────────────────────────────────────────────────
  static const String baseUrl = 'http://178.105.45.6:3000/api'; // Producción

  //static const String baseUrl = 'http://10.0.2.2:3000/api'; // Local dev (emulador Android)
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
