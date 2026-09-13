import { IonIcon } from '@ionic/react'
import { chevronForward, arrowForward } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import OpcionCard from '../components/OpcionCard'
import EstadoBadge from '../components/EstadoBadge'
import { usuario, opcionesInicio, solicitudes } from '../data/datosPrueba'
import './Inicio.css'

function Inicio() {
  // solo el primer nombre para el saludo
  const primerNombre = usuario.nombre.split(' ')[0]

  return (
    <AppLayout>
      <section className="bienvenida">
        <div className="bienvenida-texto">
          <h2>Hola {primerNombre}, bienvenido a Santo Domingo Responde</h2>
          <p>Gestiona tus solicitudes, revisa su estado y mantente informado sobre cada avance desde un solo lugar.</p>
          <div className="bienvenida-links">
            <a href="#">Ingresa nuevos reclamos</a>
            <span>|</span>
            <a href="#">Consulta el estado de tus trámites</a>
            <span>|</span>
            <a href="#">Recibe notificaciones de avance</a>
          </div>
        </div>
        <img src="/img/playa.png" alt="Costa de Santo Domingo" />
      </section>

      <section className="opciones">
        {opcionesInicio.map((opcion) => (
          <OpcionCard
            key={opcion.titulo}
            titulo={opcion.titulo}
            texto={opcion.texto}
            icono={opcion.icono}
            color={opcion.color}
            badge={opcion.badge}
          />
        ))}
      </section>

      <section className="recientes">
        <div className="recientes-top">
          <h2>Mis solicitudes recientes</h2>
          <a href="#">Ver todas <IonIcon icon={arrowForward} /></a>
        </div>

        {/* tabla para desktop */}
        <div className="tabla-caja">
          <table className="tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.folio}>
                  <td>{s.folio}</td>
                  <td>{s.fecha}</td>
                  <td>{s.tipo}</td>
                  <td>{s.descripcion}</td>
                  <td><EstadoBadge estado={s.estado} /></td>
                  <td><IonIcon icon={chevronForward} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* en el celu la tabla no cabe asi que van tarjetas */}
        <div className="lista-movil">
          {solicitudes.map((s) => (
            <div className="solicitud-card" key={s.folio}>
              <div className="solicitud-card-top">
                <span className="folio">{s.folio}</span>
                <EstadoBadge estado={s.estado} />
              </div>
              <p className="solicitud-desc">{s.descripcion}</p>
              <p className="solicitud-info">{s.tipo} · {s.fecha}</p>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}

export default Inicio
