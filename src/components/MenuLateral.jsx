import { IonIcon, useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import {
  homeOutline,
  documentTextOutline,
  createOutline,
  notificationsOutline,
  personOutline,
  helpCircleOutline,
  logOutOutline
} from 'ionicons/icons'
import { usePerfil } from '../context/PerfilContext'
import { usuario } from '../data/datosPrueba'
import './MenuLateral.css'

function MenuLateral() {
  const router = useIonRouter()
  const location = useLocation()
  const { esAdmin, cerrarSesion } = usePerfil()

  // Las opciones sin ruta son pantallas que quedan para la proxima entrega
  const opciones = esAdmin
    ? [
        { nombre: 'Inicio', icono: homeOutline, ruta: '/revisar-solicitudes' },
        { nombre: 'Revisar solicitudes', icono: documentTextOutline, ruta: '/revisar-solicitudes' },
        { nombre: 'Notificaciones', icono: notificationsOutline, badge: usuario.notificaciones },
        { nombre: 'Mi perfil', icono: personOutline },
        { nombre: 'Cerrar sesión', icono: logOutOutline, accion: 'salir' },
      ]
    : [
        { nombre: 'Inicio', icono: homeOutline, ruta: '/inicio' },
        { nombre: 'Mis solicitudes', icono: documentTextOutline, ruta: '/mis-solicitudes' },
        { nombre: 'Nueva solicitud', icono: createOutline, ruta: '/ingreso-reclamo' },
        { nombre: 'Notificaciones', icono: notificationsOutline, badge: usuario.notificaciones },
        { nombre: 'Mi perfil', icono: personOutline },
        { nombre: 'Ayuda', icono: helpCircleOutline },
        { nombre: 'Cerrar sesión', icono: logOutOutline, accion: 'salir' },
      ]

  const irA = (opcion) => {
    // cierra el menu del celular (en desktop no hace nada)
    const menu = document.querySelector('ion-menu')
    if (menu) menu.close()

    if (opcion.accion === 'salir') {
      cerrarSesion()
      // recargamos para limpiar los formularios y las pantallas que ionic deja montadas
      window.location.href = import.meta.env.BASE_URL + 'login'
      return
    }

    if (opcion.ruta) {
      router.push(opcion.ruta)
    }
  }

  return (
    <nav className="menu-lateral">
      <img className="menu-logo" src={import.meta.env.BASE_URL + "img/logo.png"} alt="Municipalidad de Santo Domingo" />

      {opciones.map((opcion) => {
        const estaActivo = location.pathname === opcion.ruta
        const sinPantalla = !opcion.ruta && !opcion.accion

        let clases = 'menu-item'
        if (estaActivo) clases += ' activo'
        if (sinPantalla) clases += ' pendiente'

        return (
          <button
            key={opcion.nombre}
            className={clases}
            onClick={() => irA(opcion)}
            title={sinPantalla ? 'Pantalla planificada para la próxima entrega' : undefined}
          >
            <IonIcon icon={opcion.icono} />
            <span>{opcion.nombre}</span>
            {opcion.badge > 0 && <span className="badge">{opcion.badge}</span>}
          </button>
        )
      })}
    </nav>
  )
}

export default MenuLateral
