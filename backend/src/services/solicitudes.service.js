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
    'SELECT * FROM solicitudes WHERE usuario_id = $1 ORDER BY creada_en DESC',
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

export async function listarTodas() {
  const { rows } = await consultar(
    `SELECT s.*, u.nombre AS ciudadano
     FROM solicitudes s
     JOIN usuarios u ON u.id = s.usuario_id
     ORDER BY s.creada_en DESC`
  )
  return rows
}


