export function noEncontrado(req, res) {
  res.status(404).json({ error: 'La ruta no existe' })
}

// Middleware de errores: centraliza las respuestas para no repetirlas en cada ruta
export function manejarErrores(err, req, res, next) {
  console.error(err)

  // Solo se envian al cliente errores controlados (4xx), nunca detalles internos de la base ni trazas
  const estado = err.estado || err.status || err.statusCode || 500
  const mensaje = estado >= 400 && estado < 500 && err.message
    ? err.message
    : 'Error interno del servidor'

  res.status(estado).json({ error: mensaje })
}
