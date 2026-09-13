import { useState } from 'react'
import { IonInput, IonIcon } from '@ionic/react'
import './CampoTexto.css'

// input con label arriba y un icono a la derecha
// si es password en vez del icono sale el boton *** para ver la clave
function CampoTexto({ label, type = 'text', placeholder, icono, value, onChange }) {
  const [verPassword, setVerPassword] = useState(false)
  const esPassword = type === 'password'

  return (
    <>
      <label className="campo-label">{label}</label>
      <div className="campo">
        <IonInput
          type={esPassword && verPassword ? 'text' : type}
          placeholder={esPassword ? '******************' : placeholder}
          value={value}
          onIonInput={(e) => onChange(e.detail.value)}
        />
        {esPassword ? (
          <button type="button" className="ver-pass" onClick={() => setVerPassword(!verPassword)}>***</button>
        ) : (
          <IonIcon icon={icono} />
        )}
      </div>
    </>
  )
}

export default CampoTexto
