import { IonIcon } from '@ionic/react'
import { caretForward, notifications } from 'ionicons/icons'
import './OpcionCard.css'

function OpcionCard({ titulo, texto, icono = notifications, onClick }) {
  return (
    <button className="opcion" onClick={onClick}>
      <div className="opcion-icono-figma">
        <IonIcon icon={icono} className="icono-campana-opcion" />
      </div>
      <div className="opcion-texto">
        <h3>{titulo}</h3>
        <p>{texto}</p>
      </div>
      <IonIcon icon={caretForward} className="opcion-flecha" />
    </button>
  )
}

export default OpcionCard
