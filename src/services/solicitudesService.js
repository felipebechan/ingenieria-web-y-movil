import { solicitudes, misSolicitudes, solicitudesAdmin } from '../data/datosPrueba'

// Por ahora devuelve los datos de prueba. Cuando exista el backend (EP2)
// aca van las llamadas fetch a la API y las pantallas no cambian.

export function obtenerSolicitudesRecientes() {
  return solicitudes
}

export function obtenerMisSolicitudes() {
  return misSolicitudes
}

export function obtenerSolicitudesAdmin() {
  return solicitudesAdmin
}

// Filtro que usa el funcionario en la bandeja de solicitudes
export function buscarSolicitudesAdmin(busqueda, estado) {
  const texto = busqueda.toLowerCase()

  return solicitudesAdmin.filter((item) => {
    const coincideBusqueda =
      item.folio.toLowerCase().includes(texto) ||
      item.ciudadano.toLowerCase().includes(texto) ||
      item.tipo.toLowerCase().includes(texto) ||
      item.descripcion.toLowerCase().includes(texto)

    const coincideEstado = !estado || item.estado === estado

    return coincideBusqueda && coincideEstado
  })
}

// Busca una solicitud puntual para la pantalla de detalle
export function obtenerSolicitudPorId(id) {
  const todas = [...misSolicitudes, ...solicitudes]
  return todas.find((item) => String(item.id) === String(id))
}
