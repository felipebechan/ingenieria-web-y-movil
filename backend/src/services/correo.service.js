import { consultar } from '../config/db.js'

// Aviso por correo al vecino cuando su solicitud cambia de estado.
// Se manda con la API de Resend, que es un servicio externo. Si no estan las
// variables de entorno el aviso simplemente no sale y la aplicacion sigue
// funcionando igual, porque el correo no puede frenar la gestion municipal.

const URL_RESEND = 'https://api.resend.com/emails'

const TEXTOS = {
  'En revisión': 'volvió a quedar en revisión',
  'En proceso': 'está siendo atendida',
  'Resuelto': 'fue resuelta',
  'Rechazado': 'fue rechazada'
}

async function buscarDestinatario(solicitudId) {
  const { rows } = await consultar(
    `SELECT u.nombre, u.correo
     FROM solicitudes s
     JOIN usuarios u ON u.id = s.usuario_id
     WHERE s.id = $1`,
    [solicitudId]
  )
  return rows[0]
}

function armarMensaje(nombre, solicitud, comentario) {
  const queLePaso = TEXTOS[solicitud.estado] || `cambió a ${solicitud.estado}`

  let cuerpo = `Hola ${nombre}:\n\n`
  cuerpo += `Tu solicitud ${solicitud.folio} ${queLePaso}.\n\n`
  cuerpo += `Tipo: ${solicitud.tipo}\n`
  cuerpo += `Estado actual: ${solicitud.estado}\n`

  if (comentario) {
    cuerpo += `\nComentario de la municipalidad:\n${comentario}\n`
  }

  cuerpo += '\nPuedes revisar el detalle y el seguimiento desde la plataforma.\n\n'
  cuerpo += 'Municipalidad de Santo Domingo\nOficina de Informaciones, Reclamos y Sugerencias'

  return cuerpo
}

export async function avisarCambioDeEstado(solicitud, comentario) {
  if (!process.env.RESEND_API_KEY || !process.env.CORREO_DESDE) {
    console.log(`Aviso de ${solicitud.folio} no enviado: falta configurar el correo`)
    return { enviado: false, motivo: 'sin configurar' }
  }

  try {
    const vecino = await buscarDestinatario(solicitud.id)
    if (!vecino) {
      return { enviado: false, motivo: 'sin destinatario' }
    }

    // si el servicio no contesta en 5 segundos cortamos, para no dejar
    // esperando al funcionario que cambio el estado
    const respuesta = await fetch(URL_RESEND, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.CORREO_DESDE,
        to: [vecino.correo],
        subject: `Tu solicitud ${solicitud.folio} cambió de estado`,
        text: armarMensaje(vecino.nombre, solicitud, comentario)
      }),
      signal: AbortSignal.timeout(5000)
    })

    if (!respuesta.ok) {
      const detalle = await respuesta.text()
      console.error(`El correo de ${solicitud.folio} no salio:`, respuesta.status, detalle)
      return { enviado: false, motivo: `respuesta ${respuesta.status}` }
    }

    console.log(`Aviso de ${solicitud.folio} enviado a ${vecino.correo}`)
    return { enviado: true }
  } catch (error) {
    // un problema con el correo no puede romper el cambio de estado
    console.error(`El correo de ${solicitud.folio} fallo:`, error.message)
    return { enviado: false, motivo: error.message }
  }
}
