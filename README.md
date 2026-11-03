# Distribuidora Trébol

Sistema de distribución con backend, panel web y aplicación móvil.

## Componentes

- `backend`: API Node.js, Express, TypeScript, Prisma y PostgreSQL.
- `frontend`: panel web React/Vite.
- `distribuidor_app`: aplicación móvil Flutter.
- `electron-printer`: impresión térmica.

## Desarrollo local

### Impresión automática USB en Windows

El módulo `electron-printer` imprime las boletas automáticamente en `POS80 Printer` mediante el controlador de Windows, con letra Calibri y sin abrir el diálogo de impresión. La impresora debe estar instalada en Windows con ese nombre. La aplicación usa `http://localhost:5173` para el panel web local.

Las boletas de Chrome comparten la misma plantilla en impresión individual, por lote y continua. El texto copiable y la boleta móvil mantienen el mismo orden de datos y las columnas Descripcion, CANT, P.U. y total, ajustadas al ancho de 80 o 58 mm.

```bash
cd electron-printer
npm install
npm start
```

Para usar otro nombre de impresora o una URL publicada, define `TREBOL_PRINTER_NAME` o `TREBOL_SERVER_URL` antes de iniciar Electron. El instalador de Windows se crea con `npm run build`.

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

Instala Ubuntu, PostgreSQL con PostGIS, Node.js 20, Nginx, Git y PM2.

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib postgis nginx git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### Base de datos vacía

Crea la base exclusiva de esta aplicación:

```bash
sudo -u postgres createdb bd_entregas_trebol
```

Configura `backend/.env` en el VPS:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/bd_entregas_trebol?schema=public"
PORT=3001
JWT_SECRET="una-clave-larga-y-segura"
ADMIN_NAME="Administrador"
ADMIN_EMAIL="admin@tudominio.com"
ADMIN_PASSWORD="una-clave-segura"
ADMIN_PHONE=""
```

### Backend de producción

```bash
cd /var/www/Entregas_Trebol/backend
npm install
npx prisma migrate deploy
npm run prisma:generate
npm run build
npm run seed:admin
pm2 start dist/app.js --name distribuidora-trebol-api
pm2 save
pm2 startup
```

El comando `seed:admin` deja la base sin clientes, productos, regiones ni pedidos; solamente crea o actualiza el administrador configurado en `.env`.

### Frontend de producción

```bash
cd /var/www/Entregas_Trebol/frontend
npm install
npm run build
```

Publica `frontend/dist` mediante Nginx y configura el proxy `/api` hacia `http://127.0.0.1:3001`. Para la app móvil publicada, cambia la URL de `api.dart` a la URL pública del VPS, por ejemplo `https://api.tudominio.com/api`.

También puedes usar `deploy_produccion.sh` después de ajustar la ruta, credenciales de PostgreSQL y nombre del proceso PM2.
