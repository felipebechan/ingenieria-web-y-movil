import { Navigate } from 'react-router-dom'
import { usePerfil } from '../context/PerfilContext'

// Envuelve las vistas privadas: sin token manda al login y si el rol no
// corresponde manda a la vista de inicio que si le toca a ese usuario.
function RutaProtegida({ children, rol }) {
  const { haySesion, esAdmin } = usePerfil()

  if (!haySesion) {
    return <Navigate to="/login" replace />
  }

  if (rol === 'funcionario' && !esAdmin) {
    return <Navigate to="/inicio" replace />
  }

  if (rol === 'ciudadano' && esAdmin) {
    return <Navigate to="/revisar-solicitudes" replace />
  }

  return children
}

export default RutaProtegida
