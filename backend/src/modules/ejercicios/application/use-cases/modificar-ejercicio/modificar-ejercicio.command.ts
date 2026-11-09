import { GrupoMuscular } from "src/shared/domain/enums/grupo-muscular.enum";
import { TipoEjercicio } from "src/shared/domain/enums/tipo-ejercicio.enum";

export class ModificarEjercicioCommand {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly tipoEjercicio: TipoEjercicio,
    public readonly gruposMusculares?: GrupoMuscular[],
    public readonly observacion?: string,
    public readonly imagenUrl?: string,
  ) {}
}