import { PlanEntrenamiento } from '../entities/plan-entrenamiento.entity';
import { Rutina } from '../entities/rutina.entity';
import { ItemRutina } from '../entities/item-rutina.entity';
import { NumeroPlan } from '../value-objects/numero-plan.vo';
import { NumeroRutina } from '../value-objects/numero-rutina.vo';
import { PeriodoPlan } from '../value-objects/periodo-plan.vo';
import { Pausa } from '../value-objects/pausa.vo';
import { SeriesRepeticiones } from '../value-objects/series-repeticiones.vo';
import { GeneradorId } from '../../../../shared/application/ports/generador-id.port';
import { TipoEjercicio } from '../../../../shared/domain/enums/tipo-ejercicio.enum';

export interface CrearItemRutinaInput {
  ejercicioId: string;
  tipo: TipoEjercicio;
  pesoInicialRecomendado?: number | null;
  observacion?: string | null;
  seriesRepeticiones?: SeriesRepeticiones | null;
}

export interface CrearRutinaInput {
  items: CrearItemRutinaInput[];
}

export interface CrearPlanEntrenamientoInput {
  alumnoId: string;
  objetivoId: string;
  nombre: string;
  fechaInicio: Date;
  numeroPlan: number;
  microPausa: Pausa;
  macroPausa: Pausa;
  rutinas: CrearRutinaInput[];
  calentamientoIds: string[];
  estiramientoIds: string[];
  cardioIds: string[];
}

/**
 * Factory de PlanEntrenamiento.
 *
 * - Vive en domain/ porque construye agregados (no tiene @Injectable,
 *   no conoce Nest, no conoce TypeORM).
 * - Recibe el GeneradorIdPort ya resuelto por el use case: el dominio
 *   no genera ids propios, se los pasan.
 * - Solo sirve para CREAR. Reconstituir desde BD es responsabilidad
 *   del mapper de persistencia.
 */
export class PlanEntrenamientoFactory {
  constructor(private readonly generadorId: GeneradorId) {}

  crear(input: CrearPlanEntrenamientoInput): PlanEntrenamiento {
    const planId = this.generadorId.generar();

    const rutinas = input.rutinas.map((rutinaInput, idx) =>
      this.crearRutina(rutinaInput, idx + 1),
    );

    const periodo = PeriodoPlan.desdeInicio(input.fechaInicio);
    const numero = NumeroPlan.crear(input.numeroPlan);

    return PlanEntrenamiento.crear({
      id: planId,
      alumnoId: input.alumnoId,
      objetivoId: input.objetivoId,
      nombre: input.nombre,
      numero,
      periodo,
      microPausa: input.microPausa,
      macroPausa: input.macroPausa,
      rutinas,
      calentamientoIds: input.calentamientoIds,
      estiramientoIds: input.estiramientoIds,
      cardioIds: input.cardioIds,
    });
  }

  private crearRutina(input: CrearRutinaInput, numero: number): Rutina {
    const rutinaId = this.generadorId.generar();

    const items = input.items.map((itemInput, idx) => {
      const itemId = this.generadorId.generar();
      return ItemRutina.crear({
        id: itemId,
        ejercicioId: itemInput.ejercicioId,
        tipo: itemInput.tipo,
        pesoInicialRecomendado: itemInput.pesoInicialRecomendado ?? null,
        observacion: itemInput.observacion ?? null,
        seriesRepeticiones: itemInput.seriesRepeticiones ?? null,
        orden: idx + 1,
      });
    });

    return Rutina.crear({
      id: rutinaId,
      numero: NumeroRutina.crear(numero),
      items,
    });
  }
}