import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import solicitudesRoutes from './routes/solicitudes.routes.js'
import direccionesRoutes from './routes/direcciones.routes.js'
import notificacionesRoutes from './routes/notificaciones.routes.js'
import administracionRoutes from './routes/administracion.routes.js'
import { manejarErrores, noEncontrado } from './middlewares/errores.middleware.js'

const app = express()

app.use(cors({ origin: process.env.ORIGEN_FRONTEND || 'http://localhost:5173' }))
// el limite por defecto es 100kb y la foto en base64 puede pesar hasta 1 MB
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/solicitudes', solicitudesRoutes)
app.use('/api/direcciones', direccionesRoutes)
app.use('/api/notificaciones', notificacionesRoutes)
app.use('/api/admin', administracionRoutes)

app.use(noEncontrado)
app.use(manejarErrores)

export default app
