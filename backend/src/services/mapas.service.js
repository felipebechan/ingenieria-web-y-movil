// Busqueda de direcciones con Nominatim, el servicio de OpenStreetMap.
// Sirve para que el vecino no escriba la direccion a mano y la municipalidad
// reciba siempre la misma forma de escribirla, con sus coordenadas.
//
// Es abierto, no necesita clave. Lo que si pide su politica de uso es mandar
// un User-Agent que identifique a la aplicacion y no hacer muchas consultas
// seguidas, por eso aca va una sola busqueda por llamada y con limite de 5.

const URL_NOMINATIM = 'https://nominatim.openstreetmap.org/search'

const IDENTIFICACION =
  'SantoDomingoResponde/1.0 (proyecto universitario, https://github.com/felipebechan/ingenieria-web-y-movil)'

function acomodar(lugar) {
  return {
    direccion: lugar.display_name,
    latitud: Number(lugar.lat),
    longitud: Number(lugar.lon)
  }
}

export async function buscarDirecciones(texto) {
  const parametros = new URLSearchParams({
    q: texto,
    format: 'json',
    limit: '5',
    addressdetails: '0',
    // la comuna esta en Chile, asi no aparecen calles de otros paises
    countrycodes: 'cl'
  })

  try {
    const respuesta = await fetch(`${URL_NOMINATIM}?${parametros}`, {
      headers: {
        'User-Agent': IDENTIFICACION,
        'Accept-Language': 'es'
      },
      signal: AbortSignal.timeout(5000)
    })

    if (!respuesta.ok) {
      console.error('Nominatim respondio', respuesta.status)
      return { resultados: [], error: `El servicio de mapas respondio ${respuesta.status}` }
    }

    const lugares = await respuesta.json()
    return { resultados: lugares.map(acomodar) }
  } catch (error) {
    // si el servicio no contesta, el vecino igual puede escribir la direccion
    console.error('La busqueda de direcciones fallo:', error.message)
    return { resultados: [], error: 'No se pudo consultar el servicio de mapas' }
  }
}
