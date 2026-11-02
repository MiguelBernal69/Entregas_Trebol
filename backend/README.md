# Backend - Sistema de Entregas

Este es el backend del sistema de entregas, construido con **Node.js**, **Express**, **TypeScript** y **Prisma ORM** (con base de datos PostgreSQL).

## Requisitos previos

- Node.js (v18 o superior recomendado)
- PostgreSQL

## Configuración del entorno

1. Clona el repositorio.
2. Copia el archivo de entorno de ejemplo para crear tu propio archivo `.env` (si existe un `.env.example`, caso contrario, crea un `.env` en la raíz de esta carpeta).
   Asegúrate de configurar correctamente la variable `DATABASE_URL` con tus credenciales de PostgreSQL.
   ```
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_bd?schema=public"
   ```

## Instalación

Instala las dependencias del proyecto usando npm:

```bash
npm install
```

## Base de datos

Antes de correr el proyecto, asegúrate de inicializar y sincronizar la base de datos con Prisma:

```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Ejecutar las migraciones en tu base de datos
npm run prisma:migrate

# (Opcional) Poblar la base de datos con datos semilla iniciales
npm run seed
```

## Scripts disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo utilizando nodemon y ts-node.
- `npm run build`: Compila el código TypeScript a JavaScript en la carpeta `dist`.
- `npm run start`: Inicia el servidor en modo producción (requiere haber ejecutado `build` previamente).

## Tecnologías principales

- Express.js
- Prisma ORM
- PostgreSQL
- JsonWebToken (JWT) para autenticación
- Multer (para subida de archivos)
