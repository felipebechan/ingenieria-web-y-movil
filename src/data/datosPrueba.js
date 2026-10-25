import { add, documentTextOutline, notifications } from 'ionicons/icons'

// Las solicitudes vienen del backend. Aca solo quedan las opciones fijas
// de la interfaz.

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
