// Todo lo que llega del frontend se valida aca antes de tocar la base de datos.

const correoValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)

export function validarRegistro(datos = {}) {
  const errores = []

  if (!datos.nombre) errores.push('El nombre es obligatorio')

  if (!datos.correo) {
    errores.push('El correo es obligatorio')
  } else if (!correoValido(datos.correo)) {
    errores.push('El correo no tiene un formato válido')
  }

  if (!datos.rut) errores.push('El RUT es obligatorio')

  if (!datos.password) {
    errores.push('La contraseña es obligatoria')
  } else if (datos.password.length < 6) {
    errores.push('La contraseña debe tener al menos 6 caracteres')
  }

  if (datos.telefono && !/^[0-9+ ]+$/.test(datos.telefono)) {
    errores.push('El teléfono solo puede contener números, espacios y el signo +')
  }

  return errores
}

export function validarLogin(datos = {}) {
  const errores = []

  if (!datos.correo) {
    errores.push('El correo es obligatorio')
  } else if (!correoValido(datos.correo)) {
    errores.push('El correo no tiene un formato válido')
  }

  if (!datos.password) errores.push('La contraseña es obligatoria')

  return errores
}

export function validarSolicitud(datos = {}) {
  const errores = []

  if (!datos.tipo) errores.push('El tipo de solicitud es obligatorio')
  if (!datos.descripcion) errores.push('La descripción es obligatoria')

  return errores
}
