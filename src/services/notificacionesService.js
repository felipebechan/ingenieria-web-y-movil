import { pedir } from './api'

function formatearFecha(fecha) {
  if (!fecha) return ''
  const f = new Date(fecha)
  const dia = String(f.getDate()).padStart(2, '0')
  const mes = String(f.getMonth() + 1).padStart(2, '0')
  const anio = f.getFullYear()
  const hora = String(f.getHours()).padStart(2, '0')
  const min = String(f.getMinutes()).padStart(2, '0')
  return `${dia}/${mes}/${anio} a las ${hora}:${min}`
}

export async function obtenerNotificaciones() {
  const notificaciones = await pedir('/notificaciones')
  return notificaciones.map((n) => ({
    ...n,
    fechaFormateada: formatearFecha(n.fecha)
  }))
}

export async function obtenerContadorNotificaciones() {
  return pedir('/notificaciones/contador')
}

export async function marcarNotificacionLeida(id) {
  return pedir(`/notificaciones/${id}/leida`, { method: 'PATCH' })
}
