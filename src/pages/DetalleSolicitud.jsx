import { useState } from 'react'
import { IonIcon, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import { useParams } from 'react-router-dom'
import {
  documentTextOutline,
  timeOutline,
  pricetagOutline,
  locationOutline,
  calendarOutline,
  gitBranchOutline,
  mailOutline,
} from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { obtenerSolicitudPorId, obtenerHistorial } from '../services/solicitudesService'
import { usePerfil } from '../context/PerfilContext'
import './DetalleSolicitud.css'

// Los pasos del seguimiento dependen de como termino la solicitud, porque
// una rechazada no pasa por los mismos que una que se resolvio
const PASOS = ['Solicitud ingresada', 'En revisión', 'Derivada a unidad', 'Respuesta unidad', 'Resuelto']

function seguimiento(estado) {
  if (estado === 'Rechazado') {
    return { pasos: ['Solicitud ingresada', 'En revisión', 'Rechazado'], avance: 3 }
  }
  if (estado === 'Resuelto') return { pasos: PASOS, avance: 5 }
  if (estado === 'En proceso') return { pasos: PASOS, avance: 3 }
  return { pasos: PASOS, avance: 2 }
}

function DetalleSolicitud() {
  const { id } = useParams()
  const router = useIonRouter()
  const { esAdmin } = usePerfil()

  // el funcionario vuelve a su bandeja y el vecino a sus solicitudes
  const rutaVolver = esAdmin ? '/revisar-solicitudes' : '/mis-solicitudes'
  const textoVolver = esAdmin ? 'Volver a revisar solicitudes' : 'Volver a mis solicitudes'

  const [solicitud, setSolicitud] = useState(null)
  const [movimientos, setMovimientos] = useState([])
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      setSolicitud(await obtenerSolicitudPorId(id))
      setMovimientos(await obtenerHistorial(id))
      setError('')
    } catch (problema) {
      setError(problema.message)
    }
  }

  // el backend guarda la fecha completa y aca solo mostramos el dia y la hora
  const momento = (fecha) => {
    const f = new Date(fecha)
    const dia = String(f.getDate()).padStart(2, '0')
    const mes = String(f.getMonth() + 1).padStart(2, '0')
    const hora = String(f.getHours()).padStart(2, '0')
    const minutos = String(f.getMinutes()).padStart(2, '0')
    return `${dia}/${mes}/${f.getFullYear()} a las ${hora}:${minutos}`
  }

  useIonViewWillEnter(() => { cargar() })

  if (!solicitud) {
    return (
      <AppLayout>
        <div className="detalle-seccion">
          <h1 className="detalle-titulo">Detalle de solicitud</h1>
          <p>{error || 'Cargando...'}</p>
          <button className="volver-link" onClick={() => router.push(rutaVolver)}>
            {textoVolver}
          </button>
        </div>
      </AppLayout>
    )
  }

  const { pasos, avance } = seguimiento(solicitud.estado)
  const fueRechazada = solicitud.estado === 'Rechazado'

  return (
    <AppLayout>
      <div className="detalle-seccion">
        <h1 className="detalle-titulo">Detalle de solicitud</h1>
        <p className="detalle-bajada">Revisa la información y el seguimiento de tu solicitud</p>

        <div className="detalle-tarjetas">
          <div className="detalle-card">
            <h2><IonIcon icon={documentTextOutline} /> Información de la solicitud</h2>

            <div className="dato">
              <IonIcon icon={documentTextOutline} />
              <div>
                <span className="dato-titulo">Folio</span>
                <span className="dato-valor">{solicitud.folio}</span>
              </div>
            </div>

            <div className="dato">
              <IonIcon icon={timeOutline} />
              <div>
                <span className="dato-titulo">Estado</span>
                <EstadoBadge estado={solicitud.estado} />
              </div>
            </div>

            <div className="dato">
              <IonIcon icon={pricetagOutline} />
              <div>
                <span className="dato-titulo">Tipo</span>
                <span className="dato-valor">{solicitud.tipo}</span>
              </div>
            </div>

            <div className="dato">
              <IonIcon icon={calendarOutline} />
              <div>
                <span className="dato-titulo">Fecha de ingreso</span>
                <span className="dato-valor">{solicitud.fecha}</span>
              </div>
            </div>

            <div className="dato">
              <IonIcon icon={locationOutline} />
              <div>
                <span className="dato-titulo">Ubicación</span>
                <span className="dato-valor">{solicitud.ubicacion || 'Av. España 001'}</span>
              </div>
            </div>

            {solicitud.unidad && (
              <div className="dato">
                <IonIcon icon={gitBranchOutline} />
                <div>
                  <span className="dato-titulo">Unidad responsable</span>
                  <span className="dato-valor">{solicitud.unidad}</span>
                </div>
              </div>
            )}
          </div>

          <div className="detalle-card">
            <h2><IonIcon icon={documentTextOutline} /> Descripción</h2>
            <p className="detalle-descripcion">{solicitud.descripcion}</p>
          </div>

          <div className="detalle-card">
            <h2><IonIcon icon={documentTextOutline} /> Evidencia adjunta</h2>
            <p className="detalle-sin-evidencia">
              Esta solicitud no tiene archivos adjuntos. La carga de imágenes queda para la siguiente entrega.
            </p>
          </div>
        </div>

        <div className="detalle-card historial">
          <h2>Historial de seguimiento</h2>
          <ol className="linea-tiempo">
            {pasos.map((paso, i) => {
              let clases = i < avance ? 'paso hecho' : 'paso'
              if (fueRechazada && i === pasos.length - 1) clases += ' rechazado'

              return (
              <li key={paso} className={clases}>
                <span className="punto"></span>
                <span className="paso-nombre">{paso}</span>
              </li>
              )
            })}
          </ol>

          {/* los movimientos de verdad, que el backend guarda cada vez que
              el funcionario cambia el estado */}
          {movimientos.length > 0 ? (
            <ul className="movimientos">
              {movimientos.map((movimiento) => (
                <li key={movimiento.id}>
                  <span className="movimiento-estado">{movimiento.estado}</span>
                  <span className="movimiento-fecha">{momento(movimiento.registrado_en)}</span>
                  {movimiento.comentario && (
                    <span className="movimiento-comentario">{movimiento.comentario}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="sin-movimientos">
              Todavía no hay cambios registrados: la solicitud sigue como se ingresó.
            </p>
          )}
        </div>

        {solicitud.respuesta && (
          <div className="detalle-card respuesta-municipal">
            <h2><IonIcon icon={mailOutline} /> Respuesta de la municipalidad</h2>
            <p className="detalle-descripcion">{solicitud.respuesta}</p>
          </div>
        )}

        {/* el funcionario gestiona la solicitud desde aca, el vecino solo la mira */}
        {esAdmin && solicitud.estado !== 'Resuelto' && solicitud.estado !== 'Rechazado' && (
          <div className="acciones-funcionario">
            <button className="boton-azul" onClick={() => router.push(`/derivar/${solicitud.id}`)}>
              Derivar a una unidad
            </button>
            <button className="boton-azul" onClick={() => router.push(`/responder/${solicitud.id}`)}>
              Responder al ciudadano
            </button>
          </div>
        )}

        <button className="volver-link" onClick={() => router.push(rutaVolver, 'back')}>
          {textoVolver}
        </button>
      </div>
    </AppLayout>
  )
}

export default DetalleSolicitud
