# 📦 Documentación del Backend

**Tecnología:** Node.js + Express + TypeScript + Prisma ORM + PostgreSQL (PostGIS)

El backend es una API REST organizada en módulos. Cada módulo tiene tres capas:
- **Router** → define las rutas HTTP y los middlewares de autenticación/roles
- **Controller** → recibe la petición, valida los datos básicos y llama al servicio
- **Service** → contiene toda la lógica de negocio y accede a la base de datos

---

## 🚀 Punto de Entrada — `app.ts`

Configura el servidor Express. Registra todos los routers bajo el prefijo `/api/*`, habilita CORS, parseo de JSON, y sirve archivos estáticos (fotos de clientes) desde la carpeta `/uploads`.

| Ruta base | Módulo |
|---|---|
| `/api/auth` | Autenticación |
| `/api/users` | Usuarios |
| `/api/clients` | Clientes |
| `/api/products` | Productos |
| `/api/orders` | Pedidos |
| `/api/regions` | Regiones |
| `/api/distributor` | Distribuidor (app móvil) |

---

## 🔐 Módulo: Auth

### `auth.router.ts`

| Método | Ruta | Acceso | Controlador |
|---|---|---|---|
| `POST` | `/api/auth/login` | Público | `login` |
| `GET` | `/api/auth/me` | Autenticado | `getMe` |

### `auth.controller.ts`

#### `login(req, res)`
Recibe `email` y `password` del body. Valida que ambos existan. Llama a `loginService` y devuelve el token JWT + datos del usuario. Si faltan campos devuelve `400`; si las credenciales son inválidas devuelve `401`.

#### `getMe(req, res)`
Ruta protegida. Usa el `id` del usuario ya autenticado (extraído por el middleware) para llamar a `getMeService` y devolver los datos del perfil actual.

### `auth.service.ts`

#### `loginService(email, password)`
1. Busca al usuario por email en la base de datos.
2. Verifica que el usuario exista y que `isActive` sea `true`.
3. Compara la contraseña con el hash almacenado usando `bcrypt`.
4. Si todo es válido, genera un token JWT con `{ id, role }` que expira en **8 horas**.
5. Devuelve el token y los datos básicos del usuario (id, name, email, role, phone).

#### `getMeService(id)`
Busca al usuario por su `id` y devuelve sus datos (sin la contraseña). Lanza error si no existe.

---

## 👥 Módulo: Users

### `users.router.ts`

Todas las rutas requieren estar autenticado y tener rol `admin`.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/users` | Listar todos los usuarios |
| `GET` | `/api/users/:id` | Obtener un usuario |
| `POST` | `/api/users` | Crear usuario |
| `PUT` | `/api/users/:id` | Editar usuario |
| `PATCH` | `/api/users/:id/toggle` | Activar/desactivar |
| `GET` | `/api/users/:id/regions` | Zonas asignadas |

### `users.controller.ts`

#### `getAll(req, res)`
Devuelve todos los usuarios del sistema (sin contraseñas). Sin filtros.

#### `getOne(req, res)`
Devuelve los datos de un usuario específico por su `id`.

#### `create(req, res)`
Valida que `name`, `email`, `password` y `role` estén presentes. Verifica que el `role` sea uno de los tres permitidos (`admin`, `preventista`, `distribuidor`). Llama al servicio para crear el usuario.

#### `update(req, res)`
Actualiza nombre, email, teléfono y opcionalmente contraseña de un usuario existente.

#### `toggle(req, res)`
Cambia el estado activo/inactivo del usuario. Funciona como un interruptor (toggle).

#### `getUserRegions(req, res)`
Devuelve la lista de regiones/zonas asignadas a un usuario preventista específico.

### `users.service.ts`

#### `getAllUsers()`
Consulta todos los usuarios ordenados por fecha de creación descendente. Excluye la contraseña de la respuesta.

#### `getUserById(id)`
Busca un usuario por `id`. Lanza error si no se encuentra.

#### `createUser(data)`
1. Verifica que el email no esté ya registrado.
2. Genera el hash de la contraseña con `bcrypt` (salt rounds: 10).
3. Crea el usuario en la base de datos y devuelve los datos sin la contraseña.

#### `updateUser(id, data)`
1. Verifica que el usuario exista.
2. Si se envía nueva contraseña, la hashea antes de actualizar.
3. Actualiza los datos en la base de datos.

#### `toggleUserActive(id)`
Obtiene el valor actual de `isActive` y lo invierte. Devuelve solo `{ id, name, isActive }`.

#### `getUserRegionsService(userId)`
Busca en la tabla `UserRegion` todas las entradas del usuario, incluyendo los datos de cada región (id, name, color).

---

## 🏪 Módulo: Clients

### `clients.router.ts`

Todas las rutas requieren autenticación. La creación usa middleware Multer para subir fotos.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/api/clients` | admin, preventista | Listar clientes |
| `GET` | `/api/clients/:id` | admin, preventista | Obtener cliente |
| `POST` | `/api/clients` | admin, preventista | Crear cliente (con foto) |
| `PUT` | `/api/clients/:id` | admin, preventista | Editar cliente (con foto) |
| `DELETE` | `/api/clients/:id` | admin, preventista | Desactivar cliente |

