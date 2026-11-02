# 📱 Documentación de la App Móvil

**Tecnología:** Flutter + Dart + Provider (gestión de estado) + HTTP + SharedPreferences + flutter_map

La app móvil es para dos roles: **Distribuidor** y **Preventista**. Se conecta al mismo backend que el frontend web.

---

## 🗂️ Estructura General

```
lib/
├── main.dart                    # Punto de entrada
├── config/api.dart              # URL base del backend
├── models/                      # Modelos de datos (JSON ↔ Dart)
│   ├── order.dart
│   ├── client.dart
│   ├── user.dart
│   └── product.dart
├── providers/
│   └── auth_provider.dart       # Estado global de autenticación
├── services/                    # Llamadas HTTP al backend
│   ├── auth_service.dart
│   ├── order_service.dart
│   ├── client_service.dart
│   └── preventista_order_service.dart
├── screens/
│   ├── login_screen.dart
│   ├── orders_screen.dart       # Ruta del distribuidor
│   ├── map_screen.dart          # Mapa de entregas
│   ├── distribuidor/
│   │   └── distribuidor_home_screen.dart
│   └── preventista/
│       ├── preventista_home_screen.dart
│       ├── clients_screen.dart
│       └── preventista_orders_screen.dart
└── widgets/
    └── client_details_sheet.dart
```

---

## 🚀 Punto de Entrada — `main.dart`

#### `main()`
Arranca la aplicación envolviendo todo en un `ChangeNotifierProvider` que provee el `AuthProvider` a todo el árbol de widgets.

#### `MyApp`
Widget raíz. Usa `Consumer<AuthProvider>` para reaccionar al estado de autenticación:
- Si `auth.loading == true` → muestra un `CircularProgressIndicator` mientras carga.
- Si `!auth.isLoggedIn` → muestra `LoginScreen`.
- Si el rol es `'distribuidor'` → navega a `DistribuidorHomeScreen`.
- Si el rol es `'preventista'` → navega a `PreventistaHomeScreen`.
- Cualquier otro rol → muestra mensaje de error.

---

## 📊 Modelos de Datos — `models/`

Los modelos convierten el JSON de la API a objetos Dart y viceversa.

### `order.dart`

#### `OrderItem`
Representa un ítem dentro de un pedido.
- Campos: `id`, `quantity`, `unitPrice`, `productName`, `productUnit`
- **`OrderItem.fromJson(json)`**: Extrae los datos del JSON. Maneja valores nulos con fallbacks. El nombre del producto viene anidado en `json['product']['name']`.

#### `OrderClient`
Datos del cliente para mostrar en la tarjeta de pedido.
- Campos: `id`, `name`, `ownerName`, `phone`, `address`, `latitude`, `longitude`, `photoUrl?`
- **`OrderClient.fromJson(json)`**: Convierte coordenadas con `.toDouble()` para manejar valores enteros del JSON.

#### `Order`
Pedido completo.
- Campos: `id`, `status`, `notes?`, `createdAt`, `client`, `items`
- **`double get total`**: Propiedad calculada (getter). Suma `unitPrice × quantity` de todos los items con `fold`.
- **`Order.fromJson(json)`**: Deserializa recursivamente el cliente y la lista de items.

---

### `client.dart`

#### `Client`
Datos de un cliente/tienda.
- Campos: `id`, `name`, `ownerName`, `phone`, `address`, `latitude`, `longitude`, `photoUrl?`, `isActive`
- **`Client.fromJson(json)`**: Conversión directa del JSON.

---

### `user.dart`

#### `User`
Datos del usuario autenticado.
- Campos: `id`, `name`, `email`, `role`, `phone?`
- **`User.fromJson(json)`**: Conversión directa.

---

### `product.dart`

#### `Product`
Producto del catálogo.
- Campos: `id`, `name`, `price`, `unit`, `isActive`
- **`Product.fromJson(json)`**: Convierte `price` a `double`.

---

## 🔐 Provider — `providers/auth_provider.dart`

### `AuthProvider extends ChangeNotifier`

Es el "cerebro" de la autenticación. Notifica a los widgets cuando el estado de sesión cambia.

Estado interno:
- `_user` → usuario autenticado (o `null`)
- `_loading` → `true` mientras carga la sesión guardada

