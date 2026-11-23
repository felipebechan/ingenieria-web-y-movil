import { useState } from 'react'
import { IonIcon, useIonRouter, useIonViewWillEnter } from '@ionic/react'
import {
  personOutline,
  mailOutline,
  idCardOutline,
  callOutline,
  briefcaseOutline,
  documentTextOutline
} from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import { obtenerMiPerfil } from '../services/usuariosService'
import { usePerfil } from '../context/PerfilContext'
import './Perfil.css'

function Perfil() {
  const router = useIonRouter()
  const { esAdmin } = usePerfil()

  const [datos, setDatos] = useState(null)
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      setDatos(await obtenerMiPerfil())
      setError('')
    } catch (problema) {
      setError(problema.message)
    }
  }

  useIonViewWillEnter(() => { cargar() })

  if (!datos) {
    return (
      <AppLayout>
        <div className="perfil-seccion">
          <h1 className="perfil-titulo">Mi perfil</h1>
          <p>{error || 'Cargando...'}</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="perfil-seccion">
        <h1 className="perfil-titulo">Mi perfil</h1>
        <p className="perfil-bajada">Los datos con los que te registraste en la plataforma.</p>

        <div className="perfil-tarjetas">
          <div className="perfil-card">
            <h2><IonIcon icon={personOutline} /> Datos de la cuenta</h2>

            <div className="perfil-dato">
              <IonIcon icon={personOutline} />
              <div>
                <span className="perfil-etiqueta">Nombre</span>
                <span className="perfil-valor">{datos.nombre}</span>
              </div>
            </div>

            <div className="perfil-dato">
              <IonIcon icon={mailOutline} />
              <div>
                <span className="perfil-etiqueta">Correo</span>
                <span className="perfil-valor">{datos.correo}</span>
              </div>
            </div>

            <div className="perfil-dato">
              <IonIcon icon={idCardOutline} />
              <div>
                <span className="perfil-etiqueta">RUT</span>
                <span className="perfil-valor">{datos.rut}</span>
              </div>
            </div>

            <div className="perfil-dato">
              <IonIcon icon={callOutline} />
              <div>
                <span className="perfil-etiqueta">Teléfono</span>
                <span className="perfil-valor">{datos.telefono || 'No registrado'}</span>
              </div>
            </div>

            <div className="perfil-dato">
              <IonIcon icon={briefcaseOutline} />
              <div>
                <span className="perfil-etiqueta">Tipo de cuenta</span>
                <span className="perfil-valor">
                  {datos.rol === 'administrador'
                    ? 'Administrador'
                    : datos.rol === 'funcionario' ? 'Funcionario municipal' : 'Vecino'}
                </span>
              </div>
            </div>
          </div>

          <div className="perfil-card">
            <h2><IonIcon icon={documentTextOutline} /> Resumen</h2>

            <p className="perfil-numero">{datos.solicitudes}</p>
            <p className="perfil-leyenda">
              {esAdmin
                ? 'solicitudes ingresadas con esta cuenta'
                : 'solicitudes que has ingresado'}
            </p>

            {!esAdmin && (
              <button className="perfil-boton" onClick={() => router.push('/mis-solicitudes')}>
                Ver mis solicitudes
              </button>
            )}

            <p className="perfil-nota">
              Para cambiar tus datos de contacto tienes que acercarte a la Oficina de
              Informaciones, Reclamos y Sugerencias de la municipalidad.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Perfil
