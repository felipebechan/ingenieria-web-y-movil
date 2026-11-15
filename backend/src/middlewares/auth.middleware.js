import jwt from 'jsonwebtoken'

export function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization || ''
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Falta el token' })
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

// el administrador tambien entra a las pantallas del funcionario
export function soloFuncionario(req, res, next) {
  if (req.usuario.rol !== 'funcionario' && req.usuario.rol !== 'administrador') {
    return res.status(403).json({ error: 'No tienes permiso para esta operación' })
  }
  next()
}

export function soloAdministrador(req, res, next) {
  if (req.usuario.rol !== 'administrador') {
    return res.status(403).json({ error: 'Esta operación es solo para administradores' })
  }
  next()
}
