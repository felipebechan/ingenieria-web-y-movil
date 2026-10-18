import { Router } from 'express'
import { crear, listarMias, obtener } from '../controllers/solicitudes.controller.js'
import { verificarToken } from '../middlewares/auth.middleware.js'

const router = Router()

// todas las rutas de solicitudes necesitan sesion
router.use(verificarToken)

router.post('/', crear)
router.get('/mias', listarMias)
router.get('/:id', obtener)

// PENDIENTE (Giovani): GET / con filtros para el funcionario y PATCH /:id/estado

export default router
