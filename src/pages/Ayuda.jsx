import { useState } from 'react'
import { IonIcon } from '@ionic/react'
import { chevronDown, chevronUp, helpCircleOutline, callOutline } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import './Ayuda.css'

const PREGUNTAS = [
  {
    pregunta: '¿Cómo ingreso un reclamo?',
    respuesta:
      'Entra a "Nueva solicitud", elige el tipo, escribe la dirección y cuenta qué pasó. ' +
      'Puedes adjuntar una foto y marcar tu ubicación con el GPS del teléfono. Al enviarlo ' +
      'recibes un número de folio para seguirlo.'
  },
  {
    pregunta: '¿Para qué sirve el folio?',
    respuesta:
      'Es el número único de tu solicitud. Con él puedes identificarla en "Mis solicitudes" ' +
      'y mencionarlo si vas a consultar presencialmente a la municipalidad.'
  },
  {
    pregunta: '¿Cuánto se demoran en responder?',
    respuesta:
      'La municipalidad se compromete a responder en 20 días hábiles. Es una meta de servicio ' +
      'dentro del plazo máximo de 30 días que fija la ley para las oficinas de informaciones, ' +
      'reclamos y sugerencias.'
  },
  {
    pregunta: '¿Cómo sé en qué va mi solicitud?',
    respuesta:
      'Cada vez que un funcionario la mueve te llega un aviso a "Notificaciones", y en el ' +
      'detalle de la solicitud queda el historial completo con la fecha de cada cambio.'
  },
  {
    pregunta: '¿Puedo eliminar un reclamo que ingresé?',
    respuesta:
      'Sí, mientras siga "En revisión", o sea mientras ningún funcionario lo haya tomado. ' +
      'Una vez que entra en trámite ya no se puede eliminar.'
  },
  {
    pregunta: '¿Quién ve mis datos?',
    respuesta:
      'Solo tú y el funcionario que atiende tu solicitud. Tu RUT, correo y teléfono no ' +
      'aparecen en ningún listado ni los ve otro vecino.'
  }
]

const ESTADOS = [
  { estado: 'En revisión', que: 'La solicitud llegó y todavía nadie la toma.' },
  { estado: 'En proceso', que: 'Un funcionario la derivó a la unidad que corresponde.' },
  { estado: 'Resuelto', que: 'La municipalidad respondió y cerró el caso.' },
  { estado: 'Rechazado', que: 'No corresponde a la municipalidad o no se pudo atender.' }
]

function Ayuda() {
  const [abierta, setAbierta] = useState(null)

  return (
    <AppLayout>
      <div className="ayuda-seccion">
        <h1 className="ayuda-titulo">Ayuda</h1>
        <p className="ayuda-bajada">Las dudas más comunes sobre cómo usar la plataforma.</p>

        <div className="ayuda-card">
          <h2><IonIcon icon={helpCircleOutline} /> Preguntas frecuentes</h2>

          <ul className="ayuda-lista">
            {PREGUNTAS.map((item, i) => (
              <li key={item.pregunta}>
                <button
                  type="button"
                  className="ayuda-pregunta"
                  onClick={() => setAbierta(abierta === i ? null : i)}
                >
                  <span>{item.pregunta}</span>
                  <IonIcon icon={abierta === i ? chevronUp : chevronDown} />
                </button>
                {abierta === i && <p className="ayuda-respuesta">{item.respuesta}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="ayuda-card">
          <h2>Qué significa cada estado</h2>

          <ul className="ayuda-estados">
            {ESTADOS.map((item) => (
              <li key={item.estado}>
                <EstadoBadge estado={item.estado} />
                <span>{item.que}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ayuda-card">
          <h2><IonIcon icon={callOutline} /> ¿Necesitas hablar con alguien?</h2>
          <p className="ayuda-contacto">
            La Oficina de Informaciones, Reclamos y Sugerencias atiende de forma presencial en
            el edificio municipal. Si tu problema es una emergencia, no uses esta plataforma:
            llama directamente a Seguridad Ciudadana.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}

export default Ayuda