### `clients.controller.ts`

#### `getAll(req, res)`
Pasa el `id` y `role` del usuario autenticado al servicio para aplicar el filtro correcto según el rol.

#### `getOne(req, res)`
Devuelve un cliente por `id` con sus últimos 5 pedidos incluidos.

#### `create(req, res)`
Valida que los campos obligatorios existan. Si se subió una imagen, construye la URL pública. Llama al servicio pasando los datos y el `id` del creador.

#### `update(req, res)`
Gestiona la actualización incluyendo el reemplazo de la foto: si se sube una nueva imagen, borra el archivo anterior del servidor usando `fs.unlinkSync`. Convierte coordenadas y regionId a números.

#### `remove(req, res)`
Realiza un "soft delete": no borra el registro, solo cambia `isActive` a `false`.

### `clients.service.ts`

#### `getAllClients(userId?, userRole?)`
Aplica filtros según el rol:
- **Preventista:** Solo devuelve clientes de sus regiones asignadas, más los que no tienen región asignada.
- **Admin y otros:** Devuelve todos los clientes activos.

#### `getClientById(id)`
Devuelve el cliente con sus últimos 5 pedidos (solo id, status y fecha).

#### `createClient(data, createdBy)`
1. Si no se proporcionó `regionId`, usa PostGIS para detectar automáticamente a qué región pertenecen las coordenadas.
2. Crea el cliente en la base de datos asociado al usuario creador.

#### `updateClient(id, data)`
1. Verifica que el cliente exista.
2. Si cambian las coordenadas y no se provee nueva región, redetecta la región con PostGIS.
3. Si cambia la región, actualiza también los pedidos activos (pendiente, aceptado, asignado) del cliente para que reflejen la nueva región.
4. Actualiza el registro del cliente.

#### `deleteClient(id)`
Hace soft delete cambiando `isActive = false`.

---

## 📦 Módulo: Products

