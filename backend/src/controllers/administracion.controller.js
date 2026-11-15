import {
  listarUsuarios,
  cambiarRol,
  buscarUsuario,
  calcularMetricas
} from '../services/administracion.service.js'

const ROLES_QUE_PUEDE_ASIGNAR = ['ciudadano', 'funcionario']

export async function usuarios(req, res, next) {
  try {
    res.json(await listarUsuarios())
  } catch (error) {
    next(error)
  }
}

export async function asignarRol(req, res, next) {
  try {
    const { id } = req.params
    const { rol } = req.body

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'El id del usuario tiene que ser un número' })
    }

    if (!ROLES_QUE_PUEDE_ASIGNAR.includes(rol)) {
      return res.status(400).json({ error: 'El rol solo puede ser ciudadano o funcionario' })
    }

    const usuario = await buscarUsuario(id)
    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }

    // un administrador no se puede degradar a si mismo ni tocar a otro
    // administrador, para no quedarse sin nadie que administre
    if (usuario.rol === 'administrador') {
      return res.status(409).json({ error: 'No se puede cambiar el rol de un administrador' })
    }

    res.json(await cambiarRol(id, rol))
  } catch (error) {
    next(error)
  }
}

export async function metricas(req, res, next) {
  try {
    res.json(await calcularMetricas())
  } catch (error) {
    next(error)
  }
}
