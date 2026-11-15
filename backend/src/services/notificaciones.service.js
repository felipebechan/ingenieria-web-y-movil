import { consultar } from '../config/db.js'

export async function buscarPorId(id) {
  const { rows } = await consultar(
    `SELECT h.*, s.usuario_id
     FROM historial_estados h
     JOIN solicitudes s ON s.id = h.solicitud_id
     WHERE h.id = $1`,
    [id]
  )
  return rows[0]
}

export async function listarDeUsuario(usuarioId) {
  const { rows } = await consultar(
    `SELECT
       h.id,
       h.solicitud_id,
       s.folio,
       s.tipo,
       h.estado,
       h.comentario,
       h.registrado_en AS fecha,
       h.leida
     FROM historial_estados h
     JOIN solicitudes s ON s.id = h.solicitud_id
     WHERE s.usuario_id = $1
     ORDER BY h.registrado_en DESC, h.id DESC`,
    [usuarioId]
  )
  return rows
}

export async function contarSinLeer(usuarioId) {
  const { rows } = await consultar(
    `SELECT COUNT(*)::int AS sin_leer
     FROM historial_estados h
     JOIN solicitudes s ON s.id = h.solicitud_id
     WHERE s.usuario_id = $1 AND h.leida = false`,
    [usuarioId]
  )
  return rows[0].sin_leer
}

export async function marcarLeida(id, usuarioId) {
  const { rows } = await consultar(
    `UPDATE historial_estados h
     SET leida = true
     FROM solicitudes s
     WHERE h.solicitud_id = s.id
       AND h.id = $1
       AND s.usuario_id = $2
     RETURNING h.*`,
    [id, usuarioId]
  )
  return rows[0]
}
