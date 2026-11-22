import { GrupoMuscular } from 'src/shared/domain/enums/grupo-muscular.enum';
import { Ejercicio } from '../entities/ejercicio.entity';
import { TipoEjercicio } from 'src/shared/domain/enums/tipo-ejercicio.enum';

export const EJERCICIO_REPOSITORY = Symbol('IEJERCICIO_REPOSITORY');

export interface CriteriosBusquedaEjercicio {
  termino?: string;
  tipoEjercicio?: TipoEjercicio;
  grupoMuscular?: GrupoMuscular;
}

export interface IEjercicioRepository {
  guardar(ejercicio: Ejercicio): Promise<Ejercicio>;
  buscarPorId(id: number): Promise<Ejercicio | null>;
  buscarPorNombre(nombre: string): Promise<Ejercicio | null>;
  listarTodos(): Promise<Ejercicio[]>;
  buscarEjercicios(criterios: CriteriosBusquedaEjercicio): Promise<{ data: Ejercicio[]; total: number }>;
}
