import { ValueObject } from '../../../../shared/domain/value-object.base';
import { Peso } from './peso.vo';
import { Repeticiones } from './repeticiones.vo';

interface SerieEjercicioProps {
  numeroSerie: number;
  peso: Peso;
  repeticiones: Repeticiones;
}

export class SerieEjercicio extends ValueObject<SerieEjercicioProps> {
  private constructor(props: SerieEjercicioProps) {
    super(props);
  }

  static crear(params: {
    numeroSerie: number;
    peso: number | string | Peso;
    repeticiones: number | string | Repeticiones;
  }): SerieEjercicio {
    if (!Number.isInteger(params.numeroSerie) || params.numeroSerie < 1) {
      throw new Error('El número de serie debe ser un entero positivo mayor o igual a 1.');
    }

    const pesoVo = params.peso instanceof Peso ? params.peso : Peso.crear(params.peso);
    const repsVo = params.repeticiones instanceof Repeticiones ? params.repeticiones : Repeticiones.crear(params.repeticiones);

    return new SerieEjercicio({
      numeroSerie: params.numeroSerie,
      peso: pesoVo,
      repeticiones: repsVo,
    });
  }

  getNumeroSerie(): number {
    return this.props.numeroSerie;
  }

  getPeso(): Peso {
    return this.props.peso;
  }

  getPesoValor(): number {
    return this.props.peso.getValor();
  }

  getRepeticiones(): Repeticiones {
    return this.props.repeticiones;
  }

  getRepeticionesValor(): number {
    return this.props.repeticiones.getValor();
  }
}

