# API de Gestión de Contactos

Esta es una API REST simple para gestionar una lista de contactos almacenados en un archivo local.

## Instalación

1. Clona el repositorio o descarga los archivos.
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

## Ejecución

Para iniciar el servidor, ejecuta:
```bash
npm start
```

## Endpoints

- `GET /api/contactos`: Devuelve la lista completa de contactos.
- `POST /api/contactos`: Crea un nuevo contacto. 
  - Cuerpo esperado: `{ "nombre": "Juan", "telefono": "123456789" }`