#### `AuthProvider()` (constructor)
Al crear el provider, llama inmediatamente a `_loadUser()` para restaurar la sesión guardada.

#### `get user` / `get loading` / `get isLoggedIn`
Getters que exponen el estado. `isLoggedIn` devuelve `_user != null`.

#### `_loadUser()`
Método privado. Lee el usuario desde `SharedPreferences` (sesión persistida). Cuando termina, pone `_loading = false` y notifica a los oyentes para que la UI reaccione.

#### `login(email, password)`
1. Llama a `AuthService.login()`.
2. Si tiene éxito, deserializa el objeto `User` del resultado y llama a `notifyListeners()`.
3. Devuelve `null` si el login fue exitoso, o el mensaje de error si falló.

#### `logout()`
Llama a `AuthService.logout()` para limpiar `SharedPreferences`. Pone `_user = null` y notifica a los oyentes (lo que regresa a la pantalla de login).

---

## 🌐 Servicios — `services/`

Los servicios encapsulan toda la comunicación HTTP con el backend.

### `auth_service.dart` — `AuthService`

#### `login(email, password)` → `Future<Map<String, dynamic>>`
1. Hace `POST /auth/login` con email y contraseña en JSON.
2. Si el status es 200:
   - Guarda el `token` en `SharedPreferences`.
   - Guarda el objeto `user` serializado como String en `SharedPreferences`.
   - Devuelve `{'success': true, 'user': ...}`.
3. Si falla, devuelve `{'success': false, 'message': ...}`.

#### `logout()` → `Future<void>`
Elimina `'token'` y `'user'` de `SharedPreferences`.

#### `getToken()` → `Future<String?>`
Lee el token guardado en `SharedPreferences`. Devuelve `null` si no hay sesión.

#### `getUser()` → `Future<User?>`
Lee el JSON de usuario guardado, lo decodifica y devuelve un objeto `User`. Devuelve `null` si no hay sesión.

---

### `order_service.dart` — `OrderService`

#### `_headers()` → `Future<Map<String, String>>` *(privado)*
Obtiene el token con `AuthService.getToken()` y construye el mapa de headers con `Content-Type: application/json` y `Authorization: Bearer <token>`.

#### `getMyOrders({status?, date?})` → `Future<List<Order>>`
1. Construye la URL `GET /distributor/orders` con los query params opcionales `status` y `date`.
2. Hace la petición con los headers de autenticación.
3. Si el status es 200, deserializa la lista de pedidos.
4. Si falla lanza una excepción.

**Uso típico:**
- Sin parámetros → pedidos en estados `asignado` y `entregado`.
- Con `status: 'asignado'` → solo los pendientes por entregar.
- Con `date: 'YYYY-MM-DD'` → para el reporte diario del dashboard.

#### `deliverOrder(orderId)` → `Future<bool>`
Hace `PATCH /distributor/orders/:id/deliver`. Devuelve `true` si el status fue 200, `false` en otro caso.

---

### `client_service.dart` — `ClientService`

#### `_headers()` → `Future<Map<String, String>>` *(privado)*
Igual que en `OrderService`.

#### `getClients()` → `Future<List<Client>>`
Hace `GET /clients` y deserializa la lista. El backend filtra automáticamente según el rol del token.

#### `createClient({...})` → `Future<Client>`
1. Usa `http.MultipartRequest` (no JSON) para poder incluir una imagen.
2. Agrega todos los campos como `request.fields`.
3. Si se pasa un `imageFile`, lo agrega como `MultipartFile`.
4. Envía la request.
5. Si el status es 201, deserializa y devuelve el `Client` creado.
6. Si hay error, intenta parsear el mensaje de error del JSON. Si no puede, devuelve las primeras 100 chars del body como mensaje.

#### `updateClient({id, ...})` → `Future<Client>`
Igual que `createClient` pero hace `PUT /clients/:id`.

#### `deleteClient(id)` → `Future<void>`
Hace `DELETE /clients/:id`. Lanza excepción si el status no es 200.

---

### `preventista_order_service.dart` — `PreventistaOrderService`

Servicio para el rol preventista.

#### `_headers()` *(privado)*
Construye headers con token de autenticación.

