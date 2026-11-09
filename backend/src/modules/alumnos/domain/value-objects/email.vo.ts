import { ValueObject } from '../../../../shared/domain/value-object.base';
import { AlumnoInvalidoException } from '../exceptions/alumno-invalido.exception';

interface EmailProps {
  valor: string;
}

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static crear(valor: string): Email {
    const correoLimpio = valor?.trim().toLowerCase();

    if (!correoLimpio) {
      throw new AlumnoInvalidoException('El correo electrónico es obligatorio.');
    }

    if (correoLimpio.length > 100) {
      throw new AlumnoInvalidoException(
        'El correo electrónico no puede superar los 100 caracteres.',
      );
    }

    if (!REGEX_EMAIL.test(correoLimpio)) {
      throw new AlumnoInvalidoException(
        'El formato del correo electrónico no es válido.',
      );
    }

    return new Email({ valor: correoLimpio });
  }

  getValor(): string {
    return this.props.valor;
  }
}
