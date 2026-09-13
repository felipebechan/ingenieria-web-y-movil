import { IonIcon } from '@ionic/react'
import {
  documentAttachOutline,
  cameraOutline,
  searchOutline,
  notificationsOutline,
} from 'ionicons/icons'

const items = [
  { texto: 'Ingresa reclamos y solicitudes.', icono: documentAttachOutline },
  { texto: 'Adjunta fotografías y ubicación.', icono: cameraOutline },
  { texto: 'Revisa el estado de tus trámites.', icono: searchOutline },
  { texto: 'Recibe actualizaciones de avance.', icono: notificationsOutline },
]

// tarjeta de la izquierda del login/registro (no sale en mobile)
function InfoTarjeta() {
  return (
    <div className="tarjeta info">
      <h2>Gestiona tus solicitudes en un solo lugar</h2>

      {items.map((item) => (
        <div className="item" key={item.texto}>
          <div className="item-icono"><IonIcon icon={item.icono} /></div>
          <p>{item.texto}</p>
        </div>
      ))}
    </div>
  )
}

export default InfoTarjeta
