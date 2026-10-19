const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function token() {
  return localStorage.getItem('token')
}

// Todas las llamadas al backend pasan por aca: arma la URL, manda el token
// y deja los errores listos para mostrarlos en pantalla.
export async function pedir(ruta, opciones = {}) {
  const respuesta = await fetch(API + ruta, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...opciones.headers
    }
  })

  const datos = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new Error((datos && datos.error) || 'No se pudo conectar con el servidor')
  }

  return datos
}
