import { useState } from 'react'
import { IonButton, useIonRouter } from '@ionic/react'
import { mailOutline } from 'ionicons/icons'
import AuthLayout from '../components/AuthLayout'
import CampoTexto from '../components/CampoTexto'
import { usePerfil } from '../context/PerfilContext'
import { iniciarSesion as loginApi } from '../services/usuariosService'

function Login() {
  const router = useIonRouter()
  const { iniciarSesion } = usePerfil()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const entrar = async () => {
    if (!correo || !password) {
      setError('Debes ingresar tu correo y tu contraseña')
      return
    }

    setError('')
    setCargando(true)

    try {
      const { usuario, token } = await loginApi(correo, password)
      iniciarSesion(usuario.rol, usuario.nombre, token)
      router.push(usuario.rol === 'funcionario' ? '/revisar-solicitudes' : '/inicio')
    } catch (problema) {
      setError(problema.message)
    } finally {
      setCargando(false)
    }
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

      {error && <p className="mensaje-error">{error}</p>}

      <div className="botones">
        <IonButton className="boton boton-azul" onClick={entrar} disabled={cargando}>
          {cargando ? 'Entrando...' : 'Iniciar Sesión'}
        </IonButton>
        <IonButton className="boton boton-gris" onClick={() => router.push('/register')}>Crear cuenta</IonButton>
      </div>
    </AuthLayout>
  )
}

export default Login
