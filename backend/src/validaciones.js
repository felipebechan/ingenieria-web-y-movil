// Todo lo que llega del frontend se valida aca antes de tocar la base de datos.

const TIPOS_SOLICITUD = ['Alumbrado', 'Aseo y limpieza', 'Vialidad']

const correoValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)

// Valida formato 12.345.678-9 y digito verificador con algoritmo modulo 11
function rutValido(valor) {
  if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(valor)) {
    return false
  }

  const limpio = valor.replace(/\./g, '')
  const [numero, dv] = limpio.split('-')

  let suma = 0
  let multiplo = 2
  for (let i = numero.length - 1; i >= 0; i--) {
    suma += Number(numero[i]) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }

  const resto = 11 - (suma % 11)
  let esperado = String(resto)
  if (resto === 11) esperado = '0'
  if (resto === 10) esperado = 'K'

  return esperado === dv.toUpperCase()
}

export function validarRegistro(datos = {}) {
  const errores = []

  if (!datos.nombre) errores.push('El nombre es obligatorio')

  if (!datos.correo) {
    errores.push('El correo es obligatorio')
  } else if (!correoValido(datos.correo)) {
    errores.push('El correo no tiene un formato válido')
  }

  if (!datos.rut) {
    errores.push('El RUT es obligatorio')
  } else if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(datos.rut)) {
    errores.push('El RUT debe tener el formato 12.345.678-9')
  } else if (!rutValido(datos.rut)) {
    errores.push('El RUT no es válido')
  }

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

  if (!datos.tipo) {
    errores.push('El tipo de solicitud es obligatorio')
  } else if (!TIPOS_SOLICITUD.includes(datos.tipo)) {
    errores.push('El tipo de solicitud debe ser: Alumbrado, Aseo y limpieza o Vialidad')
  }

  if (!datos.descripcion) {
    errores.push('La descripción es obligatoria')
  } else if (datos.descripcion.trim().length < 10 || datos.descripcion.length > 500) {
    errores.push('La descripción debe tener entre 10 y 500 caracteres')
  }

  return errores
}
