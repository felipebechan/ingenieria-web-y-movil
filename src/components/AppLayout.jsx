import { IonPage, IonContent, IonIcon, IonMenuButton } from '@ionic/react'
import { personOutline, chevronDown } from 'ionicons/icons'
import MenuLateral from './MenuLateral'
import Campana from './Campana'
import { usePerfil } from '../context/PerfilContext'
import { usuario } from '../data/datosPrueba'
import './AppLayout.css'

// Layout de las pantallas con sesion iniciada (menu, header y footer)
function AppLayout({ children }) {
  // El rol viene de la sesion, no de la ruta
  const { esAdmin } = usePerfil()
  const nombreUsuario = esAdmin ? 'Administrador' : usuario.nombre

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
            <Campana cantidad={usuario.notificaciones} />
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
                  <Campana cantidad={usuario.notificaciones} />
                  
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
