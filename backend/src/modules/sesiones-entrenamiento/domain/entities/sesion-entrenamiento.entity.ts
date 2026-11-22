import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { EstadoSesion } from '../enums/estado-sesion.enum';
import { EjercicioSesion } from './ejercicio-sesion.entity';
import { SerieEjercicio } from '../value-objects/serie-ejercicio.vo';
import { SesionYaFinalizadaException } from '../exceptions/sesion-ya-finalizada.exception';
import { SesionIncompletaException } from '../exceptions/sesion-incompleta.exception';
import { SesionIniciadaEvent } from '../events/sesion-iniciada.event';
import { SesionFinalizadaEvent } from '../events/sesion-finalizada.event';
import { ValidacionDeNegocioException } from '../../../../shared/domain/exceptions/validacion-de-negocio.exception';

export interface SesionEntrenamientoProps {
  id: string;
  alumnoId: string;
  planId: string;
  rutinaId: string;
  rutinaNumero: number;
  semana: number;
  estado: EstadoSesion;
  fechaInicio: Date;
  fechaFin: Date | null;
  bloqueCalentamientoCompletado: boolean;
  bloqueCardioCompletado: boolean | null;
  bloqueEstiramientoCompletado: boolean;
  ejercicios: EjercicioSesion[];
}

export class SesionEntrenamiento extends AggregateRoot<string> {
  private constructor(private readonly props: SesionEntrenamientoProps) {
    super(props.id);
  }

  static iniciar(params: {
    id: string;
    alumnoId: string;
    planId: string;
    rutinaId: string;
    rutinaNumero: number;
    semana: number;
    fechaInicio: Date;
    tieneCardio: boolean;
    ejercicios: EjercicioSesion[];
  }): SesionEntrenamiento {
    if (!params.id || params.id.trim().length === 0) {
      throw new ValidacionDeNegocioException('El id de la sesión es obligatorio.');
    }
    if (!params.alumnoId || params.alumnoId.trim().length === 0) {
      throw new ValidacionDeNegocioException('El alumnoId es obligatorio.');
    }
    if (!params.planId || params.planId.trim().length === 0) {
      throw new ValidacionDeNegocioException('El planId es obligatorio.');
    }
    if (!params.rutinaId || params.rutinaId.trim().length === 0) {
      throw new ValidacionDeNegocioException('El rutinaId es obligatorio.');
    }
    if (!Number.isInteger(params.rutinaNumero) || params.rutinaNumero < 1 || params.rutinaNumero > 3) {
      throw new ValidacionDeNegocioException('El número de rutina debe ser 1, 2 o 3.');
    }
    if (!Number.isInteger(params.semana) || params.semana < 1 || params.semana > 4) {
      throw new ValidacionDeNegocioException('La semana del plan debe estar entre 1 y 4.');
    }

    const sesion = new SesionEntrenamiento({
      id: params.id,
      alumnoId: params.alumnoId,
      planId: params.planId,
      rutinaId: params.rutinaId,
      rutinaNumero: params.rutinaNumero,
      semana: params.semana,
      estado: EstadoSesion.EN_CURSO,
      fechaInicio: params.fechaInicio,
      fechaFin: null,
      bloqueCalentamientoCompletado: false,
      bloqueCardioCompletado: params.tieneCardio ? false : null,
      bloqueEstiramientoCompletado: false,
      // Calentamiento, cardio y estiramiento se marcan como bloques, sin registro por ejercicio
      ejercicios: params.ejercicios.filter((e) => e.requiereRegistro()),
    });

    sesion.addDomainEvent(
      new SesionIniciadaEvent(
        sesion.getId(),
        sesion.getAlumnoId(),
        sesion.getRutinaId(),
        sesion.getPlanId(),
        sesion.getFechaInicio(),
      ),
    );

    return sesion;
  }

  static reconstituir(props: SesionEntrenamientoProps): SesionEntrenamiento {
    return new SesionEntrenamiento({
      ...props,
      ejercicios: [...props.ejercicios],
    });
  }

  getId(): string {
    return this.props.id;
  }

  getAlumnoId(): string {
    return this.props.alumnoId;
  }

  getPlanId(): string {
    return this.props.planId;
  }

  getRutinaId(): string {
    return this.props.rutinaId;
  }

  getRutinaNumero(): number {
    return this.props.rutinaNumero;
  }

  getSemana(): number {
    return this.props.semana;
  }

  getEstado(): EstadoSesion {
    return this.props.estado;
  }

  estaEnCurso(): boolean {
    return this.props.estado === EstadoSesion.EN_CURSO;
  }

  estaFinalizada(): boolean {
    return this.props.estado === EstadoSesion.FINALIZADA;
  }

  getFechaInicio(): Date {
    return this.props.fechaInicio;
  }

