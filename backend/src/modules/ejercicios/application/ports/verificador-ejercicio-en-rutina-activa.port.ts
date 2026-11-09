export const VERIFICADOR_EJERCICIO_PORT = Symbol('VerificadorEjercicioEnRutinaActiva')

export interface VerificadorEjercicioEnRutinaActiva {
    
  estaEnRutinaActiva(ejercicioId: number): Promise<boolean>;
}