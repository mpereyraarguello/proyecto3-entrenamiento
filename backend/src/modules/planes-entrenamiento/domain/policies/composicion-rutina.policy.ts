import { TipoEjercicio } from '../../../../shared/domain/enum/tipo-ejercicio.enum';
import { ValidacionDeNegocioException } from '../../../../shared/domain/exceptions/validacion-de-negocio.exception';
import {
  MAXIMO_EJERCICIOS_CARDIO_POR_RUTINA,
  MINIMO_EJERCICIOS_CORE_POR_RUTINA,
  MINIMO_EJERCICIOS_FUERZA_POR_RUTINA,
} from '../constants/reglas-plan.constants';

export interface ItemParaValidarComposicion {
  tipo: TipoEjercicio;
}

export class ComposicionRutinaPolicy {
  static validar(items: ReadonlyArray<ItemParaValidarComposicion>): void {
    const core = items.filter((i) => i.tipo === TipoEjercicio.CORE).length;
    const fuerza = items.filter((i) => i.tipo === TipoEjercicio.FUERZA).length;
    const cardio = items.filter((i) => i.tipo === TipoEjercicio.CARDIO).length;

    if (core < MINIMO_EJERCICIOS_CORE_POR_RUTINA) {
      throw new ValidacionDeNegocioException(
        `La rutina debe tener al menos ${MINIMO_EJERCICIOS_CORE_POR_RUTINA} ejercicios de core (tiene ${core}).`,
      );
    }
    if (fuerza < MINIMO_EJERCICIOS_FUERZA_POR_RUTINA) {
      throw new ValidacionDeNegocioException(
        `La rutina debe tener al menos ${MINIMO_EJERCICIOS_FUERZA_POR_RUTINA} ejercicios de fuerza (tiene ${fuerza}).`,
      );
    }
    if (cardio > MAXIMO_EJERCICIOS_CARDIO_POR_RUTINA) {
      throw new ValidacionDeNegocioException(
        `La rutina admite como máximo ${MAXIMO_EJERCICIOS_CARDIO_POR_RUTINA} ejercicio de cardio (tiene ${cardio}).`,
      );
    }
  }
}