  getFechaFin(): Date | null {
    return this.props.fechaFin;
  }

  isBloqueCalentamientoCompletado(): boolean {
    return this.props.bloqueCalentamientoCompletado;
  }

  isBloqueCardioCompletado(): boolean | null {
    return this.props.bloqueCardioCompletado;
  }

  isBloqueEstiramientoCompletado(): boolean {
    return this.props.bloqueEstiramientoCompletado;
  }

  getEjercicios(): ReadonlyArray<EjercicioSesion> {
    return this.props.ejercicios;
  }

  /**
   * Registra una serie en un ejercicio específico durante la sesión.
   */
  registrarSerie(ejercicioId: string, numeroSerie: number, peso: number | string, repeticiones: number | string): void {
    this.asegurarEnCurso();

    const ejercicio = this.props.ejercicios.find((e) => e.getEjercicioId() === ejercicioId);
    if (!ejercicio) {
      throw new ValidacionDeNegocioException(`El ejercicio ${ejercicioId} no pertenece a esta sesión.`);
    }

    ejercicio.registrarSerie(numeroSerie, peso, repeticiones);
  }

  /**
   * Actualiza en lote el avance de la sesión en curso (CP-1A-05).
   */
  actualizarAvance(
    registros: Array<{
      ejercicioId: string;
      series: Array<{ numeroSerie: number; peso: number | string; repeticiones: number | string }>;
    }>,
    bloques?: {
      calentamientoCompletado?: boolean;
      cardioCompletado?: boolean;
      estiramientoCompletado?: boolean;
    },
  ): void {
    this.asegurarEnCurso();

    for (const reg of registros) {
      const ejercicio = this.props.ejercicios.find((e) => e.getEjercicioId() === reg.ejercicioId);
      if (ejercicio) {
        const seriesVo = reg.series.map((s) =>
          SerieEjercicio.crear({
            numeroSerie: s.numeroSerie,
            peso: s.peso,
            repeticiones: s.repeticiones,
          }),
        );
        ejercicio.actualizarSeries(seriesVo);
      }
    }

    if (bloques) {
      if (typeof bloques.calentamientoCompletado === 'boolean') {
        this.props.bloqueCalentamientoCompletado = bloques.calentamientoCompletado;
      }
      if (this.props.bloqueCardioCompletado !== null && typeof bloques.cardioCompletado === 'boolean') {
        this.props.bloqueCardioCompletado = bloques.cardioCompletado;
      }
      if (typeof bloques.estiramientoCompletado === 'boolean') {
        this.props.bloqueEstiramientoCompletado = bloques.estiramientoCompletado;
      }
    }
  }

  marcarCalentamiento(completado: boolean): void {
    this.asegurarEnCurso();
    this.props.bloqueCalentamientoCompletado = completado;
  }

  marcarCardio(completado: boolean): void {
    this.asegurarEnCurso();
    if (this.props.bloqueCardioCompletado === null) {
      throw new ValidacionDeNegocioException('Esta rutina no incluye bloque de cardio.');
    }
    this.props.bloqueCardioCompletado = completado;
  }

  marcarEstiramiento(completado: boolean): void {
    this.asegurarEnCurso();
    this.props.bloqueEstiramientoCompletado = completado;
  }

  /**
   * Finaliza la sesión validando los obligatorios: calentamiento, core y fuerza (CP-1A-08, CP-2A-01, CP-2A-02).
   * Cardio y estiramiento son opcionales y quedan registrados como realizados u omitidos (CA.6A.3, CP-6A-3).
   */
  finalizar(fechaFin: Date): void {
    this.asegurarEnCurso();

    const pendientes: string[] = [];

    // 1. Validar que calentamiento esté completado
    if (!this.props.bloqueCalentamientoCompletado) {
      pendientes.push('Calentamiento');
    }

    // 2. Validar que todos los ejercicios de fuerza y core tengan sus series registradas
    const ejerciciosIncompletos = this.props.ejercicios
      .filter((e) => !e.estaCompletado())
      .map((e) => e.getNombre());
    pendientes.push(...ejerciciosIncompletos);

    if (pendientes.length > 0) {
      throw new SesionIncompletaException(pendientes);
    }

    this.props.estado = EstadoSesion.FINALIZADA;
    this.props.fechaFin = fechaFin;

    this.addDomainEvent(
      new SesionFinalizadaEvent(
        this.getId(),
        this.getAlumnoId(),
        this.getRutinaId(),
        this.getPlanId(),
        fechaFin,
      ),
    );
  }

  private asegurarEnCurso(): void {
    if (this.props.estado === EstadoSesion.FINALIZADA) {
      throw new SesionYaFinalizadaException(this.props.id);
    }
  }
}

