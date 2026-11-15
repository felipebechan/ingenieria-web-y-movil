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
import Notificaciones from './pages/Notificaciones'
import DerivarSolicitud from './pages/DerivarSolicitud'
import ResponderSolicitud from './pages/ResponderSolicitud'
import Administracion from './pages/Administracion'
import Perfil from './pages/Perfil'
import Ayuda from './pages/Ayuda'
import RutaProtegida from './routes/RutaProtegida'
import { PerfilProvider } from './context/PerfilContext'

setupIonicReact()

function App() {
  return (
    <PerfilProvider>
      <IonApp>
        <IonReactRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
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
              element={<RutaProtegida rol="ciudadano"><Inicio /></RutaProtegida>}
            />
            <Route
              path="/ingreso-reclamo"
              element={<RutaProtegida rol="ciudadano"><IngresoReclamo /></RutaProtegida>}
            />
            <Route
              path="/mis-solicitudes"
              element={<RutaProtegida rol="ciudadano"><MisSolicitudes /></RutaProtegida>}
            />

            <Route
              path="/solicitud/:id"
              element={<RutaProtegida><DetalleSolicitud /></RutaProtegida>}
            />
            <Route
              path="/notificaciones"
              element={<RutaProtegida><Notificaciones /></RutaProtegida>}
            />

            {/* Rutas protegidas del funcionario */}
            <Route
              path="/revisar-solicitudes"
              element={<RutaProtegida rol="funcionario"><RevisarSolicitudes /></RutaProtegida>}
            />

            {/* Cualquier otra ruta manda al login */}
            <Route
              path="/derivar/:id"
              element={<RutaProtegida rol="funcionario"><DerivarSolicitud /></RutaProtegida>}
            />
            <Route
              path="/responder/:id"
              element={<RutaProtegida rol="funcionario"><ResponderSolicitud /></RutaProtegida>}
            />

            <Route
              path="/administracion"
              element={<RutaProtegida rol="administrador"><Administracion /></RutaProtegida>}
            />

            <Route
              path="/perfil"
              element={<RutaProtegida><Perfil /></RutaProtegida>}
            />
            <Route
              path="/ayuda"
              element={<RutaProtegida><Ayuda /></RutaProtegida>}
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </PerfilProvider>
  )
}

export default App
