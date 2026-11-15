import { consultar } from '../config/db.js'
import { calcularPlazo } from '../plazo.js'

function armarFolio(id) {
  const anio = new Date().getFullYear()
  return `#SD-${anio}-${String(id).padStart(4, '0')}`
}

export async function crearSolicitud(usuarioId, { tipo, descripcion, direccion, foto, latitud, longitud }) {
  const { rows } = await consultar(
    `INSERT INTO solicitudes (usuario_id, tipo, descripcion, direccion, foto, latitud, longitud)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [usuarioId, tipo, descripcion, direccion, foto || null, latitud ?? null, longitud ?? null]
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

  if (!rows[0]) {
    return undefined
  }

  return { ...rows[0], ...calcularPlazo(rows[0]) }
}

export async function listarTodas(filtros = {}) {
  const { estado, busqueda, pagina, porPagina } = filtros
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

  let whereSql = ''
  if (condiciones.length > 0) {
    whereSql = ` WHERE ${condiciones.join(' AND ')}`
  }

  // total para saber cuantas paginas son en total
  const { rows: conteo } = await consultar(
    `SELECT COUNT(*)::int AS total
     FROM solicitudes s
     JOIN usuarios u ON u.id = s.usuario_id${whereSql}`,
    valores
  )
  const total = conteo[0].total

  const numPagina = Math.max(1, parseInt(pagina, 10) || 1)
  // con tope, si no alguien podria pedir la tabla entera en una sola consulta
  const limite = Math.min(50, Math.max(1, parseInt(porPagina, 10) || 10))
  const offset = (numPagina - 1) * limite

  // solo traemos las columnas que la bandeja muestra en pantalla
  const valoresPaginacion = [...valores, limite, offset]
  const sql = `SELECT s.id, s.folio, s.creada_en, s.tipo, s.estado, u.nombre AS ciudadano
     FROM solicitudes s
     JOIN usuarios u ON u.id = s.usuario_id${whereSql}
     ORDER BY s.creada_en DESC, s.id DESC
     LIMIT $${valores.length + 1} OFFSET $${valores.length + 2}`

  const { rows: datos } = await consultar(sql, valoresPaginacion)

  // a cada solicitud abierta se le calcula cuanto le queda del plazo
  const conPlazo = datos.map((solicitud) => ({ ...solicitud, ...calcularPlazo(solicitud) }))

  return {
    datos: conPlazo,
    total,
    pagina: numPagina,
    porPagina: limite
  }
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
