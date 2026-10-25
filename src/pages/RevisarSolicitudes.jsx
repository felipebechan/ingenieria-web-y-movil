import { useState, useEffect } from 'react'
import { useIonRouter } from '@ionic/react'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { buscarSolicitudesAdmin, cambiarEstadoSolicitud } from '../services/solicitudesService'
import './RevisarSolicitudes.css'

const ESTADOS = ['En revisión', 'En proceso', 'Resuelto', 'Rechazado']

function RevisarSolicitudes() {
  const router = useIonRouter()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  const [solicitudes, setSolicitudes] = useState([])
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      setSolicitudes(await buscarSolicitudesAdmin(busqueda, filtroEstado))
      setError('')
    } catch (problema) {
      setError(problema.message)
    }
  }

  // cada vez que cambia el buscador o el filtro le preguntamos al backend
  useEffect(() => {
    cargar()
  }, [busqueda, filtroEstado])

  const cambiarEstado = async (id, estado) => {
    try {
      await cambiarEstadoSolicitud(id, estado)
      cargar()
    } catch (problema) {
      setError(problema.message)
    }
  }

  return (
    <AppLayout>
      <div className="revisar-solicitudes-seccion">
        <h1 className="revisar-solicitudes-titulo">Revisar solicitudes</h1>

        {/* filtros desktop */}
        <div className="filtros-desktop">
          <div className="filtro-columna">
            <label className="filtro-label" htmlFor="busqueda-input">
              Busqueda
            </label>
            <input
              id="busqueda-input"
              type="text"
              className="filtro-input"
              placeholder="Buscar por #Folio o ciudadano..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="filtro-columna">
            <label className="filtro-label" htmlFor="estado-select">
              Filtrar
            </label>
            <select
              id="estado-select"
              className="filtro-input filtro-select"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="">Filtrar por Estado:</option>
              <option value="En revisión">En revisión</option>
              <option value="En proceso">En proceso</option>
              <option value="Resuelto">Resuelto</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>

        {/* buscador del celular */}
        <div className="filtros-movil">
          <label className="solicitudes-movil-label">Solicitudes:</label>
          <input
            type="text"
            className="filtro-input-movil"
            placeholder="Buscar por #Folio o ciudadano..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="filtro-input-movil filtro-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Filtrar por Estado:</option>
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>

        {error && <p className="mensaje-error">{error}</p>}

        {/* tabla para desktop */}
        <div className="tabla-admin-contenedor">
          <table className="tabla-admin">
            <thead>
              <tr>
                <th># Folio</th>
                <th>Fecha</th>
                <th>Ciudadano</th>
                <th>Tipo</th>
                <th className="th-estado">Estado</th>
                <th className="th-accion"></th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((item) => (
                <tr key={item.id} className="fila-clickeable" onClick={() => router.push(`/solicitud/${item.id}`)}>
                  <td className="td-folio">{item.folio}</td>
                  <td className="td-fecha">{item.fecha}</td>
                  <td className="td-ciudadano">{item.ciudadano}</td>
                  <td className="td-tipo">{item.tipo}</td>
                  <td className="td-estado">
                    <EstadoBadge estado={item.estado} />
                  </td>
                  <td className="td-accion">
                    <select
                      className="select-estado"
                      value={item.estado}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => cambiarEstado(item.id, e.target.value)}
                    >
                      {ESTADOS.map((estado) => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* tarjetas para el celular */}
        <div className="solicitudes-movil-contenedor">
          {solicitudes.map((item) => (
            <div
              className="tarjeta-solicitud"
              key={item.id}
              onClick={() => router.push(`/solicitud/${item.id}`)}
            >
              <h3 className="tarjeta-folio-titulo">FOLIO {item.folio}</h3>
              <p className="tarjeta-linea">
                <span className="tarjeta-campo">Ciudadano:</span> {item.ciudadano}
              </p>
              <p className="tarjeta-linea">
                <span className="tarjeta-campo">Tipo:</span> {item.tipo}
              </p>
              <div className="tarjeta-badge-wrapper">
                <EstadoBadge estado={item.estado} />
                <select
                  className="select-estado"
                  value={item.estado}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => cambiarEstado(item.id, e.target.value)}
                >
                  {ESTADOS.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default RevisarSolicitudes
