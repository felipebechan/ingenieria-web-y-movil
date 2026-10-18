import { Router } from 'express'
import { registrar, iniciarSesion, miPerfil } from '../controllers/auth.controller.js'
import { verificarToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/registro', registrar)
router.post('/login', iniciarSesion)
router.get('/yo', verificarToken, miPerfil)

export default router
