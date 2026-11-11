import { TipoBloqueSesion } from '../../../domain/enums/tipo-bloque-sesion.enum';

export class MarcarBloqueSesionCommand {
  constructor(
    public readonly sesionId: string,
    public readonly alumnoId: string,
    public readonly tipoBloque: TipoBloqueSesion,
    public readonly completado: boolean,
  ) {}
}

