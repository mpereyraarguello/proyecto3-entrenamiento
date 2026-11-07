import { ValidacionDeNegocioException } from "src/shared/domain/exceptions/validacion-de-negocio.exception";


export class NumeroPlan {
  private readonly valor: number;

  private constructor(valor: number) {
    this.valor = valor;
  }

  static crear(valor: number): NumeroPlan {
    if (!Number.isInteger(valor) || valor < 1) {
      throw new ValidacionDeNegocioException(
        'El número de plan debe ser un entero mayor o igual a 1.',
      );
    }
    return new NumeroPlan(valor);
  }

  getValor(): number {
    return this.valor;
  }
}