#### `getMyOrders()` → `Future<List<Order>>`
Hace `GET /orders`. El backend devuelve solo los pedidos del preventista autenticado.

#### `getProducts()` → `Future<List<Product>>`
Hace `GET /products`. Devuelve solo los productos activos (el backend lo filtra por rol).

#### `createOrder({clientId, notes?, items})` → `Future<Order>`
Hace `POST /orders` con el body JSON `{clientId, notes, items}`. Si el status es 201 devuelve el pedido creado. Si hay error, lanza la excepción con el mensaje del servidor.

---

## 📱 Pantallas — `screens/`

### `login_screen.dart` — `LoginScreen` / `_LoginScreenState`

Estado interno:
- `_emailCtrl`, `_passCtrl` → controladores de los campos de texto
- `_loading` → controla el estado del botón
- `_error` → mensaje de error (o `null`)

#### `_login()`
1. Activa el loading y limpia el error anterior.
2. Llama a `context.read<AuthProvider>().login(email, password)`.
3. Si el login devuelve un error (null = éxito), lo muestra en pantalla.
4. El `AuthProvider` notifica automáticamente el cambio de estado y `MyApp` navega a la pantalla correcta.

**Nota:** La redirección es automática porque `MyApp` escucha al `AuthProvider`. No hay `Navigator.push()` explícito.

---

### `distribuidor/distribuidor_home_screen.dart`

#### `DistribuidorHomeScreen`
Pantalla contenedora del distribuidor. Usa `BottomNavigationBar` con `IndexedStack` para mantener el estado de ambas tabs sin destruirlos.

Tabs:
- **0:** `_DistribuidorDashboard` → Reporte del día
- **1:** `OrdersScreen` → Mis pedidos / ruta

#### `_DistribuidorDashboard`
Dashboard diario del distribuidor.

Estado:
- `_initialStock` → mapa `{nombreProducto: cantidadTotal}` de todo lo cargado hoy
- `_remainingStock` → mapa de lo que aún queda en la camioneta (pedidos `asignado`)
- `_totalInitialQty`, `_totalRemainingQty` → totales de unidades
- `_totalCollected` → dinero recaudado de los pedidos entregados hoy
- `_entregadosCount`, `_pendientesCount` → contadores

#### `_fetchDashboardData()`
1. Construye la fecha de hoy en formato `YYYY-MM-DD`.
2. Llama a `OrderService.getMyOrders(date: today)` para obtener tanto los pedidos entregados hoy como los que siguen asignados.
3. Itera todos los pedidos:
   - Si está `entregado`: incrementa la recaudación y el contador.
   - Si está `asignado`: acumula el stock restante.
   - Independientemente del estado: acumula el stock inicial (para saber cuánto salió hoy).
4. Actualiza el estado local.

#### `_InventoryList` *(widget privado)*
Lista de inventario. Muestra un mapa `{producto: cantidad}` como `ListView.separated`. Si el mapa está vacío, muestra un mensaje. Incluye el total de unidades en el encabezado.

#### `_StatCard` *(widget privado)*
Tarjeta de estadística con ícono, número grande, título y subtítulo. Toma un `MaterialColor` para adaptar los colores.

---

### `orders_screen.dart` — `OrdersScreen` / `_OrdersScreenState`

Lista de pedidos asignados al distribuidor. Esta es la "ruta del día".

Estado:
- `_orders` → lista de pedidos en estado `asignado`
- `_loading` → control de carga

#### `_fetchOrders()`
Llama a `OrderService.getMyOrders(status: 'asignado')`. Carga solo los pendientes.

#### `_deliver(orderId)`
1. Muestra un `AlertDialog` de confirmación.
2. Si el usuario confirma, llama a `OrderService.deliverOrder(orderId)`.
3. Si la entrega fue exitosa, muestra un `SnackBar` verde y recarga la lista.

**AppBar:** Tiene botón de mapa (navega a `MapScreen` con todos los pedidos actuales) y botón de logout.

#### `_OrderCard` *(widget privado)*
Tarjeta de pedido individual. Muestra:
- Número de pedido y dirección.
- Foto o ícono del cliente, nombre y dueño.
- Botón de perfil (abre `ClientDetailsSheet`).
- Teléfono y notas (si hay).
- Lista de productos con cantidades y subtotales.
- Total del pedido en bolivianos.
- Dos botones: **"Ver en mapa"** (navega a `MapScreen` enfocado en ese pedido) y **"Entregar"** (llama al `onDeliver` callback).

