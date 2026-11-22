const ZONA_HORARIA_GIMNASIO = 'America/Argentina/Cordoba';

function partesFecha(fecha: Date): Record<string, string> {
  const partes = new Intl.DateTimeFormat('es-AR', {
    timeZone: ZONA_HORARIA_GIMNASIO,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(fecha);

  return Object.fromEntries(partes.map((parte) => [parte.type, parte.value]));
}

/** Devuelve "DD/MM/YYYY" en la hora local del gimnasio. */
export function formatearFechaSesion(fecha: Date): string {
  const { day, month, year } = partesFecha(fecha);
  return `${day}/${month}/${year}`;
}

/** Devuelve "DD/MM/YYYY - HH:mm hs" en la hora local del gimnasio, sin depender de la zona del servidor. */
export function formatearFechaHoraSesion(fecha: Date): string {
  const { hour, minute } = partesFecha(fecha);
  return `${formatearFechaSesion(fecha)} - ${hour}:${minute} hs`;
}
