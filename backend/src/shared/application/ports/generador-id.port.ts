export const GENERADOR_ID = Symbol('GENERADOR_ID');

export interface GeneradorId {
  generar(): string;
}
