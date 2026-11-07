import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';
import { GrupoMuscular } from '../../../../shared/domain/enums/grupo-muscular.enum';
import { EjercicioInvalidoException } from '../exceptions/ejercicio-invalido.exception';

export interface CrearEjercicioProps {
  nombre: string;
  tipoEjercicio: TipoEjercicio;
  gruposMusculares?: GrupoMuscular[];
  observacion?: string | null;
  imagenUrl?: string | null;
}

export interface ReconstituirEjercicioProps {
  id: number;
  nombre: string;
  tipoEjercicio: TipoEjercicio;
  gruposMusculares: GrupoMuscular[];
  observacion: string | null;
  imagenUrl: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface ModificarEjercicioProps {
  nombre: string;
  tipoEjercicio: TipoEjercicio;
  gruposMusculares?: GrupoMuscular[];
  observacion?: string | null;
  imagenUrl?: string | null;
}

export class Ejercicio extends AggregateRoot<number | null> {
  private _nombre: string;
  private _tipoEjercicio: TipoEjercicio;
  private _gruposMusculares: GrupoMuscular[];
  private _observacion: string | null;
  private _imagenUrl: string | null;
  private readonly _createdAt: Date;
  private _updatedAt?: Date | null;

  private constructor(
    id: number | null,
    nombre: string,
    tipoEjercicio: TipoEjercicio,
    gruposMusculares: GrupoMuscular[],
    observacion: string | null,
    imagenUrl: string | null,
    createdAt: Date,
    updatedAt?: Date | null,
  ) {
    super(id);
    this._nombre = nombre;
    this._tipoEjercicio = tipoEjercicio;
    this._gruposMusculares = gruposMusculares;
    this._observacion = observacion;
    this._imagenUrl = imagenUrl;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public static crear(props: CrearEjercicioProps): Ejercicio {
    const nombreLimpio = props.nombre?.trim();
    if (!nombreLimpio) {
      throw new EjercicioInvalidoException('El nombre es obligatorio.');
    }

    if (!props.tipoEjercicio) {
      throw new EjercicioInvalidoException('El tipo de ejercicio es obligatorio.');
    }

    const gruposValidados = Ejercicio.validarGruposMusculares(
      props.tipoEjercicio,
      props.gruposMusculares,
    );

    return new Ejercicio(
      null, // Se asigna automáticamente en la base de datos al persistir
      nombreLimpio,
      props.tipoEjercicio,
      gruposValidados,
      props.observacion?.trim() || null,
      props.imagenUrl?.trim() || null,
      new Date(),
    );
  }

  public static reconstituir(props: ReconstituirEjercicioProps): Ejercicio {
    return new Ejercicio(
      props.id,
      props.nombre,
      props.tipoEjercicio,
      [...props.gruposMusculares],
      props.observacion,
      props.imagenUrl,
      props.createdAt,
      props.updatedAt
    );
  }

  private static validarGruposMusculares(
    tipo: TipoEjercicio,
    grupos?: GrupoMuscular[],
  ): GrupoMuscular[] {
    const gruposLimpios = grupos ? grupos.filter((g) => g !== GrupoMuscular.SIN_GRUPO_MUSCULAR) : [];

    if (
      tipo === TipoEjercicio.CALENTAMIENTO ||
      tipo === TipoEjercicio.CARDIO ||
      tipo === TipoEjercicio.ESTIRAMIENTO
    ) {
      if (gruposLimpios.length > 0) {
        throw new EjercicioInvalidoException(
          `Los ejercicios de tipo "${tipo}" no deben tener grupos musculares asociados.`,
        );
      }
      return [GrupoMuscular.SIN_GRUPO_MUSCULAR];
    }

    if (tipo === TipoEjercicio.FUERZA || tipo === TipoEjercicio.CORE) {
      if (gruposLimpios.length === 0) {
        throw new EjercicioInvalidoException(
          `Los ejercicios de tipo "${tipo}" deben tener al menos un grupo muscular asignado.`,
        );
      }
      return Array.from(new Set(gruposLimpios));
    }

    return gruposLimpios;
  }

  public modificar(props: ModificarEjercicioProps): void {
    const nombreLimpio = props.nombre?.trim();
    if (!nombreLimpio) {
      throw new EjercicioInvalidoException('El nombre es obligatorio.');
    }
    if (!props.tipoEjercicio) {
      throw new EjercicioInvalidoException('El tipo de ejercicio es obligatorio.');
    }
    
    const gruposValidados = Ejercicio.validarGruposMusculares(
      props.tipoEjercicio,
      props.gruposMusculares,
    );
    this._nombre = nombreLimpio;
    this._tipoEjercicio = props.tipoEjercicio;
    this._gruposMusculares = gruposValidados;
    this._observacion = props.observacion !== undefined ? props.observacion?.trim() || null : this._observacion;
    this._imagenUrl = props.imagenUrl !== undefined ? props.imagenUrl?.trim() || null : this._imagenUrl;
    this._updatedAt = new Date();
  }

  get nombre(): string {
    return this._nombre;
  }

  get tipoEjercicio(): TipoEjercicio {
    return this._tipoEjercicio;
  }

  get gruposMusculares(): GrupoMuscular[] {
    return [...this._gruposMusculares];
  }

  get observacion(): string | null {
    return this._observacion;
  }

  get imagenUrl(): string | null {
    return this._imagenUrl;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | null | undefined {
    return this._updatedAt;
  }
}
