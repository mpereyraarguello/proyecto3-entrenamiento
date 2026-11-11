import { Entity } from '../../../../shared/domain/entity.base';
import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';
import { SerieEjercicio } from '../value-objects/serie-ejercicio.vo';
import { Peso } from '../value-objects/peso.vo';
import { Repeticiones } from '../value-objects/repeticiones.vo';

export interface EjercicioSesionProps {
  id: string;
  ejercicioId: string;
  nombre: string;
  tipo: TipoEjercicio;
  orden: number;
  seriesPlanificadas: number;
  repeticionesPlanificadas: number;
  rirPlanificado: number;
  pesoAnterior: number | null;
  repeticionesAnteriores: number | null;
  series: SerieEjercicio[];
  completado: boolean;
}

export class EjercicioSesion extends Entity<string> {
  private constructor(private readonly props: EjercicioSesionProps) {
    super(props.id);
  }

  static crear(params: {
    id: string;
    ejercicioId: string;
    nombre: string;
    tipo: TipoEjercicio;
    orden: number;
    seriesPlanificadas: number;
    repeticionesPlanificadas: number;
    rirPlanificado: number;
    pesoAnterior?: number | null;
    repeticionesAnteriores?: number | null;
  }): EjercicioSesion {
    return new EjercicioSesion({
      id: params.id,
      ejercicioId: params.ejercicioId,
      nombre: params.nombre,
      tipo: params.tipo,
      orden: params.orden,
      seriesPlanificadas: params.seriesPlanificadas,
      repeticionesPlanificadas: params.repeticionesPlanificadas,
      rirPlanificado: params.rirPlanificado,
      pesoAnterior: params.pesoAnterior ?? null,
      repeticionesAnteriores: params.repeticionesAnteriores ?? null,
      series: [],
      completado: false,
    });
  }

  static reconstituir(props: EjercicioSesionProps): EjercicioSesion {
    return new EjercicioSesion({
      ...props,
      series: [...props.series],
    });
  }

  getEjercicioId(): string {
    return this.props.ejercicioId;
  }

  getNombre(): string {
    return this.props.nombre;
  }

  getTipo(): TipoEjercicio {
    return this.props.tipo;
  }

  getOrden(): number {
    return this.props.orden;
  }

  getSeriesPlanificadas(): number {
    return this.props.seriesPlanificadas;
  }

  getRepeticionesPlanificadas(): number {
    return this.props.repeticionesPlanificadas;
  }

  getRirPlanificado(): number {
    return this.props.rirPlanificado;
  }

  getPesoAnterior(): number | null {
    return this.props.pesoAnterior;
  }

  getRepeticionesAnteriores(): number | null {
    return this.props.repeticionesAnteriores;
  }

  getSeries(): ReadonlyArray<SerieEjercicio> {
    return this.props.series;
  }

  estaCompletado(): boolean {
    return this.props.completado;
  }

  /** Solo core y fuerza registran peso y repeticiones (CA.1A.5). */
  requiereRegistro(): boolean {
    return this.props.tipo === TipoEjercicio.CORE || this.props.tipo === TipoEjercicio.FUERZA;
  }

  /**
   * Registra o actualiza una serie realizada por el alumno.
   */
  registrarSerie(numeroSerie: number, peso: number | string | Peso, repeticiones: number | string | Repeticiones): void {
    const nuevaSerie = SerieEjercicio.crear({
      numeroSerie,
      peso,
      repeticiones,
    });

    const index = this.props.series.findIndex((s) => s.getNumeroSerie() === numeroSerie);
    if (index >= 0) {
      this.props.series[index] = nuevaSerie;
    } else {
      this.props.series.push(nuevaSerie);
      this.props.series.sort((a, b) => a.getNumeroSerie() - b.getNumeroSerie());
    }

    this.actualizarCompletado();
  }

  /**
   * Reemplaza el conjunto de series completas (útil al guardar avances en lote desde la pantalla).
   */
  actualizarSeries(series: SerieEjercicio[]): void {
    this.props.series = [...series].sort((a, b) => a.getNumeroSerie() - b.getNumeroSerie());
    this.actualizarCompletado();
  }

  // Un ejercicio está completo cuando se registraron todas sus series planificadas (CP-1A-08, CP-2A-02)
  private actualizarCompletado(): void {
    this.props.completado = this.props.series.length >= this.props.seriesPlanificadas;
  }
}

