import { useState } from 'react'
import { IonIcon, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import { useParams } from 'react-router-dom'
import { documentTextOutline, gitBranchOutline } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { obtenerSolicitudPorId, derivarSolicitud } from '../services/solicitudesService'
import './GestionSolicitud.css'

// Las unidades que atienden los requerimientos en la municipalidad
const UNIDADES = [
  'Dirección de Obras Municipales',
  'Aseo y Ornato',
  'Tránsito',
  'Seguridad Ciudadana'
]

function DerivarSolicitud() {
  const { id } = useParams()
  const router = useIonRouter()

  const [solicitud, setSolicitud] = useState(null)
  const [unidad, setUnidad] = useState('')
  const [observacion, setObservacion] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const cargar = async () => {
    try {
      const datos = await obtenerSolicitudPorId(id)
      setSolicitud(datos)
      setUnidad(datos.unidad || '')
      setError('')
    } catch (problema) {
      setError(problema.message)
    }
  }

  useIonViewWillEnter(() => { cargar() })

  const derivar = async () => {
    if (!unidad) {
      setError('Tienes que seleccionar una unidad')
      return
    }

    setError('')
    setCargando(true)

    try {
      await derivarSolicitud(id, unidad, observacion)
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
          <h1 className="gestion-titulo">Derivar solicitud</h1>
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
        <h1 className="gestion-titulo">Derivar solicitud</h1>
        <p className="gestion-bajada">Revisa los antecedentes y selecciona la unidad municipal responsable.</p>

        <div className="gestion-tarjetas">
          <div className="gestion-card">
            <h2><IonIcon icon={documentTextOutline} /> Información de la solicitud</h2>

            <div className="fila-dato"><span>Folio</span><strong>{solicitud.folio}</strong></div>
            <div className="fila-dato"><span>Ciudadano</span><strong>{solicitud.ciudadano}</strong></div>
            <div className="fila-dato"><span>Tipo</span><strong>{solicitud.tipo}</strong></div>
            <div className="fila-dato"><span>Fecha de ingreso</span><strong>{solicitud.fecha}</strong></div>
            <div className="fila-dato">
              <span>Estado actual</span>
              <EstadoBadge estado={solicitud.estado} />
            </div>
            <div className="fila-dato"><span>Dirección</span><strong>{solicitud.direccion}</strong></div>

            <div className="bloque-descripcion">
              <span>Descripción</span>
              <p>{solicitud.descripcion}</p>
            </div>
          </div>

          <div className="gestion-card">
            <h2><IonIcon icon={gitBranchOutline} /> Derivación</h2>

            <label className="campo-label" htmlFor="unidad">Unidad municipal *</label>
            <select
              id="unidad"
              className="campo-select"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
            >
              <option value="">Selecciona una unidad</option>
              {UNIDADES.map((nombre) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
            </select>

            <label className="campo-label" htmlFor="observacion">Observación interna</label>
            <textarea
              id="observacion"
              className="campo-area"
              placeholder="Escribe una observación para la unidad receptora..."
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
            />

            {error && <p className="mensaje-error">{error}</p>}

            <div className="gestion-botones">
              <button className="boton-azul" onClick={derivar} disabled={cargando}>
                {cargando ? 'Derivando...' : 'Derivar solicitud'}
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

export default DerivarSolicitud
