import { createContext, useContext, useState } from 'react'

const PerfilContext = createContext()

// Guarda la sesion y el rol del usuario. Lo dejamos en localStorage para que
// no se pierda al recargar. Cuando tengamos el backend (EP2) aca va el token JWT.
export function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState(() => localStorage.getItem('perfil'))

  const iniciarSesion = (rol) => {
    const nuevo = rol === 'admin' ? 'admin' : 'usuario'
    localStorage.setItem('perfil', nuevo)
    setPerfil(nuevo)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('perfil')
    setPerfil(null)
  }

  const haySesion = perfil !== null
  const esAdmin = perfil === 'admin'

  return (
    <PerfilContext.Provider
      value={{
        perfil,
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
