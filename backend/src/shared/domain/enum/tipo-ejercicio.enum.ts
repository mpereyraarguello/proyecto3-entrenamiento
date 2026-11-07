/**
 * Tipo de ejercicio.
 *
 * Lista fija y no configurable del negocio. Vive en `shared/` porque
 * la usan varios módulos (`ejercicios`, `planes-entrenamiento`,
 * `plantilla-base`, `sesiones-entrenamiento`) y no tiene regla de
 * negocio propia.
 *
 * Reglas asociadas (viven en el dominio de cada módulo, NO acá):
 * - CALENTAMIENTO, CARDIO y ESTIRAMIENTO no tienen grupo muscular.
 * - CORE y FUERZA tienen al menos un grupo muscular.
 * - CORE y FUERZA llevan progresión semanal fija (series, repeticiones, RIR).
 * - CALENTAMIENTO y ESTIRAMIENTO llevan series/repeticiones definidas
 *   por el profesor.
 * - CARDIO solo se marca como completado.
 */
export enum TipoEjercicio {
  CALENTAMIENTO = 'CALENTAMIENTO',
  CORE = 'CORE',
  FUERZA = 'FUERZA',
  CARDIO = 'CARDIO',
  ESTIRAMIENTO = 'ESTIRAMIENTO',
}