import { createContext, useContext, useState } from 'react'

const PerfilContext = createContext()

// Guarda la sesion y el rol del usuario. Lo dejamos en localStorage para que
// no se pierda al recargar. Cuando tengamos el backend (EP2) aca va el token JWT.
export function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState(() => localStorage.getItem('perfil'))
  const [nombre, setNombre] = useState(() => localStorage.getItem('nombre') || '')

  const iniciarSesion = (rol, nombreUsuario) => {
    const nuevo = rol === 'admin' ? 'admin' : 'usuario'
    localStorage.setItem('perfil', nuevo)
    localStorage.setItem('nombre', nombreUsuario)
    setPerfil(nuevo)
    setNombre(nombreUsuario)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('perfil')
    localStorage.removeItem('nombre')
    setPerfil(null)
    setNombre('')
  }

  const haySesion = perfil !== null
  const esAdmin = perfil === 'admin'

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        nombre,
        haySesion,
        esAdmin,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </PerfilContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePerfil() {
  const context = useContext(PerfilContext)
  if (!context) {
    throw new Error('usePerfil debe usarse dentro de PerfilProvider')
  }
  return context
}
