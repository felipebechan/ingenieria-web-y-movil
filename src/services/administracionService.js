import { pedir } from './api'

// Todo esto es solo para el rol administrador

export function obtenerUsuarios() {
  return pedir('/admin/usuarios')
}

export function cambiarRolUsuario(id, rol) {
  return pedir(`/admin/usuarios/${id}/rol`, {
    method: 'PATCH',
    body: JSON.stringify({ rol })
  })
}

export function obtenerMetricas() {
  return pedir('/admin/metricas')
}
