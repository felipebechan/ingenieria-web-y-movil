import { useState } from 'react'
import { useIonRouter } from '@ionic/react'
import { mailOutline } from 'ionicons/icons'
import AuthLayout from '../components/AuthLayout'
import CampoTexto from '../components/CampoTexto'

function Login() {
  const router = useIonRouter()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const iniciarSesion = () => {
    // por ahora no valida nada, falta conectar con el backend
    console.log('login', correo, password)
    router.push('/inicio')
  }

  return (
    <AuthLayout>
      <h3>Ingresa tus datos para iniciar sesión:</h3>

      <CampoTexto
        label="Correo electrónico *"
        type="email"
        placeholder="nombre@correo.cl"
        icono={mailOutline}
        value={correo}
        onChange={setCorreo}
      />
      <CampoTexto label="Contraseña *" type="password" value={password} onChange={setPassword} />

      <div className="botones">
        <button className="boton boton-azul" onClick={iniciarSesion}>Iniciar Sesión</button>
        <button className="boton boton-gris" onClick={() => router.push('/register')}>Crear cuenta</button>
      </div>
    </AuthLayout>
  )
}

export default Login
