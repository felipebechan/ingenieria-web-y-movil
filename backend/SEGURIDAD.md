# Seguridad del backend

Resumen de los riesgos que consideramos y cómo los cubre el código, con el archivo donde está cada cosa.

| Riesgo | Cómo lo prevenimos | Dónde está |
| :--- | :--- | :--- |
| **Inyección SQL** | Todas las consultas van parametrizadas con `$1`, `$2`. Los valores viajan aparte del texto del SQL, así que lo que escriba el usuario nunca puede cambiar la consulta. | `config/db.js`, `services/` |
| **XSS** | Los textos libres pasan por `limpiarTexto`, que les saca las etiquetas HTML antes de guardarlos. Se borran en vez de escaparlas, porque React ya escapa lo que imprime y si no el usuario vería `&lt;` en pantalla. | `validaciones.js`, `controllers/` |
| **Contraseñas** | Nunca se guardan en texto plano: se usa bcrypt con 10 rondas. La contraseña tampoco aparece en ninguna respuesta de la API. | `services/usuarios.service.js` |
| **Ver datos de otro usuario** | Cada consulta se filtra por el id del usuario del token, y las rutas del funcionario pasan por `soloFuncionario`. Un vecino no puede abrir una solicitud ajena aunque sepa el id. | `middlewares/auth.middleware.js`, `controllers/` |
| **CORS** | El origen permitido sale de la variable `ORIGEN_FRONTEND`, nunca un asterisco. | `app.js` |
| **Tokens falsificados o vencidos** | Los JWT van firmados con `JWT_SECRET` y tienen expiración. `verificarToken` revisa la firma y la vigencia en cada ruta protegida. | `middlewares/auth.middleware.js` |
| **Peticiones demasiado grandes** | El cuerpo de las peticiones tiene un tope de 2 MB, que es lo que necesita una foto en base64 y nada más. | `app.js` |
| **Filtrar detalles internos en los errores** | El manejador de errores solo devuelve el mensaje cuando es un error controlado (4xx). Cualquier otro responde "Error interno del servidor" y el detalle queda en la consola del servidor. | `middlewares/errores.middleware.js` |

## Códigos que devuelve la API

| Código | Cuándo |
| :--- | :--- |
| `400` | Los datos que llegaron no pasan la validación |
| `401` | Falta el token o ya venció |
| `403` | El token es válido pero el rol o el dueño no corresponde |
| `404` | El recurso no existe |
| `409` | La operación choca con el estado actual (correo repetido, solicitud ya cerrada) |

## Lo que falta

La aplicación no tiene límite de intentos de inicio de sesión, así que alguien podría probar contraseñas a repetición. Para un sistema real habría que agregarlo.
