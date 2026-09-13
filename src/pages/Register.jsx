import { useState } from 'react'
import { useIonRouter } from '@ionic/react'
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

  const crearCuenta = () => {
    if (!nombre || !correo || !rut || !telefono || !password) {
      alert('Completa todos los campos')
      return
    }
    if (password !== password2) {
      alert('Las contraseñas no coinciden')
      return
    }
    if (!terminos) {
      alert('Tienes que aceptar los términos y condiciones')
      return
    }
    // falta mandarlo al backend
    console.log('registro', nombre, correo, rut, telefono)
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

        <div className="botones">
          <button className="boton boton-azul" onClick={crearCuenta}>Crear cuenta</button>
          <button className="boton boton-gris" onClick={() => router.push('/login', 'back')}>Volver</button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
