| Método | Ruta | Requiere Token | Body / Payload | Respuesta Exitosa | Posibles Errores |
|--------|------|----------------|----------------|-------------------|------------------|
| **POST** | `/api/auth/login` | No | `{"correo": "...", "password": "..."}` | `200 OK` (Devuelve el Token JWT) | `401 Unauthorized` (Credenciales inválidas) |
| **GET** | `/api/solicitudes` | Sí | Ninguno | `200 OK` (Array con solicitudes) | `401 Unauthorized`, `403 Forbidden` |
| **GET** | `/api/solicitudes/:id` | Sí | Ninguno | `200 OK` (Detalle de la solicitud) | `404 Not Found` (La solicitud no existe) |
| **POST** | `/api/solicitudes` | Sí (Ciudadano) | `{"tipo": "...", "direccion": "...", "descripcion": "..."}` | `201 Created` (Solicitud creada) | `400 Bad Request` (Falta descripción u otro campo) |