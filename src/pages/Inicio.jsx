import React from 'react'
import { IonIcon, useIonRouter } from '@ionic/react'
import { caretForward } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import OpcionCard from '../components/OpcionCard'
import EstadoBadge from '../components/EstadoBadge'
import { opcionesInicio, solicitudes } from '../data/datosPrueba'
import './Inicio.css'

function Inicio() {
  const router = useIonRouter()

  return (
    <AppLayout>
      {/* Banner de bienvenida idéntico a Figma */}
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
        <img src="/img/playa.png" alt="Costa de Santo Domingo" />
      </section>

      {/* 3 Opciones superiores */}
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

      {/* Sección Mis solicitudes recientes */}
      <section className="recientes">
        {/* Encabezado Desktop */}
        <div className="recientes-header-desktop">
          <h2>Mis solicitudes recientes:</h2>
        </div>

        {/* Encabezado Móvil (con Ver todas → al lado) */}
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

        {/* Tabla para Desktop (idéntica a Figma) */}
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
                <tr key={s.id}>
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

        {/* Tarjetas para Móvil (idénticas a Figma) */}
        <div className="lista-movil">
          {solicitudes.map((s) => (
            <div className="solicitud-card-inicio" key={s.id}>
              <div className="solicitud-card-inicio-izq">
                <span className="folio-inicio-movil">{s.folio}</span>
                <span className="desc-inicio-movil">{s.descripcionMovil}</span>
              </div>
              <div className="solicitud-card-inicio-der">
                <EstadoBadge estado={s.estadoMovil} />
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
