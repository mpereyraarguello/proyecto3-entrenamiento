import { ValidacionDeNegocioException } from "src/shared/domain/exceptions/validacion-de-negocio.exception";

export class SeriesRepeticiones {
  private readonly series: number;
  private readonly repeticiones: number;

  private constructor(series: number, repeticiones: number) {
    this.series = series;
    this.repeticiones = repeticiones;
  }

  static crear(series: number, repeticiones: number): SeriesRepeticiones {
    if (!Number.isInteger(series) || series < 1) {
      throw new ValidacionDeNegocioException('La cantidad de series debe ser mayor a 0.');
    }
    if (!Number.isInteger(repeticiones) || repeticiones < 1) {
      throw new ValidacionDeNegocioException(
        'La cantidad de repeticiones debe ser mayor a 0.',
      );
    }
    return new SeriesRepeticiones(series, repeticiones);
  }

  getSeries(): number {
    return this.series;
  }

  getRepeticiones(): number {
    return this.repeticiones;
  }
}