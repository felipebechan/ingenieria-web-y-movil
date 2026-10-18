import {
  crearSolicitud,
  listarPorUsuario,
  buscarPorId,
  listarTodas as listarTodasService
} from '../services/solicitudes.service.js'
import { validarSolicitud } from '../validaciones.js'



export async function crear(req, res, next) {
  try {
    const errores = validarSolicitud(req.body)
    if (errores.length > 0) {
      return res.status(400).json({ error: errores[0] })
    }

    const solicitud = await crearSolicitud(req.usuario.id, req.body)
    res.status(201).json(solicitud)
  } catch (error) {
    next(error)
  }
}

export async function listarMias(req, res, next) {
  try {
    const solicitudes = await listarPorUsuario(req.usuario.id)
    res.json(solicitudes)
  } catch (error) {
    next(error)
  }
}

export async function obtener(req, res, next) {
  try {
    const solicitud = await buscarPorId(req.params.id)
    if (!solicitud) {
      return res.status(404).json({ error: 'La solicitud no existe' })
    }

    // un vecino solo puede ver las suyas, el funcionario puede ver todas
    const esDueño = solicitud.usuario_id === req.usuario.id
    if (!esDueño && req.usuario.rol !== 'funcionario') {
      return res.status(403).json({ error: 'No tienes permiso para ver esta solicitud' })
    }

    res.json(solicitud)
  } catch (error) {
    next(error)
  }
}

export async function listarTodas(req, res, next) {
  try {
    const solicitudes = await listarTodasService()
    res.json(solicitudes)
  } catch (error) {
    next(error)
  }
}


