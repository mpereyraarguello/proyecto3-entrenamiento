import { ValidacionDeNegocioException } from 'src/shared/domain/exceptions/validacion-de-negocio.exception';
import { NUMEROS_RUTINA_VALIDOS } from '../constants/reglas-plan.constants';

export class NumeroRutina {
  private readonly valor: number;

  private constructor(valor: number) {
    this.valor = valor;
  }

  static crear(valor: number): NumeroRutina {
    if (!(NUMEROS_RUTINA_VALIDOS as readonly number[]).includes(valor)) {
      throw new ValidacionDeNegocioException (
        `El número de rutina debe ser uno de: ${NUMEROS_RUTINA_VALIDOS.join(', ')}.`,
      );
    }
    return new NumeroRutina(valor);
  }

  getValor(): number {
    return this.valor;
  }
}