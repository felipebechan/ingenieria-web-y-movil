import { Router } from 'express'
import { buscar } from '../controllers/direcciones.controller.js'
import { verificarToken } from '../middlewares/auth.middleware.js'

const router = Router()

// solo para usuarios con sesion, asi no queda abierto a cualquiera
router.use(verificarToken)

router.get('/', buscar)

export default router
