import { solicitudes, misSolicitudes, solicitudesAdmin } from '../data/datosPrueba'

// Mientras no exista el backend guardamos las solicitudes nuevas en localStorage.
// Cuando llegue la API (EP2) solo cambian estas funciones, las pantallas quedan igual.

const CLAVE = 'solicitudes'

function leerGuardadas() {
  const guardadas = localStorage.getItem(CLAVE)
  return guardadas ? JSON.parse(guardadas) : []
}

// Genera el folio correlativo que pide el RF-02
function nuevoFolio(cantidad) {
  const numero = 13 + cantidad
  return '#SD-2026-' + String(numero).padStart(4, '0')
}

function fechaDeHoy() {
  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  return `${dia}/${mes}/${hoy.getFullYear()}`
}

export function crearSolicitud({ tipo, direccion, descripcion, ciudadano }) {
  const guardadas = leerGuardadas()

  const solicitud = {
    id: 'nueva-' + (guardadas.length + 1),
    folio: nuevoFolio(guardadas.length + 1),
    fecha: fechaDeHoy(),
    tipo,
    descripcion,
    descripcionMovil: descripcion.length > 22 ? descripcion.slice(0, 22) + '...' : descripcion,
    ubicacion: direccion,
    ciudadano: ciudadano || 'Vecino',
    estado: 'En revisión',
  }

  localStorage.setItem(CLAVE, JSON.stringify([solicitud, ...guardadas]))
  return solicitud
}

// Las solicitudes nuevas van primero para que se vean al tiro
export function obtenerMisSolicitudes() {
  return [...leerGuardadas(), ...misSolicitudes]
}

export function obtenerSolicitudesRecientes() {
  return [...leerGuardadas(), ...solicitudes].slice(0, 3)
}

export function obtenerSolicitudesAdmin() {
  return [...leerGuardadas(), ...solicitudesAdmin]
}

// Filtro que usa el funcionario en la bandeja de solicitudes
export function buscarSolicitudesAdmin(busqueda, estado) {
  const texto = busqueda.toLowerCase()

  return obtenerSolicitudesAdmin().filter((item) => {
    const ciudadano = item.ciudadano || ''
    const coincideBusqueda =
      item.folio.toLowerCase().includes(texto) ||
      ciudadano.toLowerCase().includes(texto) ||
      item.tipo.toLowerCase().includes(texto) ||
      item.descripcion.toLowerCase().includes(texto)

    const coincideEstado = !estado || item.estado === estado

    return coincideBusqueda && coincideEstado
  })
}

// Busca una solicitud puntual para la pantalla de detalle
export function obtenerSolicitudPorId(id) {
  const todas = [...leerGuardadas(), ...misSolicitudes, ...solicitudes, ...solicitudesAdmin]
  return todas.find((item) => String(item.id) === String(id))
}
