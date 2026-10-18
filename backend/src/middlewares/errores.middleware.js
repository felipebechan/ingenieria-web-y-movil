export function noEncontrado(req, res) {
  res.status(404).json({ error: 'La ruta no existe' })
}

// Middleware de errores: centraliza las respuestas para no repetirlas en cada ruta
export function manejarErrores(err, req, res, next) {
  console.error(err)

  const estado = err.estado || 500
  const mensaje = estado === 500 ? 'Error interno del servidor' : err.message

  res.status(estado).json({ error: mensaje })
}
