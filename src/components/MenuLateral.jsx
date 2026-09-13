import { IonIcon, useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import {
  homeOutline,
  documentTextOutline,
  addCircleOutline,
  notificationsOutline,
  personOutline,
  helpCircleOutline,
} from 'ionicons/icons'
import { usuario } from '../data/datosPrueba'
import './MenuLateral.css'

// las que no tienen ruta es porque todavia no hacemos esa pagina
const opciones = [
  { nombre: 'Inicio', icono: homeOutline, ruta: '/inicio' },
  { nombre: 'Mis solicitudes', icono: documentTextOutline },
  { nombre: 'Nueva solicitud', icono: addCircleOutline },
  { nombre: 'Notificaciones', icono: notificationsOutline, badge: usuario.notificaciones },
  { nombre: 'Mi perfil', icono: personOutline },
  { nombre: 'Ayuda', icono: helpCircleOutline },
]

function MenuLateral() {
  const router = useIonRouter()
  const location = useLocation()

  const irA = (opcion) => {
    // cierra el menu del celu (en desktop no hace nada)
    const menu = document.querySelector('ion-menu')
    if (menu) menu.close()
    if (opcion.ruta) {
      router.push(opcion.ruta)
    }
  }

  return (
    <nav className="menu-lateral">
      <img className="menu-logo" src="/img/logo.png" alt="Municipalidad de Santo Domingo" />

      {opciones.map((opcion) => (
        <button
          key={opcion.nombre}
          className={location.pathname === opcion.ruta ? 'menu-item activo' : 'menu-item'}
          onClick={() => irA(opcion)}
        >
          <IonIcon icon={opcion.icono} />
          <span>{opcion.nombre}</span>
          {opcion.badge > 0 && <span className="badge">{opcion.badge}</span>}
        </button>
      ))}
    </nav>
  )
}

export default MenuLateral
