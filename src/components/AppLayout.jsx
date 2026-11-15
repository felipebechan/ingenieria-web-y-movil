import { useState, useEffect } from 'react'
import { IonPage, IonContent, IonIcon, IonMenuButton } from '@ionic/react'
import { personOutline, chevronDown } from 'ionicons/icons'
import MenuLateral from './MenuLateral'
import Campana from './Campana'
import { usePerfil } from '../context/PerfilContext'
import { obtenerContadorNotificaciones } from '../services/notificacionesService'
import './AppLayout.css'

// Layout de las pantallas con sesion iniciada (menu, header y footer)
function AppLayout({ children }) {
  // El rol viene de la sesion, no de la ruta
  const { esAdmin, nombre } = usePerfil()
  const nombreUsuario = nombre || (esAdmin ? 'Administrador' : 'Vecino')
  const [cantidadNotificaciones, setCantidadNotificaciones] = useState(0)

  useEffect(() => {
    let montado = true
    const cargarContador = async () => {
      try {
        const respuesta = await obtenerContadorNotificaciones()
        if (montado && respuesta && typeof respuesta.sinLeer === 'number') {
          setCantidadNotificaciones(respuesta.sinLeer)
        }
      } catch {
        // si falla la peticion dejamos el contador en 0
      }
    }
    cargarContador()
    return () => {
      montado = false
    }
  }, [])

  return (
    <IonPage>
      <IonContent>
        <div className="app-page">
          <div className="app-barra"></div>

          {/* Header azul que sale en el celular */}
          <div className="header-movil">
            <IonMenuButton autoHide={false} />
            <p>
              {esAdmin ? (
                <>Panel de<br />Gestión</>
              ) : (
                <>Santo Domingo:<br />Responde</>
              )}
            </p>
            <Campana cantidad={cantidadNotificaciones} />
          </div>
          <div className="app-ola ola-movil-app"></div>

          <div className="app-cuerpo">
            <aside className="sidebar">
              <MenuLateral />
            </aside>

            <main className="app-main">
              <header className="app-header">
                <div className="app-titulos">
                  {esAdmin ? (
                    <>
                      <h1>Panel de Gestión<br />Municipal</h1>
                      <p>Gestión y seguimiento de<br />solicitudes ciudadanas</p>
                    </>
                  ) : (
                    <>
                      <h1>Santo Domingo:<br />Responde</h1>
                      <p>Gestión y seguimiento de<br />solicitudes ciudadanas</p>
                    </>
                  )}
                </div>
                <div className="app-ola"></div>

                <div className="header-acciones">
                  <Campana cantidad={cantidadNotificaciones} />
                  
                  <div className="usuario">
                    <div className="avatar">
                      <IonIcon icon={personOutline} />
                    </div>
                    <span>{nombreUsuario}</span>
                    <IonIcon icon={chevronDown} className="flechita" />
                  </div>
                </div>
              </header>

              {children}
            </main>
          </div>

          <footer className="app-footer">
            © 2026 Municipalidad de Santo Domingo.<br />
            Todos los derechos reservados
          </footer>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default AppLayout
