import { ValueObject } from '../../../../shared/domain/value-object.base';
import { RepeticionesInvalidasException } from '../exceptions/repeticiones-invalidas.exception';

interface RepeticionesProps {
  valor: number;
}

export class Repeticiones extends ValueObject<RepeticionesProps> {
  private constructor(props: RepeticionesProps) {
    super(props);
  }

  static crear(valor: number | string): Repeticiones {
    let num: number;
    if (typeof valor === 'string') {
      const limpio = valor.trim();
      num = /^\d+$/.test(limpio) ? Number(limpio) : Number.NaN;
    } else {
      num = valor;
    }

    if (!Number.isInteger(num) || num < 0) {
      throw new RepeticionesInvalidasException('Las repeticiones deben ser un número entero mayor o igual a cero.');
    }

    return new Repeticiones({ valor: num });
  }

  getValor(): number {
    return this.props.valor;
  }
}

