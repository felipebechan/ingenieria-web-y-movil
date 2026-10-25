import {
  crearSolicitud,
  listarPorUsuario,
  buscarPorId,
  listarTodas as listarTodasService,
  cambiarEstado as cambiarEstadoService,
  listarHistorial
} from '../services/solicitudes.service.js'
import { validarSolicitud } from '../validaciones.js'

const ESTADOS_VALIDOS = ['En revisión', 'En proceso', 'Resuelto', 'Rechazado']

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
    const { estado, busqueda } = req.query
    const solicitudes = await listarTodasService({ estado, busqueda })
    res.json(solicitudes)
  } catch (error) {
    next(error)
  }
}

export async function cambiarEstado(req, res, next) {
  try {
    const { id } = req.params
    const { estado, comentario } = req.body

    if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
      return res.status(400).json({
        error: 'El estado solo puede ser: En revisión, En proceso, Resuelto o Rechazado'
      })
    }

    const solicitud = await cambiarEstadoService(id, estado, comentario)
    if (!solicitud) {
      return res.status(404).json({ error: 'La solicitud no existe' })
    }

    res.json(solicitud)
  } catch (error) {
    next(error)
  }
}

export async function historial(req, res, next) {
  try {
    const solicitud = await buscarPorId(req.params.id)
    if (!solicitud) {
      return res.status(404).json({ error: 'La solicitud no existe' })
    }

    const esDueño = solicitud.usuario_id === req.usuario.id
    if (!esDueño && req.usuario.rol !== 'funcionario') {
      return res.status(403).json({ error: 'No tienes permiso para ver esta solicitud' })
    }

    res.json(await listarHistorial(req.params.id))
  } catch (error) {
    next(error)
  }
}
