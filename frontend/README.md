# Frontend - Panel de Administración de Entregas

Este es el frontend web (panel de administración) del sistema de entregas, construido con **React**, **Vite**, **TypeScript** y estilizado con **Tailwind CSS**. También utiliza **React Leaflet** para la gestión de mapas.

## Requisitos previos

- Node.js (v18 o superior recomendado)

## Configuración del entorno

1. Ve a la carpeta `frontend`.
2. Si existe un archivo `.env.example`, haz una copia y renómbralo a `.env`.
3. Asegúrate de configurar la URL de tu API backend en las variables de entorno para que el frontend pueda conectarse (generalmente bajo el nombre `VITE_API_URL` u otro similar).

## Instalación

Instala las dependencias del proyecto usando npm:

```bash
npm install
```

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo utilizando Vite con Hot Module Replacement (HMR).
- `npm run build`: Compila el proyecto TypeScript y construye la aplicación optimizada para producción con Vite.
- `npm run preview`: Previsualiza localmente el build de producción generado.
- `npm run lint`: Ejecuta el linter (ESLint) para buscar errores en el código.

## Tecnologías principales

- React 19
- Vite
- Tailwind CSS
- React Router DOM (para enrutamiento)
- Axios (para peticiones HTTP)
- React Leaflet & Geoman (para mapas interactivos)
