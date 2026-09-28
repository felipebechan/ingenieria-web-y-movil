import { IonIcon } from '@ionic/react'
import { notificationsOutline } from 'ionicons/icons'
import './Campana.css'

function Campana({ cantidad }) {
  return (
    <button className="campana" title="Las notificaciones llegan en la próxima entrega">
      <IonIcon icon={notificationsOutline} />
      {cantidad > 0 && <span className="badge-chico">{cantidad}</span>}
    </button>
  )
}

export default Campana
