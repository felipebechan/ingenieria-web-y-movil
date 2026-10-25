# Endpoints de la API

La URL base es `http://localhost:3000/api`. El token se manda en la cabecera
`Authorization: Bearer <token>` y se obtiene del login.

| Método | Ruta | Requiere Token | Body / Payload | Respuesta Exitosa | Posibles Errores |
|--------|------|----------------|----------------|-------------------|------------------|
| **POST** | `/api/auth/registro` | No | `{"nombre": "...", "correo": "...", "rut": "...", "telefono": "...", "password": "..."}` | `201 Created` (Usuario y Token JWT) | `400 Bad Request` (Datos inválidos), `409 Conflict` (Correo o RUT ya registrado) |
| **POST** | `/api/auth/login` | No | `{"correo": "...", "password": "..."}` | `200 OK` (Devuelve el Token JWT) | `400 Bad Request` (Faltan datos), `401 Unauthorized` (Credenciales inválidas) |
| **GET** | `/api/auth/yo` | Sí | Ninguno | `200 OK` (Datos del usuario de la sesión) | `401 Unauthorized` (Sin token o token vencido) |
| **POST** | `/api/solicitudes` | Sí | `{"tipo": "...", "direccion": "...", "descripcion": "..."}` | `201 Created` (Solicitud creada con su folio) | `400 Bad Request` (Falta descripción u otro campo), `401 Unauthorized` |
| **GET** | `/api/solicitudes` | Sí (Funcionario) | Ninguno | `200 OK` (Array con todas las solicitudes) | `401 Unauthorized`, `403 Forbidden` (Es ciudadano) |
| **GET** | `/api/solicitudes/mias` | Sí | Ninguno | `200 OK` (Array con las solicitudes del usuario) | `401 Unauthorized` |
| **GET** | `/api/solicitudes/:id` | Sí | Ninguno | `200 OK` (Detalle de la solicitud) | `401 Unauthorized`, `403 Forbidden` (No es suya), `404 Not Found` |
| **GET** | `/api/solicitudes/:id/historial` | Sí | Ninguno | `200 OK` (Array con los cambios de estado) | `401 Unauthorized`, `403 Forbidden` (No es suya), `404 Not Found` |
| **PATCH** | `/api/solicitudes/:id/estado` | Sí (Funcionario) | `{"estado": "En proceso", "comentario": "..."}` | `200 OK` (Solicitud actualizada) | `400 Bad Request` (Estado inválido), `403 Forbidden`, `404 Not Found` |
| **PATCH** | `/api/solicitudes/:id/derivar` | Sí (Funcionario) | `{"unidad": "Tránsito", "observacion": "..."}` | `200 OK` (Solicitud derivada y En proceso) | `400 Bad Request` (Unidad inválida), `403 Forbidden`, `404 Not Found`, `409 Conflict` (Ya cerrada) |
| **PATCH** | `/api/solicitudes/:id/responder` | Sí (Funcionario) | `{"respuesta": "..."}` | `200 OK` (Solicitud Resuelta con su respuesta) | `400 Bad Request` (Respuesta muy corta), `403 Forbidden`, `404 Not Found`, `409 Conflict` (Ya respondida) |
| **DELETE** | `/api/solicitudes/:id` | Sí | Ninguno | `200 OK` (Confirmación con el folio) | `403 Forbidden` (No es suya), `404 Not Found`, `409 Conflict` (Ya está en trámite) |

El listado del funcionario acepta además los filtros `?busqueda=` y `?estado=`,
que son los que usa la bandeja del panel de gestión.

Un `id` que no sea un número responde `400` y no llega a consultar la base de datos.

Las unidades válidas para derivar son `Dirección de Obras Municipales`, `Aseo y Ornato`,
`Tránsito` y `Seguridad Ciudadana`. Derivar deja la solicitud `En proceso` y responder la
deja `Resuelto`; las dos acciones escriben en el historial.

**Sobre el PATCH y el DELETE:** cada cambio de estado se guarda en la tabla
`historial_estados`, que es lo que devuelve el endpoint del historial. El vecino
solo puede eliminar una solicitud suya mientras siga `En revisión`; el funcionario
puede eliminar cualquiera, y el historial asociado se borra junto con ella.
