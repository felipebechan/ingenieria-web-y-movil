import { Router } from 'express'
import {
  crear,
  listarMias,
  obtener,
  listarTodas,
  cambiarEstado,
  historial,
  eliminar,
  derivar,
  responder
} from '../controllers/solicitudes.controller.js'
import { verificarToken, soloFuncionario } from '../middlewares/auth.middleware.js'

const router = Router()

// todas las rutas de solicitudes necesitan sesion
router.use(verificarToken)

router.post('/', crear)
router.get('/', soloFuncionario, listarTodas)
router.get('/mias', listarMias)
router.get('/:id', obtener)
router.get('/:id/historial', historial)
router.patch('/:id/estado', soloFuncionario, cambiarEstado)
router.patch('/:id/derivar', soloFuncionario, derivar)
router.patch('/:id/responder', soloFuncionario, responder)
router.delete('/:id', eliminar)

export default router
