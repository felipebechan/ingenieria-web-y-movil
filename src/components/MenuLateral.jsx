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
import './MenuLateral.css'

function MenuLateral() {
  const router = useIonRouter()
  const location = useLocation()

  // Por default estamos en la vista de usuario; solo es admin en la ruta de revisión de solicitudes
  const esAdmin =
    location.pathname === '/revisar-solicitudes' ||
    location.pathname === '/panel-funcionario'

  // Opciones exactas según los diseños de Figma
  const opciones = esAdmin
    ? [
        { nombre: 'Inicio', icono: homeOutline, ruta: '/revisar-solicitudes' },
        { nombre: 'Revisar solicitudes', icono: documentTextOutline, ruta: '/revisar-solicitudes' },
        { nombre: 'Revisar reclamo', iconoCustom: '/img/alerta-usuario.svg', ruta: '/ingreso-reclamo' },
        { nombre: 'Notificaciones', icono: notificationsOutline },
        { nombre: 'Mi Perfil', icono: personOutline, accion: 'perfil' },
        { nombre: 'Cerrar Sesión', icono: logOutOutline, ruta: '/login' },
      ]
    : [
        { nombre: 'Inicio', icono: homeOutline, ruta: '/inicio' },
        { nombre: 'Mis solicitudes', icono: documentTextOutline, ruta: '/mis-solicitudes' },
        { nombre: 'Nueva Solicitud', icono: createOutline, ruta: '/ingreso-reclamo' },
        { nombre: 'Ingresar reclamo', iconoCustom: '/img/alerta-usuario.svg', ruta: '/ingreso-reclamo' },
        { nombre: 'Notificaciones', icono: notificationsOutline },
        { nombre: 'Mi Perfil', icono: personOutline, accion: 'perfil' },
        { nombre: 'Ayuda', icono: helpCircleOutline },
        { nombre: 'Cerrar Sesión', icono: logOutOutline, ruta: '/login' },
      ]

  const irA = (opcion) => {
    const menu = document.querySelector('ion-menu')
    if (menu) menu.close()

    if (opcion.accion === 'perfil') {
      if (esAdmin) {
        router.push('/mis-solicitudes')
      } else {
        router.push('/revisar-solicitudes')
      }
      return
    }

    if (opcion.ruta) {
      router.push(opcion.ruta)
    }
  }

  return (
    <nav className="menu-lateral">
      <img className="menu-logo" src="/img/logo.png" alt="Municipalidad de Santo Domingo" />

      {opciones.map((opcion) => {
        const estaActivo = location.pathname === opcion.ruta

        return (
          <button
            key={opcion.nombre}
            className={estaActivo ? 'menu-item activo' : 'menu-item'}
            onClick={() => irA(opcion)}
          >
            {opcion.iconoCustom ? (
              <IonIcon src={opcion.iconoCustom} />
            ) : (
              <IonIcon icon={opcion.icono} />
            )}
            <span>{opcion.nombre}</span>
            {opcion.badge > 0 && <span className="badge">{opcion.badge}</span>}
          </button>
        )
      })}
    </nav>
  )
}

export default MenuLateral
