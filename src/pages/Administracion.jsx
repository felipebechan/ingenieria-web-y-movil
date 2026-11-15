import { useState } from 'react'
import { IonIcon, useIonViewWillEnter } from '@ionic/react'
import { peopleOutline, statsChartOutline } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { obtenerUsuarios, cambiarRolUsuario, obtenerMetricas } from '../services/administracionService'
import './Administracion.css'

const NOMBRES_DE_ROL = {
  ciudadano: 'Vecino',
  funcionario: 'Funcionario',
  administrador: 'Administrador'
}

function Administracion() {
  const [usuarios, setUsuarios] = useState([])
  const [metricas, setMetricas] = useState(null)
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      setUsuarios(await obtenerUsuarios())
      setMetricas(await obtenerMetricas())
      setError('')
    } catch (problema) {
      setError(problema.message)
    }
  }

  useIonViewWillEnter(() => { cargar() })

  const cambiarRol = async (id, rol) => {
    try {
      await cambiarRolUsuario(id, rol)
      cargar()
    } catch (problema) {
      setError(problema.message)
    }
  }

  return (
    <AppLayout>
      <div className="admin-seccion">
        <h1 className="admin-titulo">Administración</h1>
        <p className="admin-bajada">Cuentas de la plataforma y tiempos de respuesta de la oficina.</p>

        {error && <p className="mensaje-error">{error}</p>}

        {metricas && (
          <div className="admin-card">
            <h2><IonIcon icon={statsChartOutline} /> Tiempos de respuesta</h2>

            <div className="admin-numeros">
              <div className="admin-numero">
                <span className="admin-cifra">
                  {metricas.diasPromedioDeCierre === null ? '—' : metricas.diasPromedioDeCierre}
                </span>
                <span className="admin-leyenda">días promedio en cerrar una solicitud</span>
              </div>
              <div className="admin-numero">
                <span className="admin-cifra">{metricas.cerradas}</span>
                <span className="admin-leyenda">solicitudes cerradas de {metricas.total}</span>
              </div>
            </div>

            <div className="admin-estados">
              {metricas.porEstado.map((fila) => (
                <div className="admin-estado" key={fila.estado}>
                  <EstadoBadge estado={fila.estado} />
                  <span>{fila.cantidad}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="admin-card">
          <h2><IonIcon icon={peopleOutline} /> Cuentas registradas</h2>

          <div className="tabla-caja">
            <table className="tabla-admin-usuarios">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Solicitudes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td className="celda-correo">{usuario.correo}</td>
                    <td>{NOMBRES_DE_ROL[usuario.rol]}</td>
                    <td className="celda-centro">{usuario.solicitudes}</td>
                    <td className="celda-centro">
                      {usuario.rol === 'administrador' ? (
                        <span className="sin-accion">—</span>
                      ) : (
                        <button
                          className="boton-rol"
                          onClick={() =>
                            cambiarRol(usuario.id, usuario.rol === 'funcionario' ? 'ciudadano' : 'funcionario')
                          }
                        >
                          {usuario.rol === 'funcionario' ? 'Quitar funcionario' : 'Hacer funcionario'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* en el celular la tabla no cabe, van tarjetas */}
          <div className="usuarios-movil">
            {usuarios.map((usuario) => (
              <div className="usuario-card" key={usuario.id}>
                <h3>{usuario.nombre}</h3>
                <p className="usuario-correo">{usuario.correo}</p>
                <p className="usuario-linea">
                  {NOMBRES_DE_ROL[usuario.rol]} · {usuario.solicitudes} solicitudes
                </p>
                {usuario.rol !== 'administrador' && (
                  <button
                    className="boton-rol"
                    onClick={() =>
                      cambiarRol(usuario.id, usuario.rol === 'funcionario' ? 'ciudadano' : 'funcionario')
                    }
                  >
                    {usuario.rol === 'funcionario' ? 'Quitar funcionario' : 'Hacer funcionario'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Administracion
