import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';
import { SeriesRepeticiones } from '../value-objects/series-repeticiones.vo';
import { ValidacionDeNegocioException } from '../../../../shared/domain/exceptions/validacion-de-negocio.exception';

export interface ItemRutinaProps {
  id: string;
  ejercicioId: string;
  tipo: TipoEjercicio;
  pesoInicialRecomendado: number | null;
  observacion: string | null;
  seriesRepeticiones: SeriesRepeticiones | null;
  orden: number;
}

export class ItemRutina {
  private constructor(private readonly props: ItemRutinaProps) {}

  /**
   * Crea un ítem nuevo dentro de una rutina.
   * El `id` lo provee la factory (generado con el GeneradorIdPort).
   */
  static crear(params: {
    id: string;
    ejercicioId: string;
    tipo: TipoEjercicio;
    pesoInicialRecomendado?: number | null;
    observacion?: string | null;
    seriesRepeticiones?: SeriesRepeticiones | null;
    orden: number;
  }): ItemRutina {
    if (!params.id || params.id.trim().length === 0) {
      throw new ValidacionDeNegocioException('El id del ítem es obligatorio.');
    }
    if (!params.ejercicioId || params.ejercicioId.trim().length === 0) {
      throw new ValidacionDeNegocioException('El ejercicioId del ítem es obligatorio.');
    }
    if (!Number.isInteger(params.orden) || params.orden < 1) {
      throw new ValidacionDeNegocioException(
        'El orden del ítem debe ser mayor o igual a 1.',
      );
    }
    if (
      params.pesoInicialRecomendado !== undefined &&
      params.pesoInicialRecomendado !== null &&
      params.pesoInicialRecomendado < 0
    ) {
      throw new ValidacionDeNegocioException(
        'El peso inicial recomendado no puede ser negativo.',
      );
    }

    return new ItemRutina({
      id: params.id,
      ejercicioId: params.ejercicioId,
      tipo: params.tipo,
      pesoInicialRecomendado: params.pesoInicialRecomendado ?? null,
      observacion: params.observacion ?? null,
      seriesRepeticiones: params.seriesRepeticiones ?? null,
      orden: params.orden,
    });
  }

  /**
   * Reconstituye un ítem desde persistencia. No dispara reglas ni eventos.
   */
  static reconstituir(props: ItemRutinaProps): ItemRutina {
    return new ItemRutina({ ...props });
  }

  getId(): string { return this.props.id; }
  getEjercicioId(): string { return this.props.ejercicioId; }
  getTipo(): TipoEjercicio { return this.props.tipo; }
  getPesoInicialRecomendado(): number | null { return this.props.pesoInicialRecomendado; }
  getObservacion(): string | null { return this.props.observacion; }
  getSeriesRepeticiones(): SeriesRepeticiones | null { return this.props.seriesRepeticiones; }
  getOrden(): number { return this.props.orden; }
}