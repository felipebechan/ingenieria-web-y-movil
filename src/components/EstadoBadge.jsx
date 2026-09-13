import './EstadoBadge.css'

// el color cambia segun el estado de la solicitud
function EstadoBadge({ estado }) {
  let clase = 'estado estado-resuelto'
  if (estado === 'En revisión') clase = 'estado estado-revision'
  if (estado === 'En proceso') clase = 'estado estado-proceso'

  return <span className={clase}>{estado}</span>
}

export default EstadoBadge
