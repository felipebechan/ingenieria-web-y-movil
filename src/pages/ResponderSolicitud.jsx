import { useState } from 'react'
import { IonIcon, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import { useParams } from 'react-router-dom'
import { documentTextOutline, timeOutline, mailOutline } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { obtenerSolicitudPorId, obtenerHistorial, responderSolicitud } from '../services/solicitudesService'
import './GestionSolicitud.css'

function ResponderSolicitud() {
  const { id } = useParams()
  const router = useIonRouter()

  const [solicitud, setSolicitud] = useState(null)
  const [movimientos, setMovimientos] = useState([])
  const [respuesta, setRespuesta] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const cargar = async () => {
    try {
      setSolicitud(await obtenerSolicitudPorId(id))
      setMovimientos(await obtenerHistorial(id))
      setError('')
    } catch (problema) {
      setError(problema.message)
    }
  }

  useIonViewWillEnter(() => { cargar() })

  const fechaCorta = (fecha) => {
    const f = new Date(fecha)
    const dia = String(f.getDate()).padStart(2, '0')
    const mes = String(f.getMonth() + 1).padStart(2, '0')
    return `${dia}/${mes}/${f.getFullYear()}`
  }

  const enviar = async () => {
    if (respuesta.trim().length < 20) {
      setError('La respuesta tiene que tener al menos 20 caracteres')
      return
    }

    setError('')
    setCargando(true)

    try {
      await responderSolicitud(id, respuesta)
      router.push(`/solicitud/${id}`)
    } catch (problema) {
      setError(problema.message)
    } finally {
      setCargando(false)
    }
  }

  if (!solicitud) {
    return (
      <AppLayout>
        <div className="gestion-seccion">
          <h1 className="gestion-titulo">Responder solicitud</h1>
          <p>{error || 'Cargando...'}</p>
          <button className="volver-link" onClick={() => router.push('/revisar-solicitudes')}>
            Volver a revisar solicitudes
          </button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="gestion-seccion">
        <h1 className="gestion-titulo">Responder solicitud</h1>
        <p className="gestion-bajada">Revisa el historial y registra la respuesta que recibirá el ciudadano.</p>

        <div className="gestion-tarjetas tres">
          <div className="gestion-card">
            <h2><IonIcon icon={documentTextOutline} /> Información de la solicitud</h2>

            <div className="fila-dato"><span>Folio</span><strong>{solicitud.folio}</strong></div>
            <div className="fila-dato"><span>Ciudadano</span><strong>{solicitud.ciudadano}</strong></div>
            <div className="fila-dato"><span>Tipo</span><strong>{solicitud.tipo}</strong></div>
            <div className="fila-dato">
              <span>Unidad responsable</span>
              <strong>{solicitud.unidad || 'Sin derivar'}</strong>
            </div>
            <div className="fila-dato"><span>Fecha de ingreso</span><strong>{solicitud.fecha}</strong></div>
            <div className="fila-dato">
              <span>Estado actual</span>
              <EstadoBadge estado={solicitud.estado} />
            </div>
            <div className="fila-dato"><span>Dirección</span><strong>{solicitud.direccion}</strong></div>
          </div>

          <div className="gestion-card">
            <h2><IonIcon icon={timeOutline} /> Historial de seguimiento</h2>

            <ul className="linea-vertical">
              <li className="hito hecho">
                <span className="punto-hito"></span>
                <span className="hito-nombre">Solicitud ingresada</span>
                <span className="hito-fecha">{solicitud.fecha}</span>
              </li>

              {movimientos.map((movimiento) => (
                <li className="hito hecho" key={movimiento.id}>
                  <span className="punto-hito"></span>
                  <span className="hito-nombre">{movimiento.estado}</span>
                  <span className="hito-fecha">{fechaCorta(movimiento.registrado_en)}</span>
                  {movimiento.comentario && (
                    <span className="hito-comentario">{movimiento.comentario}</span>
                  )}
                </li>
              ))}

              <li className="hito">
                <span className="punto-hito"></span>
                <span className="hito-nombre">Respuesta emitida</span>
                <span className="hito-fecha">Pendiente</span>
              </li>
            </ul>
          </div>

          <div className="gestion-card">
            <h2><IonIcon icon={mailOutline} /> Respuesta al ciudadano</h2>

            <label className="campo-label" htmlFor="respuesta">Respuesta formal *</label>
            <textarea
              id="respuesta"
              className="campo-area alta"
              placeholder="Escribe la respuesta que será enviada al ciudadano..."
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
            <p className="campo-ayuda">La respuesta quedará registrada en el historial de la solicitud.</p>

            {error && <p className="mensaje-error">{error}</p>}

            <div className="gestion-botones">
              <button className="boton-azul" onClick={enviar} disabled={cargando}>
                {cargando ? 'Enviando...' : 'Enviar respuesta'}
              </button>
              <button className="boton-gris" onClick={() => router.push(`/solicitud/${id}`)}>
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default ResponderSolicitud
