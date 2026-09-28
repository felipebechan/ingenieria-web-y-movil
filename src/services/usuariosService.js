// Cuentas creadas desde el registro. Por ahora quedan en localStorage,
// en la EP2 esto pasa a la tabla de usuarios del backend.

const CLAVE = 'usuarios'

function leerUsuarios() {
  const guardados = localStorage.getItem(CLAVE)
  return guardados ? JSON.parse(guardados) : []
}

export function registrarUsuario({ nombre, correo, rut, telefono }) {
  const usuarios = leerUsuarios()

  if (usuarios.some((u) => u.correo === correo)) {
    return { ok: false, mensaje: 'Ya existe una cuenta con ese correo' }
  }

  usuarios.push({ nombre, correo, rut, telefono })
  localStorage.setItem(CLAVE, JSON.stringify(usuarios))
  return { ok: true }
}

export function buscarUsuarioPorCorreo(correo) {
  return leerUsuarios().find((u) => u.correo === correo)
}
