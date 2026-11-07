import { Ejercicio } from '../entities/ejercicio.entity';
import { BuscarEjercicioQuery } from '../../application/queries/buscar-ejercicio.query';

export const EJERCICIO_REPOSITORY = Symbol('IEJERCICIO_REPOSITORY');

export interface IEjercicioRepository {
  guardar(ejercicio: Ejercicio): Promise<Ejercicio>;
  buscarPorId(id: number): Promise<Ejercicio | null>;
  buscarPorNombre(nombre: string): Promise<Ejercicio | null>;
  listarTodos(): Promise<Ejercicio[]>;
  buscarEjercicios(query: BuscarEjercicioQuery): Promise<{ data: Ejercicio[]; total: number }>;
}
