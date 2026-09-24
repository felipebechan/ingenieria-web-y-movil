import { IonApp, IonRouterOutlet, IonMenu, IonContent, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Inicio from './pages/Inicio'
import MenuLateral from './components/MenuLateral'
import IngresoReclamo from './pages/ingreso_reclamo'

setupIonicReact()

function App() {
  return (
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
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
export default App