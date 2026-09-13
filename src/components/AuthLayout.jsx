import { IonPage, IonContent } from '@ionic/react'
import InfoTarjeta from './InfoTarjeta'
import './AuthLayout.css'

// lo que se repite en login y registro, el formulario va como children
function AuthLayout({ children }) {
  return (
    <IonPage>
      <IonContent>
        <div className="auth-page">
          <div className="barra"></div>

          <div className="auth-contenido">
            <header className="header">
              <img className="header-logo" src="/img/logo.png" alt="Municipalidad de Santo Domingo" />
              <div className="header-textos">
                <h1>Santo Domingo:<br />Responde</h1>
                <p>Gestión y seguimiento de<br />solicitudes ciudadanas</p>
              </div>
              <div className="ola"></div>
            </header>

            <div className="ola ola-movil"></div>

            <div className="tarjetas">
              <InfoTarjeta />
              <div className="tarjeta form">{children}</div>
            </div>

            <div className="ola ola-movil ola-abajo"></div>

            <p className="footer">
              © 2026 Municipalidad de Santo Domingo.<br />
              Todos los derechos reservados
            </p>
          </div>

          <div className="barra"></div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default AuthLayout
