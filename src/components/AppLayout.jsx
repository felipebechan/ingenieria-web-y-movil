import React from 'react'
import { IonPage, IonContent, IonIcon, IonMenuButton, useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import { personOutline, chevronDown } from 'ionicons/icons'
import MenuLateral from './MenuLateral'
import Campana from './Campana'
import './AppLayout.css'

function AppLayout({ children }) {
  const router = useIonRouter()
  const location = useLocation()

  // Es admin solo si se encuentra en la pantalla de revisión de solicitudes del administrador
  // Por default, cualquier otra ruta es la pantalla del usuario (Juan López)
  const esAdmin =
    location.pathname === '/revisar-solicitudes' ||
    location.pathname === '/panel-funcionario'

  // Al hacer clic en el perfil, cambia entre usuario (Juan López) y administrador
  const cambiarModo = () => {
    if (esAdmin) {
      router.push('/mis-solicitudes')
    } else {
      router.push('/revisar-solicitudes')
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className="app-page">
          <div className="app-barra"></div>

          {/* Header azul que sale en el celu */}
          <div className="header-movil">
            <IonMenuButton autoHide={false} />
            <p>
              {esAdmin ? (
                <>Panel de<br />Gestion</>
              ) : (
                <>Santo Domingo:<br />Responde</>
              )}
            </p>
            <Campana cantidad={3} />
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
                      <h1>Panel de Gestion<br />Municipal</h1>
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
                  <Campana cantidad={3} />
                  
                  {/* Clic en el usuario permite alternar entre perfil usuario (Juan López) y administrador */}
                  <div
                    className="usuario"
                    onClick={cambiarModo}
                    style={{ cursor: 'pointer' }}
                    title={`Click para cambiar a perfil ${esAdmin ? 'Usuario (Juan López)' : 'Administrador'}`}
                  >
                    <div className="avatar">
                      <IonIcon icon={personOutline} />
                    </div>
                    <span>{esAdmin ? 'Administrador' : 'Juan López'}</span>
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
