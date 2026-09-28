import { useState } from 'react'
import { IonButton, useIonRouter } from '@ionic/react'
import { mailOutline, personOutline, idCardOutline, callOutline } from 'ionicons/icons'
import AuthLayout from '../components/AuthLayout'
import CampoTexto from '../components/CampoTexto'
import './Register.css'

function Register() {
  const router = useIonRouter()

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [rut, setRut] = useState('')
  const [telefono, setTelefono] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [terminos, setTerminos] = useState(false)
  const [error, setError] = useState('')
  const [cuentaCreada, setCuentaCreada] = useState(false)

  // validaciones simples de formato
  const correoValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
  const rutValido = (valor) => /^[0-9.]{7,12}-[0-9kK]$/.test(valor)

  const crearCuenta = () => {
    if (!nombre || !correo || !rut || !telefono || !password) {
      setError('Completa todos los campos obligatorios')
      return
    }
    if (!correoValido(correo)) {
      setError('El correo no tiene un formato válido (ejemplo: nombre@correo.cl)')
      return
    }
    if (!rutValido(rut)) {
      setError('El RUT debe ir con el formato 12.345.678-9')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (!terminos) {
      setError('Tienes que aceptar los términos y condiciones')
      return
    }

    // falta mandarlo al backend, por ahora solo avisamos que quedo listo
    setError('')
    setCuentaCreada(true)
  }

  return (
    <AuthLayout>
      <div className="form-registro">
        <h3>Crea tu cuenta:</h3>

        <CampoTexto label="Nombre *" placeholder="Ej: Juan López" icono={personOutline} value={nombre} onChange={setNombre} />
        <CampoTexto label="Correo electrónico *" type="email" placeholder="nombre@correo.cl" icono={mailOutline} value={correo} onChange={setCorreo} />
        <CampoTexto label="RUT *" placeholder="Ej: 12.345.678-9" icono={idCardOutline} value={rut} onChange={setRut} />
        <CampoTexto label="Teléfono *" type="tel" placeholder="Ej: +56987654321" icono={callOutline} value={telefono} onChange={setTelefono} />
        <CampoTexto label="Contraseña *" type="password" value={password} onChange={setPassword} />
        <CampoTexto label="Confirmar contraseña *" type="password" value={password2} onChange={setPassword2} />

        <div className="terminos">
          <input type="checkbox" id="terminos" checked={terminos} onChange={() => setTerminos(!terminos)} />
          <label htmlFor="terminos">
            Acepto los <a href="#">términos y condiciones.</a>
          </label>
        </div>

        {error && <p className="mensaje-error">{error}</p>}
        {cuentaCreada && (
          <p className="mensaje-ok">Cuenta creada. Ya puedes iniciar sesión con tu correo.</p>
        )}

        <div className="botones">
          <IonButton className="boton boton-azul" onClick={crearCuenta}>Crear cuenta</IonButton>
          <IonButton className="boton boton-gris" onClick={() => router.push('/login', 'back')}>Volver</IonButton>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
