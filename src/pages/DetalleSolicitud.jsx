import { IonIcon, useIonRouter } from '@ionic/react'
import { useParams } from 'react-router-dom'
import {
  documentTextOutline,
  timeOutline,
  pricetagOutline,
  locationOutline,
  calendarOutline,
} from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { obtenerSolicitudPorId } from '../services/solicitudesService'
import './DetalleSolicitud.css'

// Pasos del seguimiento, se van pintando segun el estado de la solicitud
const pasos = ['Solicitud ingresada', 'En revisión', 'Derivada a unidad', 'Respuesta unidad', 'Resuelto']

function pasosCompletados(estado) {
  if (estado === 'Resuelto' || estado === 'Rechazado') return 5
  if (estado === 'En proceso') return 3
  return 2
}

function DetalleSolicitud() {
  const { id } = useParams()
  const router = useIonRouter()
  const solicitud = obtenerSolicitudPorId(id)

  if (!solicitud) {
    return (
      <AppLayout>
        <div className="detalle-seccion">
          <h1 className="detalle-titulo">Detalle de solicitud</h1>
          <p>No encontramos esa solicitud.</p>
          <button className="volver-link" onClick={() => router.push('/mis-solicitudes')}>
            Volver a mis solicitudes
          </button>
        </div>
      </AppLayout>
    )
  }

  const avance = pasosCompletados(solicitud.estado)

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
            {pasos.map((paso, i) => (
              <li key={paso} className={i < avance ? 'paso hecho' : 'paso'}>
                <span className="punto"></span>
                <span className="paso-nombre">{paso}</span>
              </li>
            ))}
          </ol>
        </div>

        <button className="volver-link" onClick={() => router.push('/mis-solicitudes', 'back')}>
          Volver a mis solicitudes
        </button>
      </div>
    </AppLayout>
  )
}

export default DetalleSolicitud
