import { AggregateRoot } from '../../../../shared/domain/agregate-root.entity';
import { ValidacionDeNegocioException } from '../../../../shared/domain/exceptions/validacion-de-negocio.exception';
import { NumeroPlan } from '../value-objects/numero-plan.vo';
import { PeriodoPlan } from '../value-objects/periodo-plan.vo';
import { Pausa } from '../value-objects/pausa.vo';
import { Rutina } from './rutina.entity';
import { EstadoPlan } from '../enums/estado-plan.enums';
import { CANTIDAD_RUTINAS_POR_PLAN } from '../constants/reglas-plan.constants';
import { PlanConRutinasInvalidasException } from '../exceptions/plan-con-rutinas-invalidas.exception';
import { PlanCreadoEvent } from '../events/plan-creado.event';

export interface PlanEntrenamientoProps {
  id: string;
  alumnoId: string;
  objetivoId: string;
  nombre: string;
  numero: NumeroPlan;
  periodo: PeriodoPlan;
  microPausa: Pausa;
  macroPausa: Pausa;
  rutinas: Rutina[];
  calentamientoIds: string[];
  estiramientoIds: string[];
  cardioIds: string[];
  estado: EstadoPlan;
}

export class PlanEntrenamiento extends AggregateRoot<string> {
  private constructor(private readonly props: PlanEntrenamientoProps) {
    super(props.id);
  }

  static crear(params: {
    id: string;
    alumnoId: string;
    objetivoId: string;
    nombre: string;
    numero: NumeroPlan;
    periodo: PeriodoPlan;
    microPausa: Pausa;
    macroPausa: Pausa;
    rutinas: Rutina[];
    calentamientoIds: string[];
    estiramientoIds: string[];
    cardioIds: string[];
  }): PlanEntrenamiento {
    if (!params.id || params.id.trim().length === 0) {
      throw new ValidacionDeNegocioException('El id del plan es obligatorio.');
    }
    PlanEntrenamiento.validarCantidadRutinas(params.rutinas);
    if (!params.nombre || params.nombre.trim().length === 0) {
      throw new ValidacionDeNegocioException('El nombre del plan es obligatorio.');
    }
    if (!params.alumnoId) {
      throw new ValidacionDeNegocioException('El plan debe tener un alumno asignado.');
    }

    const plan = new PlanEntrenamiento({
      ...params,
      rutinas: [...params.rutinas],
      calentamientoIds: [...params.calentamientoIds],
      estiramientoIds: [...params.estiramientoIds],
      cardioIds: [...params.cardioIds],
      estado: EstadoPlan.ACTIVO,
    });

    plan.addDomainEvent(
      new PlanCreadoEvent(plan.getId(), plan.getAlumnoId(), new Date()),
    );
    return plan;
  }

  static reconstituir(props: PlanEntrenamientoProps): PlanEntrenamiento {
    return new PlanEntrenamiento({
      ...props,
      rutinas: [...props.rutinas],
      calentamientoIds: [...props.calentamientoIds],
      estiramientoIds: [...props.estiramientoIds],
      cardioIds: [...props.cardioIds],
    });
  }

  inactivar(): void {
    if (this.props.estado === EstadoPlan.INACTIVO) return;
    this.props.estado = EstadoPlan.INACTIVO;
  }

  marcarVencidoSiCorresponde(fechaActual: Date): void {
    if (this.props.periodo.estaVencido(fechaActual)) {
      this.props.estado = EstadoPlan.INACTIVO;
    }
  }

  estaActivo(): boolean { return this.props.estado === EstadoPlan.ACTIVO; }
  semanaActual(fechaActual: Date): number { return this.props.periodo.semanaActual(fechaActual); }

  getId(): string { return this.props.id; }
  getAlumnoId(): string { return this.props.alumnoId; }
  getObjetivoId(): string { return this.props.objetivoId; }
  getNombre(): string { return this.props.nombre; }
  getNumeroPlan(): number { return this.props.numero.getValor(); }
  getPeriodo(): PeriodoPlan { return this.props.periodo; }
  getMicroPausa(): Pausa { return this.props.microPausa; }
  getMacroPausa(): Pausa { return this.props.macroPausa; }
  getRutinas(): ReadonlyArray<Rutina> { return this.props.rutinas; }
  getCalentamientoIds(): ReadonlyArray<string> { return this.props.calentamientoIds; }
  getEstiramientoIds(): ReadonlyArray<string> { return this.props.estiramientoIds; }
  getCardioIds(): ReadonlyArray<string> { return this.props.cardioIds; }
  getEstado(): EstadoPlan { return this.props.estado; }

  private static validarCantidadRutinas(rutinas: Rutina[]): void {
    if (rutinas.length !== CANTIDAD_RUTINAS_POR_PLAN) {
      throw new PlanConRutinasInvalidasException(
        `El plan debe tener exactamente ${CANTIDAD_RUTINAS_POR_PLAN} rutinas (se recibieron ${rutinas.length}).`,
      );
    }
    const numeros = new Set(rutinas.map((r) => r.getNumero()));
    if (numeros.size !== rutinas.length) {
      throw new PlanConRutinasInvalidasException(
        'Las rutinas del plan no pueden repetir número.',
      );
    }
  }
}