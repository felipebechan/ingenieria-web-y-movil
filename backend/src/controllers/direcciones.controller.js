import { buscarDirecciones } from '../services/mapas.service.js'
import { limpiarTexto } from '../validaciones.js'

export async function buscar(req, res, next) {
  try {
    const texto = limpiarTexto(req.query.texto || '')

    if (texto.length < 4) {
      return res.status(400).json({ error: 'Escribe al menos 4 caracteres para buscar' })
    }

    const { resultados, error } = await buscarDirecciones(texto)

    // si el servicio de mapas falla devolvemos la lista vacia con el aviso,
    // no un error, porque el vecino igual puede seguir escribiendo a mano
    res.json({ resultados, aviso: error || null })
  } catch (problema) {
    next(problema)
  }
}
