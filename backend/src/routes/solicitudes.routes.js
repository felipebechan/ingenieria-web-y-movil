import { Router } from 'express'
import { crear, listarMias, obtener, listarTodas } from '../controllers/solicitudes.controller.js'
import { verificarToken, soloFuncionario } from '../middlewares/auth.middleware.js'

const router = Router()

// todas las rutas de solicitudes necesitan sesion
router.use(verificarToken)

router.post('/', crear)
router.get('/', soloFuncionario, listarTodas)
router.get('/mias', listarMias)
router.get('/:id', obtener)

export default router


