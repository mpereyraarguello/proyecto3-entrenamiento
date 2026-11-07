import { Ejercicio } from "../entities/ejercicio.entity";


export const EJERCICIO_REPOSITORY = Symbol('EJERCICIO_REPOSITORY');

export interface EjercicioRepository {
  guardar(ejercicio: Ejercicio): Promise<void>;
  buscarPorId(id: string): Promise<Ejercicio | null>;
  buscarPorNombre(nombre: string): Promise<Ejercicio | null>;
  listarTodos(): Promise<Ejercicio[]>;
}