# 🖥️ Documentación del Frontend Web

**Tecnología:** React + TypeScript + Vite + TailwindCSS + React Leaflet

El frontend es una SPA (Single Page Application) con dos roles: **Admin** y **Preventista**. La autenticación está basada en JWT almacenado en `localStorage`.

---

## ⚙️ Infraestructura

### `api/axios.ts` — Cliente HTTP centralizado

Crea una instancia de Axios con la `baseURL` apuntando al backend (`http://localhost:3000/api`).

**Interceptor de request:** Antes de cada petición, lee el token del `localStorage` y lo agrega en el header `Authorization: Bearer <token>`. Así no es necesario agregarlo manualmente en cada llamada.

**Interceptor de response:** Si se recibe un `401 Unauthorized`, borra el token y el usuario del `localStorage` y redirige automáticamente al `/login`. Esto maneja el caso de tokens expirados.

---

### `context/AuthContext` (inferido por el uso)

Provee en toda la app los datos del usuario autenticado (`user`, `login`, `logout`) usando React Context.

---

## 🔐 Página: Login — `pages/auth/LoginPage.tsx`

**Componente:** `LoginPage()`

Estado local:
- `email`, `password` → campos del formulario
- `error` → mensaje de error a mostrar
- `loading` → deshabilita el botón mientras se procesa

#### `handleSubmit(e)`
1. Previene el envío por defecto del formulario.
2. Llama a `login(email, password)` de la API.
3. Guarda el token y datos del usuario con `setAuth()` del contexto.
4. Redirige según el rol:
   - `admin` → `/admin/dashboard`
   - `preventista` → `/preventista/clients`
   - Otro rol → muestra error (el panel no es para ese rol).
5. Si el usuario ya está logueado al entrar a esta página, lo redirige automáticamente con `<Navigate>`.

---

## 👑 Páginas de Admin

### `pages/admin/Dashboard.tsx` — `AdminDashboard()`

Pantalla de inicio del admin. Carga datos al montar el componente.

#### `fetchData()` (dentro de `useEffect`)
Hace 3 peticiones en paralelo con `Promise.all`: obtiene pedidos, clientes y usuarios. Calcula las estadísticas contando pedidos por estado. Muestra los últimos 5 pedidos en la tabla inferior.

#### `StatCard({ label, value, icon, color })` *(componente interno)*
Tarjeta reutilizable para mostrar un número estadístico con ícono, etiqueta y color de borde.

---

### `pages/admin/Orders.tsx` — `AdminOrders()`

Gestión de pedidos para el administrador. Permite ver, filtrar y asignar pedidos a distribuidores.

Estado local:
- `orders` → lista de pedidos (excluye entregados)
- `distributors` → lista de distribuidores activos
- `selected` → array de IDs de pedidos seleccionados (para asignar)
- `filterStatus`, `filterRegion` → filtros activos
- `detail` → pedido cuyo modal de detalle está abierto

#### `fetchOrders()`
Carga pedidos filtrados por región (si hay filtro activo), distribuidores activos y regiones disponibles. **Filtra los pedidos entregados** porque esos van a la pantalla de Historial.

#### `toggleSelect(id)`
Agrega o quita un pedido de la selección. Solo los pedidos en estado `aceptado` tienen checkbox disponible.

#### `selectAllAceptados()`
Selecciona automáticamente todos los pedidos visibles en estado `aceptado`.

#### `handleAssign()`
Envía la petición de asignación con los pedidos seleccionados y el distribuidor elegido. Limpia la selección tras el éxito y recarga la lista.

**Modal de detalle:** Al hacer clic en "Ver", muestra un modal con todos los datos del pedido: cliente, estado, dirección, notas, lista de productos con subtotales y total final.

---

### `pages/admin/Users.tsx` — `AdminUsers()`

CRUD completo de usuarios. Permite crear, editar y activar/desactivar usuarios.

Estado del formulario modal:
- `mode` → `'create'` o `'edit'`
- `editing` → usuario que se está editando (o `null`)
- `form` → campos del formulario

#### `fetchUsers()`
Carga todos los usuarios del sistema.

#### `openCreate()`
Limpia el formulario y abre el modal en modo creación.

#### `openEdit(user)`
Rellena el formulario con los datos del usuario existente y abre el modal en modo edición. La contraseña queda vacía (solo se manda si se escribe una nueva).

#### `handleSubmit(e)`
Si mode es `'create'`, llama a `createUser`. Si es `'edit'`, llama a `updateUser` pasando solo los campos que cambiaron (incluye password solo si se escribió algo).

#### `handleToggle(id)`
Llama a `toggleUser(id)` para activar o desactivar el usuario sin abrir un modal.

