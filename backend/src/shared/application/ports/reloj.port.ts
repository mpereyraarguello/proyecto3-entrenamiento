export interface RelojPort {
  ahora(): Date;
}
export const RELOJ_PORT = Symbol('RELOJ_PORT');