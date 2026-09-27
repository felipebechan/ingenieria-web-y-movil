import './EstadoBadge.css'

// el color cambia segun el estado de la solicitud
function EstadoBadge({ estado }) {
  let clase = 'estado'
  if (estado === 'En revisión') clase += ' estado-revision'
  else if (estado === 'En proceso') clase += ' estado-proceso'
  else if (estado === 'Resuelto') clase += ' estado-resuelto'
  else if (estado === 'Rechazado') clase += ' estado-rechazado'
  else clase += ' estado-resuelto'

  return <span className={clase}>{estado}</span>
}

export default EstadoBadge
