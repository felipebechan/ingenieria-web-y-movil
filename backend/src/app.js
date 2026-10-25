import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import solicitudesRoutes from './routes/solicitudes.routes.js'
import { manejarErrores, noEncontrado } from './middlewares/errores.middleware.js'

const app = express()

app.use(cors({ origin: process.env.ORIGEN_FRONTEND || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/solicitudes', solicitudesRoutes)

app.use(noEncontrado)
app.use(manejarErrores)

export default app
