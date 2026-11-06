import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';
import { GrupoMuscular } from '../../../../shared/domain/enums/grupo-muscular.enum';
import { EjercicioInvalidoException } from '../exceptions/ejercicio-invalido.exception';

export interface CrearEjercicioProps {
  id: string;
  nombre: string;
  tipoEjercicio: TipoEjercicio;
  gruposMusculares?: GrupoMuscular[];
  observacion?: string | null;
  imagenUrl?: string | null;
}

export interface ReconstituirEjercicioProps {
  id: string;
  nombre: string;
  tipoEjercicio: TipoEjercicio;
  gruposMusculares: GrupoMuscular[];
  observacion: string | null;
  imagenUrl: string | null;
  createdAt: Date;
}

export class Ejercicio extends AggregateRoot<string> {
  private _nombre: string;
  private _tipoEjercicio: TipoEjercicio;
  private _gruposMusculares: GrupoMuscular[];
  private _observacion: string | null;
  private _imagenUrl: string | null;
  private readonly _createdAt: Date;

  private constructor(
    id: string,
    nombre: string,
    tipoEjercicio: TipoEjercicio,
    gruposMusculares: GrupoMuscular[],
    observacion: string | null,
    imagenUrl: string | null,
    createdAt: Date,
  ) {
    super(id);
    this._nombre = nombre;
    this._tipoEjercicio = tipoEjercicio;
    this._gruposMusculares = gruposMusculares;
    this._observacion = observacion;
    this._imagenUrl = imagenUrl;
    this._createdAt = createdAt;
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
      props.id,
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
    );
  }

  private static validarGruposMusculares(
    tipo: TipoEjercicio,
    grupos?: GrupoMuscular[],
  ): GrupoMuscular[] {
    const gruposLimpios = grupos ? grupos.filter(g => g !== GrupoMuscular.SIN_GRUPO_MUSCULAR) : [];

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
      // Eliminar duplicados si los hubiera
      return Array.from(new Set(gruposLimpios));
    }

    return gruposLimpios;
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
}
