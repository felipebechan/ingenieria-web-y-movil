import { IonIcon } from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import './OpcionCard.css'

function OpcionCard({ titulo, texto, icono, color, badge, onClick }) {
  return (
    <button className="opcion" onClick={onClick}>
      <div className={'opcion-icono ' + color}>
        <IonIcon icon={icono} />
      </div>
      <div className="opcion-texto">
        <h3>{titulo}</h3>
        <p>{texto}</p>
      </div>
      <IonIcon icon={chevronForward} className="opcion-flecha" />
      {badge > 0 && <span className="badge-opcion">{badge}</span>}
    </button>
  )
}

export default OpcionCard
