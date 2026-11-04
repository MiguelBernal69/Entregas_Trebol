# Distribuidora Trébol

Sistema de distribución con backend, panel web y aplicación móvil.

## Componentes

- `backend`: API Node.js, Express, TypeScript, Prisma y PostgreSQL.
- `frontend`: panel web React/Vite.
- `distribuidor_app`: aplicación móvil Flutter.
- `electron-printer`: impresión térmica.

## Desarrollo local

### Impresión automática USB en Windows

El módulo `electron-printer` imprime las boletas automáticamente en `POS80 Printer` mediante el controlador de Windows, con letra Calibri y sin abrir el diálogo de impresión. Debe ejecutarse en la PC con la impresora USB instalada. Por defecto abre `http://169.58.255.180`; `TREBOL_SERVER_URL` permite cambiar esa URL sin modificar el código.

Las boletas de Chrome comparten la misma plantilla en impresión individual, por lote y continua. El texto copiable y la boleta móvil mantienen el mismo orden de datos y las columnas Descripcion, CANT, P.U. y total, ajustadas al ancho de 80 o 58 mm.

```bash
cd electron-printer
npm install
npm start
```

Para usar otro nombre de impresora o una URL publicada, define `TREBOL_PRINTER_NAME` o `TREBOL_SERVER_URL` antes de iniciar Electron. El instalador de Windows se crea con `npm run build`.

Si la versión instalada muestra un error que menciona `app.asar/send-gdi.ps1`, genera de nuevo el instalador con `npm run build` desde el código actualizado y vuelve a instalarlo en la PC de impresión. Los scripts de PowerShell deben estar en la carpeta `resources` de la instalación.

En la POS80 probada, el avance final del controlador quedó en **12 mm** para que el corte deje completo «Gracias por su compra» sin exceso de papel. Si instalas la impresora en otra computadora, revisa esa opción en las propiedades del controlador o ajústala en PowerShell:

```powershell
Set-PrinterProperty -PrinterName 'POS80 Printer' -PropertyName 'Config:zjTrailingMargin' -Value 'zj12mm'
```

### Backend

Configura `backend/.env` apuntando a PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/bd_entregas_trebol?schema=public"
PORT=3001
JWT_SECRET="clave-local"
```

Luego ejecuta:

```bash
cd backend
npm install
npx prisma migrate deploy
npm run prisma:generate
npm run seed:admin
npm run dev
```

`npm run seed:admin` crea únicamente el administrador. No ejecutes `npm run seed` si quieres mantener la base sin datos de demostración, porque ese script crea productos, clientes, regiones y pedidos de prueba.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

En desarrollo, el frontend usa el backend en `http://localhost:3001`.

### Aplicación móvil

Para Android Emulator, `distribuidor_app/lib/config/api.dart` usa:

```text
http://10.0.2.2:3001/api
```

`10.0.2.2` representa el `localhost` de la computadora desde el emulador Android. En un celular físico debes reemplazarlo por la IP local de la computadora, por ejemplo `http://192.168.1.100:3001/api`.

```bash
cd distribuidor_app
flutter pub get
flutter run
```

## Despliegue en VPS Hetzner

### Requisitos

Instala Ubuntu, PostgreSQL con PostGIS, Node.js 22, Nginx, Git y PM2. El aviso `EBADENGINE` de `@prisma/streams-local` con Node 20 no causa el error `P1000`, pero Node 22 cumple el requisito de ese paquete.

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib postgis nginx git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### Base de datos vacía

Crea un usuario propio de PostgreSQL y la base exclusiva de esta aplicación. Ejecuta estos comandos **en la terminal del VPS**, uno a uno; `createuser -P` pedirá la contraseña dos veces:

