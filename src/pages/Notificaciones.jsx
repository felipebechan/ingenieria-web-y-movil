import { useState } from 'react'
import { IonIcon, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import { notificationsOutline, chevronForward } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { obtenerNotificaciones, marcarNotificacionLeida } from '../services/notificacionesService'
import './Notificaciones.css'

function Notificaciones() {
  const router = useIonRouter()
  const [notificaciones, setNotificaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      setCargando(true)
      const datos = await obtenerNotificaciones()
      setNotificaciones(datos)
      setError('')
    } catch (problema) {
      setError(problema.message)
    } finally {
      setCargando(false)
    }
  }

  useIonViewWillEnter(() => {
    cargar()
  })

  const clickNotificacion = async (notificacion) => {
    try {
      if (!notificacion.leida) {
        await marcarNotificacionLeida(notificacion.id)
      }
    } catch {
      // si falla marcar en el backend, igual permitimos ir al detalle
    }
    router.push(`/solicitud/${notificacion.solicitud_id}`)
  }

  return (
    <AppLayout>
      <div className="notificaciones-seccion">
        <h1 className="notificaciones-titulo">Notificaciones</h1>
        <p className="notificaciones-bajada">
          Actualizaciones y movimientos en tus solicitudes
        </p>

        {error && <p className="mensaje-error">{error}</p>}

        {cargando ? (
          <p className="notificaciones-mensaje-estado">Cargando notificaciones...</p>
        ) : notificaciones.length === 0 ? (
          <div className="notificaciones-vacio-card">
            <IonIcon icon={notificationsOutline} className="icono-sin-notificaciones" />
            <p>No tienes notificaciones en este momento.</p>
          </div>
        ) : (
          <div className="notificaciones-lista">
            {notificaciones.map((notif) => (
              <div
                key={notif.id}
                className={`notificacion-item ${!notif.leida ? 'no-leida' : 'leida'}`}
                onClick={() => clickNotificacion(notif)}
              >
                <div className="notificacion-cabecera">
                  <div className="notificacion-folio-wrapper">
                    {!notif.leida && <span className="punto-no-leido" title="No leída"></span>}
                    <span className="notificacion-folio">{notif.folio}</span>
                    {notif.tipo && <span className="notificacion-tipo">· {notif.tipo}</span>}
                  </div>
                  <span className="notificacion-fecha">{notif.fechaFormateada}</span>
                </div>

                <div className="notificacion-cuerpo">
                  <div className="notificacion-estado">
                    <span className="notificacion-estado-label">Nuevo estado:</span>
                    <EstadoBadge estado={notif.estado} />
                  </div>
                  {notif.comentario && (
                    <p className="notificacion-comentario">{notif.comentario}</p>
                  )}
                </div>

                <div className="notificacion-pie">
                  <span className="notificacion-accion">
                    Ver detalle de la solicitud
                    <IonIcon icon={chevronForward} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default Notificaciones
