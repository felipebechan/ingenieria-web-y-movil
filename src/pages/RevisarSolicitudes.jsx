import React, { useState, useMemo } from 'react'
import { IonIcon } from '@ionic/react'
import { ellipsisHorizontal, chevronDown } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { buscarSolicitudesAdmin } from '../services/solicitudesService'
import './RevisarSolicitudes.css'

function RevisarSolicitudes() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  // el filtro vive en el service, aca solo guardamos lo que escribe el funcionario
  const solicitudesFiltradas = useMemo(
    () => buscarSolicitudesAdmin(busqueda, filtroEstado),
    [busqueda, filtroEstado]
  )

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
        </div>

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
              {solicitudesFiltradas.map((item) => (
                <tr key={item.id}>
                  <td className="td-folio">{item.folio}</td>
                  <td className="td-fecha">{item.fecha}</td>
                  <td className="td-ciudadano">{item.ciudadano}</td>
                  <td className="td-tipo">{item.tipo}</td>
                  <td className="td-estado">
                    <EstadoBadge estado={item.estado} />
                  </td>
                  <td className="td-accion">
                    <IonIcon icon={ellipsisHorizontal} className="icono-puntos" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* tarjetas para el celular */}
        <div className="solicitudes-movil-contenedor">
          {solicitudesFiltradas.map((item) => (
            <div className="tarjeta-solicitud-figma" key={item.id}>
              <h3 className="tarjeta-folio-titulo">FOLIO {item.folio}</h3>
              <p className="tarjeta-linea">
                <span className="tarjeta-campo">Ciudadano:</span> {item.ciudadano}
              </p>
              <p className="tarjeta-linea">
                <span className="tarjeta-campo">Tipo:</span> {item.tipo}
              </p>
              <div className="tarjeta-badge-wrapper">
                <div className="badge-con-flecha">
                  <EstadoBadge estado={item.estado} />
                  <IonIcon icon={chevronDown} className="badge-flecha-icono" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default RevisarSolicitudes
