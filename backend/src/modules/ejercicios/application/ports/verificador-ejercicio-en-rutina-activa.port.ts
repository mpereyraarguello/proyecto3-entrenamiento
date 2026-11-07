export const VERIFICADOR_EJERCICIO_EN_RUTINA_ACTIVA = Symbol('VERIFICADOR_EJERCICIO_EN_RUTINA_ACTIVA');

export interface VerificadorEjercicioEnRutinaActiva {
  estaEnRutinaActiva(ejercicioId: number): Promise<boolean>;
}