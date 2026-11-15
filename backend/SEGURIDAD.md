# Medidas de Seguridad del Backend

Este documento resume los principales riesgos de seguridad identificados en la aplicación, la estrategia adoptada para mitigarlos y los archivos correspondientes donde se implementa cada protección.

## Matriz de Riesgos y Controles

| Riesgo | Cómo lo prevenimos | Archivo de protección |
| :--- | :--- | :--- |
| **Inyección SQL** | Se utilizan consultas parametrizadas (`$1`, `$2`, etc.) mediante la librería `pg`. Los parámetros se envían por separado al motor de base de datos, impidiendo que datos de entrada alteren la lógica de la consulta SQL. | `backend/src/config/db.js`<br>`backend/src/services/solicitudes.service.js`<br>`backend/src/services/usuarios.service.js` |
| **Cross-Site Scripting (XSS)** | Sanitización de entradas de texto libre mediante la función `limpiarTexto`, la cual neutraliza caracteres especiales transformando `<` y `>` en sus entidades HTML seguras (`&lt;` y `&gt;`), además de aplicar `trim()`. | `backend/src/validaciones.js`<br>`backend/src/controllers/solicitudes.controller.js`<br>`backend/src/controllers/auth.controller.js`<br>`backend/src/controllers/direcciones.controller.js` |
| **Robo de contraseñas** | Las contraseñas nunca se almacenan en texto plano. Se procesan mediante hash criptográfico unidireccional con `bcryptjs` utilizando un factor de costo (salt) de 10 rondas antes de persistirlas. | `backend/src/services/usuarios.service.js` |
| **Acceso a datos de otros usuarios** | Control de acceso basado en el identificador del usuario autenticado (`req.usuario.id`) y validación de roles (`soloFuncionario`). Un vecino solo puede consultar o cancelar sus propias solicitudes. | `backend/src/middlewares/auth.middleware.js`<br>`backend/src/controllers/solicitudes.controller.js` |
| **Peticiones no autorizadas entre sitios (CORS)** | Se configura el middleware `cors` limitando el acceso exclusivamente al origen definido en la variable de entorno `ORIGEN_FRONTEND` (sin utilizar comodines `*`). | `backend/src/app.js` |
| **Manipulación o falsificación de tokens** | Autenticación mediante JWT firmados con clave secreta (`JWT_SECRET`) y con expiración obligatoria. El middleware `verificarToken` valida la firma y vigencia en cada solicitud a rutas protegidas. | `backend/src/middlewares/auth.middleware.js`<br>`backend/src/controllers/auth.controller.js` |
| **Ataques de denegación de servicio (DoS por payload)** | Restricción del tamaño máximo del cuerpo de las peticiones JSON a 2MB en `express.json({ limit: '2mb' })` para evitar saturación de memoria. | `backend/src/app.js` |
| **Fuga de información técnica en errores** | Centralización de errores con el middleware `manejarErrores`, que registra el detalle técnico solo en los logs internos del servidor y responde siempre con mensajes genéricos y limpios al cliente. | `backend/src/middlewares/errores.middleware.js`<br>`backend/src/controllers/auth.controller.js` |
