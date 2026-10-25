import { pedir } from './api'

// El backend devuelve la fecha completa y el frontend muestra dd/mm/aaaa,
// asi que acomodamos los datos aca y las pantallas quedan igual que antes.
function acomodar(solicitud) {
  const fecha = new Date(solicitud.creada_en)
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')

  return {
    ...solicitud,
    fecha: `${dia}/${mes}/${fecha.getFullYear()}`,
    descripcionMovil:
      solicitud.descripcion.length > 22
        ? solicitud.descripcion.slice(0, 22) + '...'
        : solicitud.descripcion,
    ubicacion: solicitud.direccion
  }
}

export async function crearSolicitud({ tipo, descripcion, direccion }) {
  const creada = await pedir('/solicitudes', {
    method: 'POST',
    body: JSON.stringify({ tipo, descripcion, direccion })
  })
  return acomodar(creada)
}

export async function obtenerMisSolicitudes() {
  const solicitudes = await pedir('/solicitudes/mias')
  return solicitudes.map(acomodar)
}

export async function obtenerSolicitudesRecientes() {
  const solicitudes = await obtenerMisSolicitudes()
  return solicitudes.slice(0, 3)
}

export async function obtenerSolicitudPorId(id) {
  const solicitud = await pedir(`/solicitudes/${id}`)
  return acomodar(solicitud)
}

export async function obtenerSolicitudesAdmin() {
  const solicitudes = await pedir('/solicitudes')
  return solicitudes.map(acomodar)
}

// Los filtros de la bandeja del funcionario viajan en la url
export async function buscarSolicitudesAdmin(busqueda, estado) {
  const filtros = new URLSearchParams()
  if (busqueda) filtros.set('busqueda', busqueda)
  if (estado) filtros.set('estado', estado)

  const query = filtros.toString()
  const solicitudes = await pedir('/solicitudes' + (query ? `?${query}` : ''))
  return solicitudes.map(acomodar)
}

// Solo el funcionario puede cambiar el estado; el backend lo guarda en el historial
export async function cambiarEstadoSolicitud(id, estado, comentario) {
  const solicitud = await pedir(`/solicitudes/${id}/estado`, {
    method: 'PATCH',
    body: JSON.stringify({ estado, comentario })
  })
  return acomodar(solicitud)
}

export async function obtenerHistorial(id) {
  return pedir(`/solicitudes/${id}/historial`)
}

export async function eliminarSolicitud(id) {
  return pedir(`/solicitudes/${id}`, { method: 'DELETE' })
}
