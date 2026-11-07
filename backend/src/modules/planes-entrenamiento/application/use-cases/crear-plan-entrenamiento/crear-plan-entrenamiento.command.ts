import { TipoEjercicio } from '../../../../../shared/domain/enums/tipo-ejercicio.enum';

export class CrearItemRutinaCommand {
  constructor(
    public readonly ejercicioId: string,
    public readonly tipo: TipoEjercicio,
    public readonly pesoInicialRecomendado: number | null,
    public readonly observacion: string | null,
  ) {}
}

export class CrearRutinaCommand {
  constructor(public readonly items: CrearItemRutinaCommand[]) {}
}

export class CrearPlanEntrenamientoCommand {
  constructor(
    public readonly alumnoId: string,
    public readonly objetivoId: string,
    public readonly nombre: string,
    public readonly fechaInicio: Date,
    public readonly microPausa: { minutos: number; segundos: number },
    public readonly macroPausa: { minutos: number; segundos: number },
    public readonly rutinas: CrearRutinaCommand[],
    public readonly calentamientoIds: string[],
    public readonly estiramientoIds: string[],
    public readonly cardioIds: string[],
  ) {}
}