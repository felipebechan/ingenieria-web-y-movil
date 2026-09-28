import React from 'react'
import { useState } from 'react'
import { IonIcon, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import { caretForward } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import OpcionCard from '../components/OpcionCard'
import EstadoBadge from '../components/EstadoBadge'
import { opcionesInicio } from '../data/datosPrueba'
import { obtenerSolicitudesRecientes } from '../services/solicitudesService'
import './Inicio.css'

function Inicio() {
  const router = useIonRouter()
  const [solicitudes, setSolicitudes] = useState(obtenerSolicitudesRecientes())

  useIonViewWillEnter(() => setSolicitudes(obtenerSolicitudesRecientes()))

  return (
    <AppLayout>
      {/* Banner de bienvenida */}
      <section className="bienvenida">
        <div className="bienvenida-texto">
          <h2>Bienvenido a Santo Domingo Responde</h2>
          <p>
            Gestiona tus solicitudes, revisa su estado y mantente informado sobre cada avance desde un solo lugar.
          </p>
          <div className="bienvenida-links">
            <a href="#" onClick={(e) => { e.preventDefault(); router.push('/ingreso-reclamo'); }}>
              Ingresa nuevos reclamos
            </a>
            <span>|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); router.push('/mis-solicitudes'); }}>
              Consulta el estado de tus trámites
            </a>
            <span>|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); }}>
              Recibe notificaciones de avance
            </a>
          </div>
        </div>
        <img src={import.meta.env.BASE_URL + "img/playa.png"} alt="Costa de Santo Domingo" />
      </section>

      {/* accesos rapidos */}
      <section className="opciones">
        {opcionesInicio.map((opcion) => (
          <OpcionCard
            key={opcion.id}
            titulo={opcion.titulo}
            texto={opcion.texto}
            icono={opcion.icono}
            onClick={() => opcion.ruta && router.push(opcion.ruta)}
          />
        ))}
      </section>

      {/* ultimas solicitudes del vecino */}
      <section className="recientes">
        {/* encabezado desktop */}
        <div className="recientes-header-desktop">
          <h2>Mis solicitudes recientes:</h2>
        </div>

        {/* encabezado movil, con el Ver todas al lado */}
        <div className="recientes-header-movil">
          <h2>
            Mis solicitudes recientes:{' '}
            <a
              href="#"
              className="ver-todas-link-movil"
              onClick={(e) => {
                e.preventDefault()
                router.push('/mis-solicitudes')
              }}
            >
              Ver todas →
            </a>
          </h2>
        </div>

        {/* tabla para desktop */}
        <div className="tabla-caja">
          <table className="tabla">
            <thead>
              <tr>
                <th># Folio</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id} className="fila-clickeable" onClick={() => router.push(`/solicitud/${s.id}`)}>
                  <td className="td-inicio-folio">{s.folio}</td>
                  <td className="td-inicio-fecha">{s.fecha}</td>
                  <td className="td-inicio-tipo">{s.tipo}</td>
                  <td className="td-inicio-desc">{s.descripcion}</td>
                  <td className="td-inicio-estado">
                    <EstadoBadge estado={s.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* en el celular la tabla no cabe, van tarjetas */}
        <div className="lista-movil">
          {solicitudes.map((s) => (
            <div
              className="solicitud-card-inicio"
              key={s.id}
              onClick={() => router.push(`/solicitud/${s.id}`)}
            >
              <div className="solicitud-card-inicio-izq">
                <span className="folio-inicio-movil">{s.folio}</span>
                <span className="desc-inicio-movil">{s.descripcionMovil}</span>
              </div>
              <div className="solicitud-card-inicio-der">
                <EstadoBadge estado={s.estado} />
                <IonIcon icon={caretForward} className="flecha-card-movil" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}

export default Inicio
