# API de Santo Domingo Responde

Backend del proyecto, hecho con Node.js y Express, con base de datos PostgreSQL.

## Requisitos

- Node.js 20 o superior
- PostgreSQL 14 o superior

## Instalación

```bash
cd backend
npm install
cp .env.example .env
```

En el archivo `.env` hay que completar los datos de la base y la clave del token. El archivo `.env` no se sube al repositorio.

## Base de datos

```bash
createdb santo_domingo
psql -d santo_domingo -f sql/schema.sql
```

## Ejecutar

```bash
npm run dev
```

La API queda en `http://localhost:3000`. Para comprobar que arrancó: `GET http://localhost:3000/api/health` devuelve `{ "ok": true }`.

## Endpoints

| Método | Ruta | Sesión | Qué hace |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/registro` | No | Crea una cuenta de ciudadano y devuelve el token |
| POST | `/api/auth/login` | No | Inicia sesión y devuelve el token |
| GET | `/api/auth/yo` | Sí | Devuelve los datos del usuario del token |
| POST | `/api/solicitudes` | Sí | Ingresa una solicitud y le asigna folio |
| GET | `/api/solicitudes/mias` | Sí | Lista las solicitudes del usuario |
| GET | `/api/solicitudes/:id` | Sí | Muestra una solicitud; solo el dueño o un funcionario |

El token se manda en la cabecera `Authorization: Bearer <token>`.

### Códigos de estado que usamos

| Código | Cuándo |
| :--- | :--- |
| 200 | Consulta correcta |
| 201 | Recurso creado |
| 400 | Faltan datos o están mal |
| 401 | Falta el token o es inválido |
| 403 | El rol no tiene permiso |
| 404 | El recurso no existe |
| 409 | El correo ya está registrado |
| 500 | Error interno |

## Estructura

```text
backend/
├── sql/           schema.sql con las tablas
└── src/
    ├── config/      conexión a PostgreSQL
    ├── routes/      define las rutas
    ├── controllers/ recibe la petición y responde
    ├── services/    consultas a la base de datos
    ├── middlewares/ token, roles y errores
    └── validaciones.js
```

## Lo que falta

- Endpoints del funcionario: listar todas las solicitudes con filtros y cambiar el estado.
- Validaciones de formato de correo, RUT y contraseña.
- Tabla `historial_estados` y datos de prueba en el `.sql`.
- Colección de Postman con las pruebas.
