import { TipoEjercicio } from '../../../../../shared/domain/enums/tipo-ejercicio.enum';
import { GrupoMuscular } from '../../../../../shared/domain/enums/grupo-muscular.enum';

export class CrearEjercicioCommand {
  constructor(
    public readonly nombre: string,
    public readonly tipoEjercicio: TipoEjercicio,
    public readonly gruposMusculares?: GrupoMuscular[],
    public readonly observacion?: string,
    public readonly imagenUrl?: string,
  ) {}
}
