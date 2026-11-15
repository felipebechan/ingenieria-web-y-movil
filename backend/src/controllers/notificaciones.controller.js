import {
  listarDeUsuario,
  contarSinLeer,
  buscarPorId,
  marcarLeida
} from '../services/notificaciones.service.js'

// los id vienen de la url, asi que hay que revisarlos antes de consultar la base
function idValido(id) {
  return /^\d+$/.test(id)
}

export async function listar(req, res, next) {
  try {
    const notificaciones = await listarDeUsuario(req.usuario.id)
    res.json(notificaciones)
  } catch (error) {
    next(error)
  }
}

export async function contador(req, res, next) {
  try {
    const sinLeer = await contarSinLeer(req.usuario.id)
    res.json({ sinLeer })
  } catch (error) {
    next(error)
  }
}

export async function marcarComoLeida(req, res, next) {
  try {
    const { id } = req.params

    if (!idValido(id)) {
      return res.status(400).json({ error: 'El id de la notificación tiene que ser un número' })
    }

    const notificacion = await buscarPorId(id)
    if (!notificacion) {
      return res.status(404).json({ error: 'La notificación no existe' })
    }

    if (notificacion.usuario_id !== req.usuario.id) {
      return res.status(403).json({ error: 'No tienes permiso para modificar esta notificación' })
    }

    const actualizada = await marcarLeida(id, req.usuario.id)
    res.json(actualizada)
  } catch (error) {
    next(error)
  }
}
