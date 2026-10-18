import { pedir } from './api'

// Las dos devuelven { usuario, token }

export function registrarUsuario(datos) {
  return pedir('/auth/registro', {
    method: 'POST',
    body: JSON.stringify(datos)
  })
}

export function iniciarSesion(correo, password) {
  return pedir('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ correo, password })
  })
}
