import { add, documentTextOutline, notifications } from 'ionicons/icons'

// Datos de prueba hasta que conectemos el backend

export const usuario = {
  nombre: 'Juan López',
  notificaciones: 3,
}

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

// Ultimas solicitudes del ciudadano, se muestran en la pantalla Inicio
export const solicitudes = [
  {
    id: 1,
    folio: '#SD-2026-0012',
    fecha: '13/09/2026',
    tipo: 'Alumbrado',
    descripcion: 'Foco apagado en Av. del Mar',
    descripcionMovil: 'Foco apagado en Av....',
    estado: 'En revisión',
  },
  {
    id: 2,
    folio: '#SD-2026-0011',
    fecha: '01/09/2026',
    tipo: 'Aseo y limpieza',
    descripcion: 'Retiro de escombros en pasaje 5',
    descripcionMovil: 'Retiro de escombros...',
    estado: 'En proceso',
  },
  {
    id: 3,
    folio: '#SD-2026-0010',
    fecha: '28/08/2026',
    tipo: 'Áreas verdes',
    descripcion: 'Poda de árboles en plaza',
    descripcionMovil: 'Poda de árboles en...',
    estado: 'Resuelto',
  },
]

// Historial completo del ciudadano (pantalla Mis solicitudes)
export const misSolicitudes = [
  { id: 1, folio: '#SD-2026-0012', fecha: '13/09/2026', tipo: 'Reclamo', descripcion: 'Foco apagado en Av. del Mar', estado: 'En revisión' },
  { id: 2, folio: '#SD-2026-0009', fecha: '05/09/2026', tipo: 'Acceso', descripcion: 'Solicitud de acceso a la información', estado: 'En revisión' },
  { id: 3, folio: '#SD-2026-0008', fecha: '21/08/2026', tipo: 'Agradecimiento', descripcion: 'Agradecimiento a cuadrilla de aseo', estado: 'Resuelto' },
  { id: 4, folio: '#SD-2026-0007', fecha: '12/08/2026', tipo: 'Permisos', descripcion: 'Permiso para feria vecinal', estado: 'En proceso' },
  { id: 5, folio: '#SD-2026-0005', fecha: '30/07/2026', tipo: 'Beneficio', descripcion: 'Postulación a beneficio municipal', estado: 'Resuelto' },
  { id: 6, folio: '#SD-2026-0004', fecha: '18/07/2026', tipo: 'Permisos', descripcion: 'Permiso de ocupación de vereda', estado: 'Rechazado' },
]

// Bandeja que ve el funcionario en la pantalla Revisar solicitudes
export const solicitudesAdmin = [
  {
    id: 1,
    folio: '#SD-2026-0012',
    fecha: '13/09/2026',
    ciudadano: 'Ana Paula Soto',
    tipo: 'Alumbrado',
    descripcion: 'Foco apagado en Av. del Mar',
    estado: 'En revisión'
  },
  {
    id: 2,
    folio: '#SD-2026-0011',
    fecha: '11/09/2026',
    ciudadano: 'Juan Pérez',
    tipo: 'Aseo y limpieza',
    descripcion: 'Retiro de escombros en pasaje 5',
    estado: 'En proceso'
  },
  {
    id: 3,
    folio: '#SD-2026-0010',
    fecha: '02/09/2026',
    ciudadano: 'Daniel Carvajal',
    tipo: 'Áreas verdes',
    descripcion: 'Poda de árboles en plaza',
    estado: 'Resuelto'
  }
]
