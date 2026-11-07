import { PausaInvalidaException } from '../exceptions/pausa-invalida.exception';

export interface PausaProps {
  minutos: number;
  segundos: number;
}

export class Pausa {
  private readonly minutos: number;
  private readonly segundos: number;

  private constructor(props: PausaProps) {
    this.minutos = props.minutos;
    this.segundos = props.segundos;
  }

  static crear(props: PausaProps): Pausa {
    if (!Number.isInteger(props.minutos) || props.minutos < 0) {
      throw new PausaInvalidaException(
        'Los minutos de la pausa deben ser un entero mayor o igual a 0.',
      );
    }
    if (
      !Number.isInteger(props.segundos) ||
      props.segundos < 0 ||
      props.segundos > 59
    ) {
      throw new PausaInvalidaException(
        'Los segundos de la pausa deben ser un entero entre 0 y 59.',
      );
    }
    return new Pausa(props);
  }

  getMinutos(): number {
    return this.minutos;
  }

  getSegundos(): number {
    return this.segundos;
  }

  equals(otra: Pausa): boolean {
    return (
      this.minutos === otra.minutos && this.segundos === otra.segundos
    );
  }
}