---

### `map_screen.dart` — `MapScreen` / `_MapScreenState`

Mapa interactivo de entregas usando `flutter_map` y OpenStreetMap.

Parámetros:
- `orders` → lista de pedidos a mostrar en el mapa
- `focusOrder?` → pedido a enfocar/seleccionar al abrir

Estado:
- `_myPosition` → ubicación GPS del distribuidor
- `_selectedOrder` → pedido seleccionado (muestra el panel inferior)
- `_mapController` → controla el mapa programáticamente

#### `initState()`
Al inicializar: guarda el `focusOrder` como seleccionado y llama a `_getLocation()`.

#### `_getLocation()`
1. Verifica que el servicio de GPS esté habilitado.
2. Solicita permisos si no los tiene.
3. Obtiene la posición actual y actualiza el estado.

#### `get _center`
Getter que determina el centro inicial del mapa:
1. Si hay `focusOrder`, centra en el cliente de ese pedido.
2. Si hay pedidos pero sin focus, usa el primero.
3. Si no hay nada, usa Cochabamba como fallback(`-17.3895, -66.1568`).

#### `_deliver(orderId)`
Igual que en `OrdersScreen`: muestra diálogo de confirmación, llama al servicio y actualiza el mapa quitando el pedido de la lista y limpiando la selección.

**Mapa:** Renderiza:
- Capa de tiles de OpenStreetMap.
- Marcador azul en la posición actual del distribuidor.
- Marcadores de pin para cada pedido (morado normal, rojo si está seleccionado).

**Panel inferior:** Aparece cuando hay un `_selectedOrder`. Muestra el cliente con foto, dirección, teléfono, lista de productos y botones:
- **"Centrar"** → mueve el mapa a las coordenadas del pedido seleccionado con `_mapController.move()`.
- **"Entregar"** → solo aparece si el pedido está en estado `asignado`.

**FAB:** Botón flotante en la esquina superior derecha que centra el mapa en la posición actual del distribuidor.

---

## 🧩 Widgets Compartidos — `widgets/`

### `client_details_sheet.dart` — `ClientDetailsSheet`

#### `static show(context, {name, ownerName, phone, address, photoUrl?})`
Método estático que abre un `BottomSheet` modal. No requiere crear instancias del widget.

Contenido del sheet:
- Foto del cliente (red) o ícono de tienda si no hay foto.
- Nombre del negocio y dueño.
- Teléfono con ícono.
- Dirección con ícono.

Se usa desde `OrdersScreen` y `MapScreen` para mostrar el perfil del cliente sin navegar a otra pantalla.

---

## ⚙️ Configuración — `config/api.dart`

### `Api`
Clase con constantes de configuración de la API.

- **`baseUrl`** → URL base del backend (ej: `http://192.168.X.X:3000/api`)
- **`getImageUrl(url)`** → Método estático que construye la URL completa para imágenes. Si la URL ya empieza con `http`, la devuelve tal cual. Si no, la prefija con la base (para URLs relativas del servidor).

---

## 🔄 Flujo de Autenticación

```
App inicia → AuthProvider._loadUser() → SharedPreferences
    ↓ no hay sesión               ↓ hay sesión guardada
LoginScreen                   DistribuidorHomeScreen
    ↓ _login()                  o PreventistaHomeScreen
AuthService.login()
    ↓ éxito
Guarda token + user en SharedPreferences
AuthProvider notifica → MyApp reconstruye → pantalla correcta
    ↓ logout
AuthService.logout() → borra SharedPreferences
AuthProvider notifica → MyApp reconstruye → LoginScreen
```

---

## 🔄 Flujo de Entrega (Distribuidor)

```
OrdersScreen carga pedidos asignados
   ↓ presiona "Entregar"
AlertDialog de confirmación
   ↓ confirma
OrderService.deliverOrder(orderId)
   → PATCH /distributor/orders/:id/deliver
   → Backend: status='entregado', deliveredAt=ahora, guarda historial
   ↓ éxito
SnackBar verde + _fetchOrders() recarga la lista
Dashboard actualiza totales al refrescar
```
