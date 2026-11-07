import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';
import { GrupoMuscular } from '../../../../shared/domain/enums/grupo-muscular.enum';

export class BuscarEjercicioQuery {
  constructor(
    public readonly termino?: string,
    public readonly tipoEjercicio?: TipoEjercicio,
    public readonly grupoMuscular?: GrupoMuscular,
  ) {}
}
