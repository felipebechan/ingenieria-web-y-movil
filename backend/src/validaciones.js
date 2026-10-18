// Todo lo que llega del frontend se valida aca antes de tocar la base de datos.
// PENDIENTE (Vicente): formato de correo, RUT con digito verificador y largo minimo
// de la contraseña. Revisa tareas-equipo/vicente/instrucciones.txt

export function validarRegistro(datos) {
  const errores = []

  if (!datos.nombre) errores.push('El nombre es obligatorio')
  if (!datos.correo) errores.push('El correo es obligatorio')
  if (!datos.rut) errores.push('El RUT es obligatorio')
  if (!datos.password) errores.push('La contraseña es obligatoria')

  return errores
}

export function validarLogin(datos) {
  const errores = []

  if (!datos.correo) errores.push('El correo es obligatorio')
  if (!datos.password) errores.push('La contraseña es obligatoria')

  return errores
}

export function validarSolicitud(datos) {
  const errores = []

  if (!datos.tipo) errores.push('El tipo de solicitud es obligatorio')
  if (!datos.descripcion) errores.push('La descripción es obligatoria')

  return errores
}