#### `Input({ label, value, onChange, type, required })` *(componente interno)*
Campo de texto reutilizable para el formulario modal.

---

### `pages/admin/Products.tsx` — `AdminProducts()`

CRUD de productos del catálogo.

#### `openCreate()` / `openEdit(product)`
Prepara el formulario para crear o editar un producto.

#### `handleSubmit(e)`
Crea o actualiza el producto según si `editing` tiene valor.

#### `handleToggle(id)`
Activa o desactiva un producto. Un producto desactivado no aparece en el selector de pedidos para los preventistas.

#### `Field({ label, value, onChange, type, required })` *(componente interno)*
Campo de formulario reutilizable.

---

### `pages/admin/Clients.tsx` — `AdminClients()`

Gestión de clientes con búsqueda, mapa para ubicación y subida de foto.

#### Componentes de mapa (internos):

##### `LocationPicker({ onSelect })`
Hook de `useMapEvents`. Captura el evento `click` del mapa y llama `onSelect(lat, lng)` para registrar la ubicación seleccionada.

##### `MapPicker({ latitude, longitude, onChange, regions })`
Renderiza un `MapContainer` de Leaflet en el modal. Muestra los polígonos de las regiones existentes como referencia visual. Al hacer clic, actualiza las coordenadas. Si ya hay posición, muestra un marker.

#### Métodos del componente principal:

#### `fetchClients()`
Carga clientes y regiones en paralelo.

#### `openCreate()` / `openEdit(client)`
Prepara el formulario según si se crea o edita.

#### `handleSubmit(e)`
1. Valida que se haya seleccionado una ubicación en el mapa.
2. Construye un `FormData` con todos los campos.
3. Adjunta la foto si se seleccionó una.
4. Llama a `createClient` o `updateClient` según el caso.

#### `handleDelete(id)`
Pide confirmación y llama a `deleteClient` (soft delete).

#### `getLocation()`
Usa la API del navegador `navigator.geolocation` para obtener la ubicación actual y rellenar automáticamente las coordenadas del formulario.

#### Componentes UI internos:
- **`Field`** → input de texto reutilizable.
- **`InfoItem`** → celda de información de solo lectura para el modal de detalle.

---

### `pages/admin/Regions.tsx` — `AdminRegions()`

Gestión de zonas geográficas con dibujo de polígonos en el mapa.

#### Componentes de mapa (internos):

##### `GeomanControl({ onDrawFinished })`
Integra la librería `leaflet-geoman` en el mapa para habilitar la herramienta de dibujo de polígonos. Al terminar de dibujar (`pm:create`), llama a `onDrawFinished` con la capa creada.

#### `getRandomUniqueColor(existingColors)`
Genera un color hexadecimal aleatorio que no esté ya en uso por otras zonas.

#### Métodos del componente principal:

#### `fetchData()`
Carga regiones y clientes en paralelo. Los clientes se muestran como puntos de referencia en el mapa.

#### `toLeafletCoords(coords)`
Convierte coordenadas GeoJSON `[lng, lat]` al formato que Leaflet espera `[lat, lng]`.

#### `handleDrawFinished(layer)`
Al terminar de dibujar un polígono, genera un color único y abre el modal para poner el nombre de la zona.

#### `handleCancelNewRegion()`
Cancela la creación: elimina el layer temporal del mapa y cierra el modal.

#### `handleSaveRegion(e)`
1. Obtiene las coordenadas del layer de Leaflet.
2. Las convierte a formato GeoJSON `[lng, lat]`.
3. Cierra el polígono repitiendo el primer punto al final.
4. Llama a `createRegion` con el GeoJSON.
5. Elimina el layer temporal y recarga las zonas.

#### `handleDelete(id)`
Pide confirmación y elimina la zona. Los pedidos y clientes perderán su asignación de zona.

#### `handleRecalculate()`
Llama al endpoint de recálculo masivo y muestra el resultado (cuántos clientes y pedidos fueron actualizados).

---

### `pages/admin/Map.tsx` — `AdminMap()`

Mapa de pedidos en tiempo real. Muestra pedidos en estado `aceptado` o `asignado` con marcadores de colores.

#### `createPinIcon(color)`
Crea un ícono SVG de pin personalizado con el color del estado del pedido.

#### `handleMarkerClick(orderId)`
Al hacer clic en un marcador, carga el detalle completo del pedido desde el backend y lo muestra en el panel lateral.

**Panel lateral:** Muestra cliente, responsables, región, notas y lista de productos del pedido seleccionado.

---

### `pages/admin/History.tsx` — `AdminHistory()`

Historial de pedidos entregados. Solo lectura, con filtros y resumen de totales.

#### `fetchData()`
Carga pedidos con `status = 'entregado'` filtrados opcionalmente por región.

