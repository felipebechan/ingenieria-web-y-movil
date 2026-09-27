import { IonApp, IonRouterOutlet, IonMenu, IonContent, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Inicio from './pages/Inicio'
import MenuLateral from './components/MenuLateral'
import IngresoReclamo from './pages/ingreso_reclamo'
import MisSolicitudes from './pages/MisSolicitudes'
import RevisarSolicitudes from './pages/RevisarSolicitudes'
import { PerfilProvider } from './context/PerfilContext'

setupIonicReact()

function App() {
  return (
    <PerfilProvider>
      <IonApp>
        <IonReactRouter>
          {/* menu que se abre con el boton de hamburguesa en el celu */}
          <IonMenu contentId="main" type="overlay" swipeGesture={false}>
            <IonContent>
              <MenuLateral />
            </IonContent>
          </IonMenu>

          <IonRouterOutlet id="main">
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/ingreso-reclamo" element={<IngresoReclamo />} />
            <Route path="/mis-solicitudes" element={<MisSolicitudes />} />
            <Route path="/revisar-solicitudes" element={<RevisarSolicitudes />} />
            <Route path="/panel-funcionario" element={<RevisarSolicitudes />} />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </PerfilProvider>
  )
}
export default App