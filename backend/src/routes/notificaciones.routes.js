import { Router } from 'express'
import {
  listar,
  contador,
  marcarComoLeida
} from '../controllers/notificaciones.controller.js'
import { verificarToken } from '../middlewares/auth.middleware.js'

const router = Router()

// todas las rutas de notificaciones necesitan sesion
router.use(verificarToken)

router.get('/', listar)
router.get('/contador', contador)
router.patch('/:id/leida', marcarComoLeida)

export default router
