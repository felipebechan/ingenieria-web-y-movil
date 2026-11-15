import { consultar } from '../config/db.js'

// Las dos cosas que necesita el administrador: ver las cuentas para poder
// darle el rol de funcionario a alguien, y saber cuanto se esta demorando
// la municipalidad en cerrar las solicitudes.

export async function listarUsuarios() {
  const { rows } = await consultar(
    `SELECT u.id, u.nombre, u.correo, u.rol,
            (SELECT COUNT(*)::int FROM solicitudes WHERE usuario_id = u.id) AS solicitudes
     FROM usuarios u
     ORDER BY u.rol, u.nombre`
  )
  return rows
}

export async function cambiarRol(id, rol) {
  const { rows } = await consultar(
    'UPDATE usuarios SET rol = $1 WHERE id = $2 RETURNING id, nombre, correo, rol',
    [rol, id]
  )
  return rows[0]
}

export async function buscarUsuario(id) {
  const { rows } = await consultar('SELECT id, nombre, rol FROM usuarios WHERE id = $1', [id])
  return rows[0]
}

export async function calcularMetricas() {
  // cuantas hay en cada estado
  const { rows: porEstado } = await consultar(
    'SELECT estado, COUNT(*)::int AS cantidad FROM solicitudes GROUP BY estado ORDER BY estado'
  )

  // el promedio se saca entre que entro la solicitud y el movimiento que la
  // cerro, usando el ultimo registro del historial de esa solicitud
  const { rows: promedio } = await consultar(
    `SELECT ROUND(AVG(EXTRACT(EPOCH FROM (cierre.registrado_en - s.creada_en)) / 86400)::numeric, 1) AS dias
     FROM solicitudes s
     JOIN LATERAL (
       SELECT h.registrado_en
       FROM historial_estados h
       WHERE h.solicitud_id = s.id AND h.estado IN ('Resuelto', 'Rechazado')
       ORDER BY h.registrado_en DESC
       LIMIT 1
     ) AS cierre ON true
     WHERE s.estado IN ('Resuelto', 'Rechazado')`
  )

  const { rows: totales } = await consultar(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE estado IN ('Resuelto', 'Rechazado'))::int AS cerradas
     FROM solicitudes`
  )

  return {
    porEstado,
    diasPromedioDeCierre: promedio[0].dias === null ? null : Number(promedio[0].dias),
    total: totales[0].total,
    cerradas: totales[0].cerradas
  }
}
