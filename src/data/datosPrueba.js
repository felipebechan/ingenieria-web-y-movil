import { notifications } from 'ionicons/icons'

// Datos de prueba idénticos a los prototipos de Figma

export const usuario = {
  nombre: 'Juan López',
  notificaciones: 3,
}

// 3 tarjetas superiores de la pantalla Inicio (idénticas a Figma)
export const opcionesInicio = [
  {
    id: 1,
    titulo: 'Nueva solicitud',
    texto: 'Ingresa un reclamo,\nsolicitud o sugerencia',
    icono: notifications,
    ruta: '/ingreso-reclamo',
  },
  {
    id: 2,
    titulo: 'Nueva solicitud',
    texto: 'Ingresa un reclamo,\nsolicitud o sugerencia',
    icono: notifications,
    ruta: '/ingreso-reclamo',
  },
  {
    id: 3,
    titulo: 'Nueva solicitud',
    texto: 'Ingresa un reclamo,\nsolicitud o sugerencia',
    icono: notifications,
    ruta: '/ingreso-reclamo',
  },
]

// Solicitudes recientes para la pantalla Inicio (idénticas a Figma)
export const solicitudes = [
  {
    id: 1,
    folio: '#AAABBB123',
    fecha: '13/09/2026',
    tipo: 'Alumbrado',
    descripcion: 'Foco apagado ...',
    descripcionMovil: 'Foco apagado en Av....',
    estado: 'En revisión',
    estadoMovil: 'Resuelto'
  },
  {
    id: 2,
    folio: '#AAABBB123',
    fecha: '13/09/2026',
    tipo: 'Alumbrado',
    descripcion: 'Foco apagado ...',
    descripcionMovil: 'Foco apagado en Av....',
    estado: 'En revisión',
    estadoMovil: 'Resuelto'
  },
  {
    id: 3,
    folio: '#AAABBB123',
    fecha: '13/09/2026',
    tipo: 'Alumbrado',
    descripcion: 'Foco apagado ...',
    descripcionMovil: 'Foco apagado en Av....',
    estado: 'En revisión',
    estadoMovil: 'Resuelto'
  },
]

export const misSolicitudes = [
  { id: 1, folio: '#AAABBB123', fecha: '13/09/2026', tipo: 'Reclamo', descripcion: 'Reclamo ...', estado: 'En revisión' },
  { id: 2, folio: '#AAABBB123', fecha: '13/09/2026', tipo: 'Acceso', descripcion: 'Solicitud acceso ...', estado: 'En revisión' },
  { id: 3, folio: '#AAABBB123', fecha: '13/09/2026', tipo: 'Agradecimiento', descripcion: 'Agradecimiento ...', estado: 'En revisión' },
  { id: 4, folio: '#AAABBB123', fecha: '13/09/2026', tipo: 'Permisos', descripcion: 'Permisos...', estado: 'En revisión' },
  { id: 5, folio: '#AAABBB123', fecha: '13/09/2026', tipo: 'Beneficio', descripcion: 'Beneficio...', estado: 'Resuelto' },
  { id: 6, folio: '#AAABBB123', fecha: '13/09/2026', tipo: 'Permisos', descripcion: 'Permisos...', estado: 'Rechazado' },
]

// Casos exactos visibles en la pantalla de Figma del Administrador
export const solicitudesFigma = [
  {
    id: 1,
    folio: '#AAABBB123',
    fecha: '13/09/2026',
    ciudadano: 'Ana Paula',
    tipo: 'Foco apagado ...',
    tipoMovil: 'Alumbrado',
    estado: 'En revisión'
  },
  {
    id: 2,
    folio: '#AAABBB124',
    fecha: '13/09/2026',
    ciudadano: 'Juan Pérez',
    tipo: 'Foco apagado ...',
    tipoMovil: 'Alumbrado',
    estado: 'En revisión'
  },
  {
    id: 3,
    folio: '#AAABBB125',
    fecha: '13/09/2026',
    ciudadano: 'Daniel carvajal',
    tipo: 'Foco apagado ...',
    tipoMovil: 'Alumbrado',
    estado: 'En revisión'
  }
]