#### Filtrado local (`filtered`)
Aplica filtros adicionales en el cliente: búsqueda por texto (cliente, preventista, distribuidor) y rango de fechas.

#### `totalBs`
Suma el total en bolivianos de todos los pedidos entregados visibles.

---

### `pages/admin/AssignRegions.tsx` — `AssignRegions()`

Pantalla dedicada a asignar zonas a preventistas con interfaz visual.

Estado:
- `selected` → preventista actualmente seleccionado
- `originalIds` → zonas que ya tenía asignadas en la DB
- `selectedIds` → zonas marcadas en la UI (puede tener cambios pendientes)

#### `fetchData()`
Carga todos los preventistas activos y todas las regiones.

#### `selectUser(user)`
Al seleccionar un preventista, carga sus zonas actuales de la DB y las guarda en `originalIds` y `selectedIds`.

#### `isSelected(regionId)`
Devuelve `true` si el `regionId` está en `selectedIds`.

#### `handleToggle(regionId)`
Agrega o quita una zona de `selectedIds`. No guarda aún, solo cambia la UI.

#### `hasChanges()`
Compara `originalIds` con `selectedIds` para saber si hay cambios pendientes de guardar.

#### `handleSave()`
Llama a `assignRegionsBulk` con el userId y los nuevos `selectedIds`. En el backend esto borra todas las asignaciones anteriores y crea las nuevas en una transacción.

---

## 🧑‍💼 Páginas de Preventista

### `pages/preventista/Clients.tsx` — `PreventistaClients()`

Pantalla principal del preventista. Combina gestión de clientes **y** creación de pedidos en una sola vista. Tiene modo lista y modo mapa.

#### Componentes internos:
- **`LocationPicker`** → Captura clics en el mapa para seleccionar ubicación.
- **`MapPicker`** → Mini mapa para seleccionar ubicación del cliente en el modal de creación.
- **`Field`** → Componente de input reutilizable.
- **`InfoItem`** → Celda de solo lectura para el modal de detalle.

#### `fetchData()`
Carga clientes y productos en paralelo al montar la pantalla.

#### `filtered`
Filtra la lista de clientes en el cliente por nombre de negocio, dueño o dirección.

#### `openCreate()` / `openEdit(client)`
Preparan el formulario para crear o editar un cliente.

#### `handleClientSubmit(e)`
Crea un `FormData` con los datos del cliente incluyendo foto opcional. Llama a `createClient` o `updateClient`.

#### `handleDelete(id)`
Soft delete del cliente.

#### `getUserLocation()`
Usa la geolocalización del navegador para autocompletar las coordenadas.

#### `openOrder(client)`
Abre el modal de creación de pedido para un cliente específico. Limpia el carrito.

#### `addItemToOrder(product)`
Agrega un producto al carrito. Si ya existe, incrementa su cantidad en 1.

#### `removeItemFromOrder(productId)`
Elimina un producto del carrito.

#### `updateItemQty(productId, qty)`
Actualiza la cantidad de un producto en el carrito. No permite cantidades menores a 1.

#### `handleOrderSubmit(e)`
1. Valida que haya al menos un producto en el carrito.
2. Llama a `createOrder` con el `clientId`, notas e items.
3. Cierra el modal y limpia el estado.

#### `orderTotal`
Calcula el total del carrito en tiempo real con `reduce`.

---

### `pages/preventista/Orders.tsx` — `PreventistaOrders()`

Vista de pedidos del preventista. Permite ver, crear y editar pedidos propios.

#### `fetchData()`
Carga en paralelo sus pedidos, todos sus clientes y los productos disponibles.

#### `openCreate()` / `openEdit(order)`
Preparan el modal de pedido. En modo edición, pre-llenan el formulario con los items actuales del pedido.

#### `addItem(productId)`
Agrega un producto al formulario del pedido. Si ya existe, incrementa la cantidad.

#### `removeItem(productId)`
Elimina un ítem del formulario.

#### `updateQty(productId, qty)`
Cambia la cantidad de un ítem en el formulario.

#### `handleSubmit(e)`
Si hay un pedido en edición, llama a `updateOrder`; si no, llama a `createOrder`. Solo se pueden editar pedidos en estado `pendiente` o `aceptado`.

#### `total`
Computed en tiempo real = suma de `precio × cantidad` de todos los items del formulario.

---

## 🔧 Componentes Compartidos

### `components/Layout.tsx`

Envuelve todas las páginas con la barra de navegación lateral. Detecta el rol del usuario y muestra las opciones de menú correspondientes:
- **Admin:** Dashboard, Pedidos, Clientes, Usuarios, Productos, Zonas, Asignar Zonas, Mapa, Historial.
- **Preventista:** Clientes, Pedidos.