### `products.router.ts`

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/api/products` | admin, preventista | Listar productos |
| `GET` | `/api/products/:id` | admin, preventista | Obtener producto |
| `POST` | `/api/products` | admin | Crear producto |
| `PUT` | `/api/products/:id` | admin | Editar producto |
| `PATCH` | `/api/products/:id/toggle` | admin | Activar/desactivar |

### `products.controller.ts`

#### `getAll(req, res)`
Si el usuario es `preventista`, llama al servicio con `onlyActive = true` para mostrar solo productos activos. El admin ve todos.

#### `getOne(req, res)`
Devuelve un producto por `id`.

#### `create(req, res)`
Valida que `name`, `price` y `unit` existan. Crea el producto.

#### `update(req, res)`
Convierte `price` a número y actualiza el producto.

#### `toggle(req, res)`
Invierte el estado `isActive` del producto.

### `products.service.ts`

#### `getAllProducts(onlyActive)`
Devuelve productos ordenados por nombre. Si `onlyActive = true`, filtra solo los activos.

#### `getProductById(id)`
Busca por id, lanza error si no existe.

#### `createProduct(data)`
Verifica que no exista otro producto con el mismo nombre antes de crear.

#### `updateProduct(id, data)`
Verifica existencia, luego actualiza.

#### `toggleProduct(id)`
Invierte `isActive` y devuelve solo `{ id, name, isActive }`.

---

## 📋 Módulo: Orders (Admin y Preventista)

### `orders.router.ts`

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/api/orders/map` | admin | Pedidos para el mapa |
| `POST` | `/api/orders/assign` | admin | Asignar pedidos |
| `GET` | `/api/orders` | admin, preventista | Listar pedidos |
| `GET` | `/api/orders/:id` | admin, preventista | Obtener pedido |
| `POST` | `/api/orders` | admin, preventista | Crear pedido |
| `PUT` | `/api/orders/:id` | admin, preventista | Editar pedido |
| `PATCH` | `/api/orders/:id/status` | admin | Cambiar estado |

> **Nota:** Las rutas específicas (`/map`, `/assign`) van **antes** que las de parámetro (`/:id`) para evitar conflictos.

### `orders.controller.ts`

#### `getAll(req, res)`
Si el usuario es `preventista`, fuerza el filtro `preventistaId` a su propio `id` para que solo vea sus pedidos. Acepta filtros por `status` y `regionId` vía query params.

#### `getOne(req, res)`
Devuelve un pedido completo por `id` con cliente, preventista, distribuidor, items con productos e historial de cambios.

#### `getMap(req, res)`
Devuelve solo los pedidos en estado `aceptado` o `asignado` con coordenadas del cliente, para pintar el mapa.

#### `create(req, res)`
Valida `clientId` e `items`. Usa el `id` del usuario autenticado como `preventistaId`.

#### `update(req, res)`
Actualiza notas y/o items de un pedido existente.

#### `changeStatus(req, res)`
Cambia el estado de un pedido a uno de los 4 estados válidos: `pendiente`, `aceptado`, `asignado`, `entregado`.

#### `assign(req, res)`
Recibe un array de `orderIds` y un `distributorId`. Asigna todos esos pedidos al distribuidor.

### `orders.service.ts`

#### `buildSnapshot(orderId)` *(helper privado)*
Consulta el estado completo de un pedido (cliente, preventista, distribuidor, items, totales) y lo convierte en un objeto JSON para guardar como "foto" del momento en el historial.

#### `saveHistory(orderId, changedBy, action, previousStatus, newStatus)` *(helper privado)*
Guarda un registro en la tabla `OrderHistory` con el estado anterior, el nuevo estado y el snapshot del pedido en ese momento.

#### `getAllOrders(filters)`
Devuelve pedidos filtrados por `status`, `regionId` y/o `preventistaId`. Incluye datos de cliente, preventista, distribuidor, región e items.

#### `getOrderById(id)`
Devuelve el pedido completo incluyendo historial de cambios ordenado cronológicamente.

#### `createOrder(data, preventistaId)`
1. Valida que haya al menos un item.
2. Verifica que todos los productos existan y estén activos.
3. Verifica que el cliente exista.
4. Crea el pedido y sus items en una **transacción atómica** (todo o nada). El precio unitario se toma del catálogo en el momento de crear, no del body.
5. Guarda historial con acción `created`.
6. Devuelve el pedido completo.

