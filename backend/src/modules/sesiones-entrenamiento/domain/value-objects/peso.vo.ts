import { ValueObject } from '../../../../shared/domain/value-object.base';
import { PesoInvalidoException } from '../exceptions/peso-invalido.exception';

interface PesoProps {
  valor: number;
}

export class Peso extends ValueObject<PesoProps> {
  private constructor(props: PesoProps) {
    super(props);
  }

  static crear(valor: number | string): Peso {
    let num: number;
    if (typeof valor === 'string') {
      const limpio = valor.trim().replace(',', '.');
      num = /^\d+(\.\d+)?$/.test(limpio) ? Number(limpio) : Number.NaN;
    } else {
      num = valor;
    }

    if (Number.isNaN(num) || !Number.isFinite(num) || num < 0) {
      throw new PesoInvalidoException('El peso debe ser un número válido mayor o igual a cero.');
    }

    // Redondeo a 2 decimales
    const redondeado = Math.round(num * 100) / 100;
    return new Peso({ valor: redondeado });
  }

  getValor(): number {
    return this.props.valor;
  }

  formateado(): string {
    return `${this.props.valor} kg`;
  }
}

