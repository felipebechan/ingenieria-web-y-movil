import './SemaforoPlazo.css'

// Avisa cuanto le queda a una solicitud del plazo de respuesta comprometido.
// Los colores los decide el backend: verde con mas de 10 dias habiles,
// amarillo entre 5 y 10, rojo con menos de 5, y vencido cuando se paso.

const TEXTOS = {
  verde: (dias) => `${dias} días`,
  amarillo: (dias) => `${dias} días`,
  rojo: (dias) => (dias === 1 ? 'queda 1 día' : `quedan ${dias} días`),
  vencido: (dias) => `vencido hace ${Math.abs(dias)}`
}

function SemaforoPlazo({ dias, color }) {
  // una solicitud cerrada ya no corre plazo
  if (!color) {
    return <span className="plazo-cerrado">—</span>
  }

  return (
    <span className={`plazo plazo-${color}`} title="Plazo de respuesta comprometido, en días hábiles">
      {TEXTOS[color](dias)}
    </span>
  )
}

export default SemaforoPlazo