#### `updateOrder(id, data, userId)`
1. Verifica que el pedido esté en estado `pendiente` o `aceptado` (no se pueden editar si ya están asignados o entregados).
2. En una transacción: actualiza notas y/o reemplaza **todos** los items (borra los anteriores y crea los nuevos).
3. Guarda historial con acción `updated`.

#### `changeOrderStatus(id, newStatus, userId)`
Actualiza el estado del pedido. Si el nuevo estado es `entregado`, también registra `deliveredAt` con la fecha y hora actual. Guarda historial.

#### `assignOrders(orderIds, distributorId, adminId)`
1. Verifica que el `distributorId` exista y tenga rol `distribuidor`.
2. Verifica que todos los pedidos del array existan.
3. Verifica que todos estén en estado `aceptado`.
4. Actualiza todos en lote a estado `asignado` con el `distributorId`.
5. Guarda historial individual por cada pedido.

#### `getOrdersForMap()`
Devuelve solo los datos necesarios para el mapa: id, status, regionId y coordenadas del cliente.

---

## 🗺️ Módulo: Regions

### `regions.router.ts`

Todas las rutas requieren rol `admin`.

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/regions/recalculate` | Recalcular todas las zonas |
| `GET` | `/api/regions/detect` | Detectar zona por coordenadas |
| `POST` | `/api/regions/assign-user` | Asignar zona a preventista |
| `DELETE` | `/api/regions/remove-user` | Quitar zona a preventista |
| `POST` | `/api/regions/assign-bulk` | Asignar múltiples zonas |
| `GET` | `/api/regions` | Listar zonas |
| `POST` | `/api/regions` | Crear zona |
| `GET` | `/api/regions/:id` | Obtener zona |
| `PUT` | `/api/regions/:id` | Editar zona |
| `DELETE` | `/api/regions/:id` | Eliminar zona |
| `GET` | `/api/regions/:id/orders` | Pedidos en una zona |
| `GET` | `/api/regions/:id/preventistas` | Preventistas de una zona |

### `regions.controller.ts`

#### `recalculate(req, res)`
Dispara el recálculo masivo de regiones para todos los clientes y pedidos activos.

#### `getAll(req, res)` / `getOne(req, res)`
Devuelve las zonas con su polígono en formato GeoJSON (usando `ST_AsGeoJSON`).

#### `create(req, res)`
Valida que `name` y `polygon` existan. Crea la zona.

#### `update(req, res)` / `remove(req, res)`
Actualiza o elimina una zona por `id`.

#### `getOrdersInRegion(req, res)`
Devuelve los pedidos en estado `aceptado` que están geográficamente dentro de la zona.

#### `detectRegion(req, res)`
Detecta a qué zona pertenece un punto geográfico (lat/lng). Útil para validar antes de crear un cliente.

#### `assignRegion(req, res)`
Asigna una zona a un preventista (relación uno a uno en `UserRegion`).

#### `removeRegion(req, res)`
Quita una zona de un preventista.

#### `assignBulk(req, res)`
Reemplaza todas las zonas asignadas a un preventista de una vez.

#### `getPreventistasInRegion(req, res)`
Lista los preventistas que tienen asignada una zona específica.

### `regions.service.ts`

#### `geojsonToWKT(coordinates)` *(helper privado)*
Convierte un polígono GeoJSON (array de coordenadas `[lng, lat]`) al formato WKT que PostGIS entiende: `POLYGON((lng1 lat1, lng2 lat2, ...))`.

#### `getAllRegions()`
Ejecuta SQL directo con `pool.query` para traer todas las regiones incluyendo el polígono como GeoJSON y el nombre del creador.

#### `getRegionById(id)`
Igual que el anterior pero filtrando por `id`.

#### `createRegion(data, createdBy)`
1. Convierte el polígono GeoJSON a WKT.
2. Crea el registro base de la región con Prisma (sin el polígono).
3. Ejecuta SQL para actualizar el campo `polygon` con `ST_GeomFromText` en SRID 4326.
4. Asigna automáticamente la región a todos los clientes cuyas coordenadas caen dentro del polígono (`ST_Within`).
5. Propaga también el `regionId` a los pedidos activos de esos clientes.

#### `updateRegion(id, data)`
Actualiza nombre/color con Prisma. Si se manda nuevo polígono, actualiza con SQL el campo geometry.

#### `deleteRegion(id)`
1. Limpia `regionId` de los pedidos activos relacionados.
2. Limpia `regionId` de los clientes de esa región.
3. Elimina el registro de la región.

#### `getOrdersByRegion(id)`
Usa PostGIS `ST_Within` para encontrar pedidos `aceptado` cuyos clientes están dentro del polígono de la región.

#### `getRegionByPoint(latitude, longitude)`
Ejecuta `ST_Within` para buscar qué región contiene un punto geográfico dado. Devuelve la primera región que coincide (o `null`).

#### `recalculateAllRegions()`
Recálculo masivo en 4 pasos:
1. Limpia `regionId = NULL` de todos los clientes.
2. Reasigna la región correcta a cada cliente según su ubicación con `ST_Within`.
3. Cuenta los clientes actualizados.
4. Propaga el `regionId` actualizado a todos los pedidos activos de cada cliente.

#### `assignRegionToUser(userId, regionId)`
Verifica que el usuario tenga rol `preventista` y que la región exista. Usa `upsert` para crear o actualizar la asignación en `UserRegion`.

#### `removeRegionFromUser(userId, regionId)`
Elimina la asignación de zona para un preventista.

#### `getUserRegions(userId)` / `getPreventistasInRegion(regionId)`
Consultas de relaciones en la tabla `UserRegion`.

#### `assignRegionsBulk(userId, regionIds)`
En una sola **transacción**: elimina todas las zonas actuales del usuario y crea las nuevas. Garantiza consistencia atómica.

---

## 🚚 Módulo: Distributor (App Móvil)

### `distributor.router.ts`

Todas las rutas requieren estar autenticado con rol `distribuidor`.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/distributor/orders` | Mis pedidos (con filtros) |
| `GET` | `/api/distributor/orders/:id` | Un pedido específico |
| `PATCH` | `/api/distributor/orders/:id/deliver` | Marcar como entregado |

