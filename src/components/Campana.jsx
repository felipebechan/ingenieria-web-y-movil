import { IonIcon } from '@ionic/react'
import { notificationsOutline } from 'ionicons/icons'
import './Campana.css'

function Campana({ cantidad }) {
  return (
    <button className="campana">
      <IonIcon icon={notificationsOutline} />
      {cantidad > 0 && <span className="badge-chico">{cantidad}</span>}
    </button>
  )
}

export default Campana
