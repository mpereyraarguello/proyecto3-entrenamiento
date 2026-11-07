import { ValidacionDeNegocioException } from 'src/shared/domain/exceptions/validacion-de-negocio.exception';
import { SeriesRepeticiones } from './series-repeticiones.vo';

export interface EntradaProgresion {
  semana: number;
  seriesRepeticiones: SeriesRepeticiones;
  rir: number;
}

/**
 * Tabla fija de progresión semanal para fuerza y core:
 *  S1: 3x12 RIR 3
 *  S2: 3x10 RIR 3
 *  S3: 4x8  RIR 3
 *  S4: 3x9  RIR 2
 */
export class ProgresionSemanal {
  private static readonly TABLA: ReadonlyArray<EntradaProgresion> = [
    { semana: 1, seriesRepeticiones: SeriesRepeticiones.crear(3, 12), rir: 3 },
    { semana: 2, seriesRepeticiones: SeriesRepeticiones.crear(3, 10), rir: 3 },
    { semana: 3, seriesRepeticiones: SeriesRepeticiones.crear(4, 8), rir: 3 },
    { semana: 4, seriesRepeticiones: SeriesRepeticiones.crear(3, 9), rir: 2 },
  ];

  private constructor() {}

  static obtener(): ReadonlyArray<EntradaProgresion> {
    return ProgresionSemanal.TABLA;
  }

  static paraSemana(semana: number): EntradaProgresion {
    const entrada = ProgresionSemanal.TABLA.find((e) => e.semana === semana);
    if (!entrada) {
      throw new ValidacionDeNegocioException(
        `La semana ${semana} no existe en la progresión semanal.`,
      );
    }
    return entrada;
  }
}