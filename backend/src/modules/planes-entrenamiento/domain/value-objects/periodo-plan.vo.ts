import { PeriodoPlanInvalidoException } from '../exceptions/periodo-plan-invalido.exceptions';
import {
  DIAS_POR_SEMANA,
  DURACION_PLAN_EN_DIAS,
  DURACION_PLAN_EN_SEMANAS,
} from '../constants/reglas-plan.constants';

export class PeriodoPlan {
  private static readonly MS_POR_DIA = 24 * 60 * 60 * 1000;

  private constructor(
    private readonly inicio: Date,
    private readonly fin: Date,
  ) {}

  static crear(inicio: Date, fin: Date): PeriodoPlan {
    if (!(inicio instanceof Date) || isNaN(inicio.getTime())) {
      throw new PeriodoPlanInvalidoException('La fecha de inicio no es válida.');
    }
    if (!(fin instanceof Date) || isNaN(fin.getTime())) {
      throw new PeriodoPlanInvalidoException('La fecha de fin no es válida.');
    }
    if (fin.getTime() <= inicio.getTime()) {
      throw new PeriodoPlanInvalidoException(
        'La fecha de fin debe ser posterior a la fecha de inicio.',
      );
    }

    const dias = PeriodoPlan.diferenciaEnDias(inicio, fin);
    if (dias !== DURACION_PLAN_EN_DIAS) {
      throw new PeriodoPlanInvalidoException(
        `El plan debe durar exactamente ${DURACION_PLAN_EN_SEMANAS} semanas (${DURACION_PLAN_EN_DIAS} días).`,
      );
    }
    return new PeriodoPlan(inicio, fin);
  }

  /**
   * Crea un período a partir del inicio, calculando el fin
   * como inicio + 28 días.
   */
  static desdeInicio(inicio: Date): PeriodoPlan {
    if (!(inicio instanceof Date) || isNaN(inicio.getTime())) {
      throw new PeriodoPlanInvalidoException('La fecha de inicio no es válida.');
    }
    const fin = new Date(
      inicio.getTime() + DURACION_PLAN_EN_DIAS * PeriodoPlan.MS_POR_DIA,
    );
    return new PeriodoPlan(inicio, fin);
  }

  getInicio(): Date {
    return this.inicio;
  }

  getFin(): Date {
    return this.fin;
  }

  /**
   * Devuelve la semana actual (1..4). Si la fecha es anterior al inicio,
   * devuelve 1; si es posterior al fin, devuelve 4.
   */
  semanaActual(fechaActual: Date): number {
    const dias = PeriodoPlan.diferenciaEnDias(this.inicio, fechaActual);
    if (dias < 0) return 1;
    const semana = Math.floor(dias / DIAS_POR_SEMANA) + 1;
    return Math.min(semana, DURACION_PLAN_EN_SEMANAS);
  }

  estaVencido(fechaActual: Date): boolean {
    return fechaActual.getTime() > this.fin.getTime();
  }

  private static diferenciaEnDias(a: Date, b: Date): number {
    const ms = b.getTime() - a.getTime();
    return Math.round(ms / PeriodoPlan.MS_POR_DIA);
  }
}