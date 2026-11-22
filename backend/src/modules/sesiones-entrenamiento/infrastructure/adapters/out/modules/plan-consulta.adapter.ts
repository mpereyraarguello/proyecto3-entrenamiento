import { Inject, Injectable } from '@nestjs/common';
import {
  PlanConsultaPort,
  PlanActivoConRutinaInfo,
  ItemRutinaInfo,
} from '../../../../application/ports/plan-consulta.port';
import {
  PLAN_ENTRENAMIENTO_REPOSITORY,
  type PlanEntrenamientoRepository,
} from '../../../../../planes-entrenamiento/domain/repositories/plan-entrenamiento.repository';
import {
  EJERCICIO_REPOSITORY,
  type IEjercicioRepository,
} from '../../../../../ejercicios/domain/repositories/ejercicio.repository';
import { RELOJ_PORT, type RelojPort } from '../../../../../../shared/application/ports/reloj.port';
import { TipoEjercicio } from '../../../../../../shared/domain/enums/tipo-ejercicio.enum';
import { ProgresionSemanal } from '../../../../../planes-entrenamiento/domain/value-objects/progresion-semanal.vo';

@Injectable()
export class PlanConsultaAdapter implements PlanConsultaPort {
  constructor(
    @Inject(PLAN_ENTRENAMIENTO_REPOSITORY)
    private readonly planRepo: PlanEntrenamientoRepository,
    @Inject(EJERCICIO_REPOSITORY)
    private readonly ejercicioRepo: IEjercicioRepository,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
  ) {}

  async obtenerPlanActivoConRutina(
    alumnoId: string,
    rutinaId: string,
  ): Promise<PlanActivoConRutinaInfo | null> {
    const plan = await this.planRepo.findActivoByAlumno(alumnoId);
    if (!plan || !plan.estaActivo()) {
      return null;
    }

    const ahora = this.reloj.ahora();
    const estaVencido = plan.getPeriodo().estaVencido(ahora);

    // Calcular semana dentro del plan (1 a 4)
    let semana = 1;
    try {
      semana = plan.semanaActual(ahora);
    } catch {
      semana = 1;
    }
    semana = Math.min(4, Math.max(1, semana));

    const rutina = plan.getRutinas().find((r) => r.getId() === rutinaId);
    if (!rutina) {
      return null;
    }

    const entradaProg = ProgresionSemanal.paraSemana(semana);

    const items: ItemRutinaInfo[] = [];
    for (const item of rutina.getItems()) {
      let nombre = `Ejercicio ${item.getEjercicioId()}`;
      try {
        const idNum = Number(item.getEjercicioId());
        if (!Number.isNaN(idNum)) {
          const ejEntidad = await this.ejercicioRepo.buscarPorId(idNum);
          if (ejEntidad) {
            nombre = ejEntidad.nombre;
          }
        }
      } catch {
        // En caso de no encontrar en el repo, conservamos el fallback
      }

      const esFuerzaOCore =
        item.getTipo() === TipoEjercicio.CORE || item.getTipo() === TipoEjercicio.FUERZA;

      const seriesPlanificadas = esFuerzaOCore
        ? entradaProg.seriesRepeticiones.getSeries()
        : item.getSeriesRepeticiones()
        ? item.getSeriesRepeticiones()!.getSeries()
        : 1;

      const repeticionesPlanificadas = esFuerzaOCore
        ? entradaProg.seriesRepeticiones.getRepeticiones()
        : item.getSeriesRepeticiones()
        ? item.getSeriesRepeticiones()!.getRepeticiones()
        : 0;

      const rirPlanificado = esFuerzaOCore ? entradaProg.rir : 0;

      items.push({
        ejercicioId: item.getEjercicioId(),
        nombre,
        tipo: item.getTipo(),
        orden: item.getOrden(),
        seriesPlanificadas,
        repeticionesPlanificadas,
        rirPlanificado,
        pesoInicialRecomendado: item.getPesoInicialRecomendado(),
        observacion: item.getObservacion(),
      });
    }

    // Ordenar los ítems por su número de orden
    items.sort((a, b) => a.orden - b.orden);

    return {
      planId: plan.getId(),
      estaActivo: plan.estaActivo(),
      estaVencido,
      semanaActual: semana,
      rutinaId: rutina.getId(),
      rutinaNumero: rutina.getNumero(),
      tieneCardio:
        plan.getCardioIds().length > 0 || items.some((i) => i.tipo === TipoEjercicio.CARDIO),
      items,
    };
  }
}