```bash
sudo -u postgres createuser -P trebol_app
sudo -u postgres createdb -O trebol_app bd_entregas_trebol
sudo -u postgres psql -d bd_entregas_trebol -c 'CREATE EXTENSION IF NOT EXISTS postgis;'
sudo -u postgres psql -d bd_entregas_trebol -c 'ALTER SCHEMA public OWNER TO trebol_app;'
```

Si la base ya existe, omite `createdb` y ejecuta `sudo -u postgres psql -c 'ALTER DATABASE bd_entregas_trebol OWNER TO trebol_app;'`. Si el usuario ya existe y necesitas ajustar su contraseña, entra con `sudo -u postgres psql`, escribe **solo** `\password trebol_app`, espera a terminar las dos preguntas y después escribe **solo** `\q`. No pegues varias órdenes interactivas juntas en `psql`.

Configura `backend/.env` en el VPS con **esa misma contraseña**:

```env
DATABASE_URL="postgresql://trebol_app:CONTRASENA@127.0.0.1:5432/bd_entregas_trebol?schema=public"
PORT=3001
JWT_SECRET="una-clave-larga-y-segura"
ADMIN_NAME="Administrador"
ADMIN_EMAIL="admin@tudominio.com"
ADMIN_PASSWORD="una-clave-segura"
ADMIN_PHONE=""
```

Si la contraseña contiene `@`, `:`, `/`, `#`, `%` u otros caracteres especiales, codifícalos para URL en `DATABASE_URL`. Antes de Prisma, prueba el acceso con `psql`; el comando te pedirá la contraseña sin mostrarla:

```bash
psql -h 127.0.0.1 -U trebol_app -d bd_entregas_trebol -W -c 'SELECT current_user, current_database();'
```

El error `P1000` significa que la contraseña o el usuario de `DATABASE_URL` no coinciden con PostgreSQL. `migrate deploy` aplica tablas a una base accesible; no configura las credenciales del servidor.

### Backend de producción

```bash
cd /var/www/Entregas_Trebol/backend
npm ci
npx prisma migrate deploy
npm run prisma:generate
npm run build
npm run seed:admin
pm2 start dist/app.js --name distribuidora-trebol-api
pm2 save
pm2 startup
curl -fsS http://127.0.0.1:3001/api/version
```

El comando `seed:admin` deja la base sin clientes, productos, regiones ni pedidos; solamente crea o actualiza el administrador configurado en `.env`.

### Frontend de producción

```bash
cd /var/www/Entregas_Trebol/frontend
npm ci
VITE_API_URL= npm run build
```

`VITE_API_URL=` hace que el panel use `/api` en la misma IP, incluso si una copia antigua de `frontend/.env.production` contiene el marcador `TU_IP_O_DOMINIO`.

### Nginx para acceso por IP pública

Crea `/etc/nginx/sites-available/trebol` y sustituye `TU_IP_PUBLICA` por la IPv4 del VPS:

```nginx
server {
    listen 80;
    server_name TU_IP_PUBLICA;
    root /var/www/Entregas_Trebol/frontend/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /uploads/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Activa el sitio y comprueba la configuración antes de recargar Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/trebol /etc/nginx/sites-enabled/trebol
sudo nginx -t
sudo systemctl reload nginx
curl -fsS http://TU_IP_PUBLICA/api/version
```

Si usas el firewall de Hetzner o UFW, permite tráfico HTTP por el puerto 80. No hace falta publicar el puerto 3001: Nginx lo usa localmente. Para pruebas móviles por IP, compila la app apuntando al mismo `/api`:

```bash
cd distribuidor_app
flutter build apk --release --dart-define=API_BASE_URL=http://TU_IP_PUBLICA/api
```

El acceso HTTP por IP es útil para las pruebas iniciales; antes de usar contraseñas de clientes o administrador en producción configura un dominio con HTTPS y reconstruye el APK con la URL `https://.../api`.

`deploy_produccion.sh` requiere una base ya existente y valores de PostgreSQL configurados en el propio script; para la primera instalación usa los pasos anteriores.
