import { IonApp, IonRouterOutlet, IonMenu, IonContent, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Inicio from './pages/Inicio'
import MenuLateral from './components/MenuLateral'
import IngresoReclamo from './pages/IngresoReclamo'
import MisSolicitudes from './pages/MisSolicitudes'
import RevisarSolicitudes from './pages/RevisarSolicitudes'
import DetalleSolicitud from './pages/DetalleSolicitud'
import RutaProtegida from './routes/RutaProtegida'
import { PerfilProvider } from './context/PerfilContext'

setupIonicReact()

function App() {
  return (
    <PerfilProvider>
      <IonApp>
        <IonReactRouter>
          {/* menu que se abre con el boton de hamburguesa en el celular */}
          <IonMenu contentId="main" type="overlay" swipeGesture={false}>
            <IonContent>
              <MenuLateral />
            </IonContent>
          </IonMenu>

          <IonRouterOutlet id="main">
            {/* Rutas publicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas del ciudadano */}
            <Route
              path="/inicio"
              element={<RutaProtegida rol="usuario"><Inicio /></RutaProtegida>}
            />
            <Route
              path="/ingreso-reclamo"
              element={<RutaProtegida rol="usuario"><IngresoReclamo /></RutaProtegida>}
            />
            <Route
              path="/mis-solicitudes"
              element={<RutaProtegida rol="usuario"><MisSolicitudes /></RutaProtegida>}
            />

            <Route
              path="/solicitud/:id"
              element={<RutaProtegida><DetalleSolicitud /></RutaProtegida>}
            />

            {/* Rutas protegidas del funcionario */}
            <Route
              path="/revisar-solicitudes"
              element={<RutaProtegida rol="admin"><RevisarSolicitudes /></RutaProtegida>}
            />

            {/* Cualquier otra ruta manda al login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </PerfilProvider>
  )
}

export default App
