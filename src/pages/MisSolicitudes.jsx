import { useState } from 'react'
import { IonIcon, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { obtenerMisSolicitudes } from '../services/solicitudesService'
import './MisSolicitudes.css'

function MisSolicitudes() {
  const router = useIonRouter()
  const [misSolicitudes, setMisSolicitudes] = useState(obtenerMisSolicitudes())

  // al volver a la pantalla recargamos por si se ingreso una solicitud nueva
  useIonViewWillEnter(() => setMisSolicitudes(obtenerMisSolicitudes()))

  return (
    <AppLayout>
      <div className="mis-solicitudes-seccion">
        <h1 className="mis-solicitudes-titulo">Mis solicitudes</h1>

        {/* tabla para desktop */}
        <div className="tabla-solicitudes-contenedor">
          <table className="tabla-solicitudes">
            <thead>
              <tr>
                <th className="th-col-folio"># Folio</th>
                <th className="th-col-fecha">Fecha</th>
                <th className="th-col-tipo">Tipo</th>
                <th className="th-col-desc">Descripción</th>
                <th className="th-col-estado">Estado</th>
              </tr>
            </thead>
            <tbody>
              {misSolicitudes.map((item) => (
                <tr key={item.id} className="fila-clickeable" onClick={() => router.push(`/solicitud/${item.id}`)}>
                  <td className="td-col-folio">{item.folio}</td>
                  <td className="td-col-fecha">{item.fecha}</td>
                  <td className="td-col-tipo">{item.tipo}</td>
                  <td className="td-col-desc">{item.descripcion}</td>
                  <td className="td-col-estado">
                    <EstadoBadge estado={item.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* tarjetas para el celular */}
        <div className="solicitudes-movil-lista">
          {misSolicitudes.map((item) => (
            <div
              className="solicitud-tarjeta-movil"
              key={item.id}
              onClick={() => router.push(`/solicitud/${item.id}`)}
            >
              <div className="solicitud-tarjeta-movil-top">
                <span className="solicitud-tarjeta-folio">{item.folio}</span>
                <EstadoBadge estado={item.estado} />
              </div>
              <p className="solicitud-tarjeta-desc">{item.descripcion}</p>
              <div className="solicitud-tarjeta-pie">
                <span className="solicitud-tarjeta-info">
                  {item.tipo} · {item.fecha}
                </span>
                <IonIcon icon={chevronForward} className="solicitud-tarjeta-flecha" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default MisSolicitudes