### `distributor.controller.ts`

#### `getMyOrders(req, res)`
Lee los query params `status` y `date` opcionales. Pasa el `id` del distribuidor autenticado al servicio.

#### `getMyOrderById(req, res)`
Devuelve un pedido específico verificando que pertenezca al distribuidor autenticado.

#### `deliverOrder(req, res)`
Marca un pedido como entregado. Responde con mensaje de éxito y el pedido actualizado.

### `distributor.service.ts`

#### `getMyOrders(distributorId, statusQuery?, date?)`
Filtra los pedidos del distribuidor con lógica especial de fecha:
- **Sin fecha:** devuelve todos los pedidos en estados `asignado` y `entregado`.
- **Con fecha:** devuelve los pedidos `asignado` (todos los que aún están en la camioneta) MÁS los `entregado` cuyo `deliveredAt` caiga en ese día en UTC. Esto es para el reporte diario.
Incluye cliente, items con producto y región.

#### `getMyOrderById(orderId, distributorId)`
Busca el pedido verificando que el `distributorId` coincida. Lanza error si no le pertenece.

#### `deliverOrder(orderId, distributorId)`
1. Verifica que el pedido pertenezca al distribuidor y esté en estado `asignado`.
2. Actualiza el estado a `entregado` y registra `deliveredAt = new Date()`.
3. Guarda un historial con snapshot del pedido usando `buildSnapshot`.

#### `buildSnapshot(orderId)` *(helper privado)*
Versión local del helper que construye el snapshot del pedido para el historial, incluyendo `deliveredAt`.
