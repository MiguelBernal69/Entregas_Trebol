# Mobile App - Lector/Distribuidor

Esta es la aplicación móvil del sistema, desarrollada utilizando **Flutter** y **Dart**. Permite a los distribuidores o lectores de campo gestionar sus entregas/lecturas, ver su ruta y usar mapas integrados para la navegación.

## Requisitos previos

- Flutter SDK (versión 3.11.4 o superior recomendada)
- Android Studio / Xcode configurado para compilación de apps móviles.

## Configuración del entorno

1. Ve a la carpeta `distribuidor_app`.
2. Revisa el archivo `lib/config/api.dart` para asegurar que las constantes que apuntan a la URL de tu servidor/API (backend) son correctas para tu entorno de desarrollo o producción.

## Instalación de dependencias

Descarga los paquetes necesarios (equivalente a npm install en Node.js) ejecutando el siguiente comando:

```bash
flutter pub get
```

## Ejecución en modo desarrollo

Para probar la app en un emulador o un dispositivo físico conectado, ejecuta:

```bash
flutter run
```

## Compilación para producción (Generar APK)

Para generar el archivo ejecutable (APK) de Android que puedes enviar a tu cliente o publicar en tiendas:

```bash
flutter build apk --release
```
El archivo compilado se guardará en `build/app/outputs/flutter-apk/app-release.apk`.

## Tecnologías principales

- Flutter & Dart
- Provider (para manejo de estado)
- HTTP (para comunicación con la API REST)
- Flutter Map & LatLong2 (para integración de mapas sin costo base como OSM)
- Geolocator (para geolocalización y seguimiento de ruta)
- Shared Preferences (para almacenamiento en caché del usuario y tokens)
