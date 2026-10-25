import { createContext, useContext, useState } from 'react'

const PerfilContext = createContext()

// Guarda la sesion que devuelve el backend: el token, el rol y el nombre.
// Queda en localStorage para que no se pierda al recargar la pagina.
export function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState(() => localStorage.getItem('perfil'))
  const [nombre, setNombre] = useState(() => localStorage.getItem('nombre') || '')

  const iniciarSesion = (rol, nombreUsuario, token) => {
    localStorage.setItem('perfil', rol)
    localStorage.setItem('nombre', nombreUsuario)
    localStorage.setItem('token', token)
    setPerfil(rol)
    setNombre(nombreUsuario)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('perfil')
    localStorage.removeItem('nombre')
    localStorage.removeItem('token')
    setPerfil(null)
    setNombre('')
  }

  const haySesion = perfil !== null && Boolean(localStorage.getItem('token'))
  const esAdmin = perfil === 'funcionario'

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
