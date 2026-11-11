import { SesionEntrenamiento } from '../../domain/entities/sesion-entrenamiento.entity';
import { ItemHistorialSesionResponse } from '../responses/historial-sesiones-plan.response';
import { formatearFechaHoraSesion } from './formatear-fecha-sesion.helper';

/** Arma la vista de historial de una sesión finalizada (CA.6A.2, CA.6A.3). */
export function mapearSesionAHistorial(sesion: SesionEntrenamiento): ItemHistorialSesionResponse {
  const inicio = sesion.getFechaInicio();
  const fin = sesion.getFechaFin() ?? inicio;
  const duracionMinutos = Math.max(1, Math.round(Math.max(0, fin.getTime() - inicio.getTime()) / 60000));
  const cardioCompletado = sesion.isBloqueCardioCompletado();

  const ejercicios = sesion.getEjercicios().map((ejercicio) => {
    const series = ejercicio.getSeries();
    const ultimaSerie = series.length > 0 ? series[series.length - 1] : null;

    return {
      id: ejercicio.id,
      ejercicioId: ejercicio.getEjercicioId(),
      nombre: ejercicio.getNombre(),
      tipo: ejercicio.getTipo(),
      orden: ejercicio.getOrden(),
      completado: ejercicio.estaCompletado(),
      peso: ultimaSerie ? ultimaSerie.getPeso().formateado() : '-',
      repeticiones: ultimaSerie ? String(ultimaSerie.getRepeticionesValor()) : '-',
      series: series.map((serie) => ({
        numeroSerie: serie.getNumeroSerie(),
        peso: serie.getPesoValor(),
        repeticiones: serie.getRepeticionesValor(),
      })),
    };
  });

  return {
    id: sesion.getId(),
    planId: sesion.getPlanId(),
    rutinaId: sesion.getRutinaId(),
    rutinaNumero: sesion.getRutinaNumero(),
    rutinaNombre: `Rutina ${sesion.getRutinaNumero()}`,
    semana: sesion.getSemana(),
    fechaInicio: inicio.toISOString(),
    fechaFin: fin.toISOString(),
    fechaFormateada: formatearFechaHoraSesion(inicio),
    duracionMinutos,
    duracionEstimada: `${duracionMinutos} min`,
    // Los contadores incluyen solo core y fuerza; calentamiento, cardio y estiramiento van en `bloques` (CP-6A-8)
    totalEjercicios: ejercicios.length,
    totalEjerciciosCompletados: ejercicios.filter((ejercicio) => ejercicio.completado).length,
    // Calentamiento es obligatorio; cardio (null si el plan no lo tiene) y estiramiento son opcionales
    bloques: {
      calentamiento: {
        nombre: 'Calentamiento y Movilidad Articular',
        completado: sesion.isBloqueCalentamientoCompletado(),
      },
      cardio:
        cardioCompletado !== null
          ? { nombre: 'Bloque de Cardio', completado: cardioCompletado }
          : null,
      estiramiento: {
        nombre: 'Estiramiento y Vuelta a la Calma',
        completado: sesion.isBloqueEstiramientoCompletado(),
      },
    },
    ejercicios,
  };
}
