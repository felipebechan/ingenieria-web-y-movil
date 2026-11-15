// Control del plazo de respuesta comprometido por la municipalidad.
//
// El Art. 98 de la Ley 18.695 deja el plazo en manos de la ordenanza de cada
// comuna, con un tope de 30 dias, y el Art. 25 de la Ley 19.880 dice que esos
// plazos se cuentan en dias habiles. El proyecto adopta 20 dias habiles como
// meta de servicio, que deja margen para la prorroga del Art. 26 sin pasarse
// del tope.
//
// Simplificacion: aca solo se descuentan sabados y domingos. Los festivos
// cambian cada año y habria que mantener una lista, asi que quedan fuera.

const PLAZO_HABILES = 20

const ESTADOS_CERRADOS = ['Resuelto', 'Rechazado']

function esFinDeSemana(fecha) {
  const dia = fecha.getDay()
  return dia === 0 || dia === 6
}

export function diasHabilesEntre(desde, hasta) {
  const inicio = new Date(desde)
  const fin = new Date(hasta)
  inicio.setHours(0, 0, 0, 0)
  fin.setHours(0, 0, 0, 0)

  let dias = 0
  const cursor = new Date(inicio)

  while (cursor < fin) {
    cursor.setDate(cursor.getDate() + 1)
    if (!esFinDeSemana(cursor)) {
      dias++
    }
  }

  return dias
}

// verde con mas de 10 dias, amarillo entre 5 y 10, rojo con menos de 5
function colorDelPlazo(diasRestantes) {
  if (diasRestantes < 0) return 'vencido'
  if (diasRestantes < 5) return 'rojo'
  if (diasRestantes <= 10) return 'amarillo'
  return 'verde'
}

export function calcularPlazo(solicitud, hoy = new Date()) {
  // una solicitud cerrada ya no corre plazo
  if (ESTADOS_CERRADOS.includes(solicitud.estado)) {
    return { diasRestantes: null, semaforo: null }
  }

  const transcurridos = diasHabilesEntre(solicitud.creada_en, hoy)
  const diasRestantes = PLAZO_HABILES - transcurridos

  return { diasRestantes, semaforo: colorDelPlazo(diasRestantes) }
}
