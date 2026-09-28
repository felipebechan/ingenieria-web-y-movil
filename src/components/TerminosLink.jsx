import { useIonAlert } from '@ionic/react'
import './TerminosLink.css'

const TEXTO =
  'Al enviar tu solicitud aceptas que la Municipalidad de Santo Domingo use tus datos de contacto ' +
  'únicamente para responder tu requerimiento, de acuerdo con la Ley N° 19.628 sobre protección de ' +
  'datos personales. El plazo máximo de respuesta es de 20 días corridos.'

// El mismo link se usa en el registro y en el formulario de reclamo
function TerminosLink() {
  const [mostrarAlerta] = useIonAlert()

  const abrir = () => {
    mostrarAlerta({
      header: 'Términos y condiciones',
      message: TEXTO,
      buttons: ['Cerrar'],
    })
  }

  return (
    <button type="button" className="link-terminos" onClick={abrir}>
      términos y condiciones.
    </button>
  )
}

export default TerminosLink
