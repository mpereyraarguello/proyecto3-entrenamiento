import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';
import { GrupoMuscular } from '../../../../shared/domain/enums/grupo-muscular.enum';
import { Ejercicio } from '../../domain/entities/ejercicio.entity';

export class EjercicioResponse {
  id!: string;
  nombre!: string;
  tipoEjercicio!: TipoEjercicio;
  gruposMusculares!: GrupoMuscular[];
  observacion?: string | null;
  imagenUrl?: string | null;
  createdAt!: string;

  static desdeDominio(ejercicio: Ejercicio): EjercicioResponse {
    const res = new EjercicioResponse();
    res.id = ejercicio.id;
    res.nombre = ejercicio.nombre;
    res.tipoEjercicio = ejercicio.tipoEjercicio;
    res.gruposMusculares = ejercicio.gruposMusculares;
    res.observacion = ejercicio.observacion;
    res.imagenUrl = ejercicio.imagenUrl;
    res.createdAt = ejercicio.createdAt.toISOString();  
    return res;
  }
}
