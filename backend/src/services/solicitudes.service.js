import { consultar } from '../config/db.js'

function armarFolio(id) {
  const anio = new Date().getFullYear()
  return `#SD-${anio}-${String(id).padStart(4, '0')}`
}

export async function crearSolicitud(usuarioId, { tipo, descripcion, direccion }) {
  const { rows } = await consultar(
    `INSERT INTO solicitudes (usuario_id, tipo, descripcion, direccion)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [usuarioId, tipo, descripcion, direccion]
  )

  const { rows: creada } = await consultar(
    'UPDATE solicitudes SET folio = $1 WHERE id = $2 RETURNING *',
    [armarFolio(rows[0].id), rows[0].id]
  )

  return creada[0]
}

export async function listarPorUsuario(usuarioId) {
  const { rows } = await consultar(
    'SELECT * FROM solicitudes WHERE usuario_id = $1 ORDER BY creada_en DESC, id DESC',
    [usuarioId]
  )
  return rows
}

export async function buscarPorId(id) {
  const { rows } = await consultar(
    `SELECT s.*, u.nombre AS ciudadano
     FROM solicitudes s
     JOIN usuarios u ON u.id = s.usuario_id
     WHERE s.id = $1`,
    [id]
  )
  return rows[0]
}

export async function listarTodas(filtros = {}) {
  const { estado, busqueda } = filtros
  const condiciones = []
  const valores = []

  if (estado) {
    valores.push(estado)
    condiciones.push(`s.estado = $${valores.length}`)
  }

  if (busqueda) {
    valores.push(`%${busqueda}%`)
    condiciones.push(`(s.folio ILIKE $${valores.length} OR u.nombre ILIKE $${valores.length})`)
  }

  let sql = `SELECT s.*, u.nombre AS ciudadano
     FROM solicitudes s
     JOIN usuarios u ON u.id = s.usuario_id`

  if (condiciones.length > 0) {
    sql += ` WHERE ${condiciones.join(' AND ')}`
  }

  sql += ' ORDER BY s.creada_en DESC, s.id DESC'

  const { rows } = await consultar(sql, valores)
  return rows
}

export async function cambiarEstado(id, estado, comentario) {
  const { rows } = await consultar(
    `UPDATE solicitudes
     SET estado = $1
     WHERE id = $2
     RETURNING *`,
    [estado, id]
  )

  if (!rows[0]) {
    return null
  }

  // cada cambio queda guardado para poder mostrar el seguimiento despues
  await consultar(
    'INSERT INTO historial_estados (solicitud_id, estado, comentario) VALUES ($1, $2, $3)',
    [id, estado, comentario || null]
  )

  return rows[0]
}

// Derivar deja la solicitud en manos de una unidad y la pasa a En proceso
export async function derivarSolicitud(id, unidad, observacion) {
  const { rows } = await consultar(
    `UPDATE solicitudes
     SET unidad = $1, estado = 'En proceso'
     WHERE id = $2
     RETURNING *`,
    [unidad, id]
  )

  if (!rows[0]) {
    return null
  }

  await consultar(
    'INSERT INTO historial_estados (solicitud_id, estado, comentario) VALUES ($1, $2, $3)',
    [id, 'En proceso', `Derivada a ${unidad}` + (observacion ? `. ${observacion}` : '')]
  )

  return rows[0]
}

// La respuesta formal cierra la solicitud
export async function responderSolicitud(id, respuesta) {
  const { rows } = await consultar(
    `UPDATE solicitudes
     SET respuesta = $1, estado = 'Resuelto'
     WHERE id = $2
     RETURNING *`,
    [respuesta, id]
  )

  if (!rows[0]) {
    return null
  }

  await consultar(
    'INSERT INTO historial_estados (solicitud_id, estado, comentario) VALUES ($1, $2, $3)',
    [id, 'Resuelto', respuesta]
  )

  return rows[0]
}

export async function listarHistorial(solicitudId) {
  const { rows } = await consultar(
    `SELECT id, estado, comentario, registrado_en
     FROM historial_estados
     WHERE solicitud_id = $1
     ORDER BY registrado_en`,
    [solicitudId]
  )
  return rows
}

export async function eliminarSolicitud(id) {
  // primero el historial, porque apunta a la solicitud con una clave foranea
  await consultar('DELETE FROM historial_estados WHERE solicitud_id = $1', [id])

  const { rows } = await consultar('DELETE FROM solicitudes WHERE id = $1 RETURNING *', [id])
  return rows[0]
}
