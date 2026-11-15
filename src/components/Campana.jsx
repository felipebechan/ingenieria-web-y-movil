import { IonIcon, useIonRouter } from '@ionic/react'
import { notificationsOutline } from 'ionicons/icons'
import './Campana.css'

function Campana({ cantidad }) {
  const router = useIonRouter()

  return (
    <button
      className="campana"
      title="Notificaciones"
      onClick={() => router.push('/notificaciones')}
    >
      <IonIcon icon={notificationsOutline} />
      {cantidad > 0 && <span className="badge-chico">{cantidad}</span>}
    </button>
  )
}

export default Campana
