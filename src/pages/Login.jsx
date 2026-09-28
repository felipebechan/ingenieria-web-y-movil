import { useState } from 'react'
import { IonButton, useIonRouter } from '@ionic/react'
import { mailOutline } from 'ionicons/icons'
import AuthLayout from '../components/AuthLayout'
import CampoTexto from '../components/CampoTexto'
import { usePerfil } from '../context/PerfilContext'
import { buscarUsuarioPorCorreo } from '../services/usuariosService'
import { usuario } from '../data/datosPrueba'

function Login() {
  const router = useIonRouter()
  const { iniciarSesion } = usePerfil()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const entrar = () => {
    if (!correo || !password) {
      setError('Debes ingresar tu correo y tu contraseña')
      return
    }

    // Mientras no exista el backend el rol se decide por el correo:
    // los correos @muni.cl entran como funcionario y el resto como ciudadano
    const esFuncionario = correo.endsWith('@muni.cl')

    // si la persona creo su cuenta en el registro usamos ese nombre
    const cuenta = buscarUsuarioPorCorreo(correo)
    const nombre = cuenta ? cuenta.nombre : esFuncionario ? 'Administrador' : usuario.nombre

    setError('')
    iniciarSesion(esFuncionario ? 'admin' : 'usuario', nombre)
    router.push(esFuncionario ? '/revisar-solicitudes' : '/inicio')
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
        <IonButton className="boton boton-azul" onClick={entrar}>Iniciar Sesión</IonButton>
        <IonButton className="boton boton-gris" onClick={() => router.push('/register')}>Crear cuenta</IonButton>
      </div>
    </AuthLayout>
  )
}

export default Login
