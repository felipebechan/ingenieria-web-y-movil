import { add, documentTextOutline, notifications } from 'ionicons/icons'

// Las solicitudes ahora vienen del backend. Aca solo quedan las cosas fijas
// de la interfaz y el contador de notificaciones, que todavia no existe.

export const notificaciones = 3

// Las 3 tarjetas de accesos rapidos de la pantalla Inicio
export const opcionesInicio = [
  {
    id: 1,
    titulo: 'Nueva solicitud',
    texto: 'Ingresa un reclamo,\nsolicitud o sugerencia',
    icono: add,
    ruta: '/ingreso-reclamo',
  },
  {
    id: 2,
    titulo: 'Mis solicitudes',
    texto: 'Revisa el estado de\ntus trámites',
    icono: documentTextOutline,
    ruta: '/mis-solicitudes',
  },
  {
    id: 3,
    titulo: 'Notificaciones',
    texto: 'Mantente al día con\nlas novedades',
    icono: notifications,
  },
]
