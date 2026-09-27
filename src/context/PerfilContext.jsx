import React, { createContext, useContext, useState } from 'react'

const PerfilContext = createContext()

export function PerfilProvider({ children }) {
  // Por defecto siempre inicia en el perfil del usuario (Juan López)
  const [perfil, setPerfil] = useState('usuario')

  const cambiarPerfil = (nuevo) => {
    if (nuevo === 'admin' || nuevo === 'usuario') {
      setPerfil(nuevo)
    }
  }

  const alternarPerfil = () => {
    setPerfil((prev) => (prev === 'admin' ? 'usuario' : 'admin'))
  }

  const esAdmin = perfil === 'admin'

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        esAdmin,
        cambiarPerfil,
        alternarPerfil
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
