import { Router } from 'express'
import { usuarios, asignarRol, metricas } from '../controllers/administracion.controller.js'
import { verificarToken, soloAdministrador } from '../middlewares/auth.middleware.js'

const router = Router()

// todo lo de aca es solo para el administrador
router.use(verificarToken, soloAdministrador)

router.get('/usuarios', usuarios)
router.patch('/usuarios/:id/rol', asignarRol)
router.get('/metricas', metricas)

export default router
