import { PlanEntrenamiento } from '../../../../../domain/entities/plan-entrenamiento.entity';
import { PlanEntrenamientoOrmEntity } from '../orm-entities/plan-entrenamiento.orm-entity';
import { RutinaOrmEntity } from '../orm-entities/rutina.orm-entity';
import { ItemRutinaOrmEntity } from '../orm-entities/item-rutina.orm-entity';

import { Rutina } from '../../../../../domain/entities/rutina.entity';
import { ItemRutina } from '../../../../../domain/entities/item-rutina.entity';
import { NumeroPlan } from '../../../../../domain/value-objects/numero-plan.vo';
import { NumeroRutina } from '../../../../../domain/value-objects/numero-rutina.vo';
import { PeriodoPlan } from '../../../../../domain/value-objects/periodo-plan.vo';
import { Pausa } from '../../../../../domain/value-objects/pausa.vo';
import { SeriesRepeticiones } from '../../../../../domain/value-objects/series-repeticiones.vo';
import { EstadoPlan } from '../../../../../domain/enums/estado-plan.enums';
import { TipoEjercicio } from '../../../../../../../shared/domain/enums/tipo-ejercicio.enum';

export class PlanEntrenamientoPersistenceMapper {
  
  // ── ORM → Dominio (Reconstitución) ────────────────────────
  
  static toDomain(orm: PlanEntrenamientoOrmEntity): PlanEntrenamiento {
    const rutinasDominio = orm.rutinas.map((r) => this.toRutinaDomain(r));

    return PlanEntrenamiento.reconstituir({
      id: orm.id,
      alumnoId: orm.alumnoId,
      objetivoId: orm.objetivoId,
      nombre: orm.nombre,
      numero: NumeroPlan.crear(orm.numeroPlan),
      periodo: PeriodoPlan.crear(orm.fechaInicio, orm.fechaFin),
      microPausa: Pausa.crear({
        minutos: orm.microPausaMinutos,
        segundos: orm.microPausaSegundos,
      }),
      macroPausa: Pausa.crear({
        minutos: orm.macroPausaMinutos,
        segundos: orm.macroPausaSegundos,
      }),
      rutinas: rutinasDominio,
      calentamientoIds: orm.calentamientoIds || [],
      estiramientoIds: orm.estiramientoIds || [],
      cardioIds: orm.cardioIds || [],
      estado: orm.estado as EstadoPlan,
    });
  }

  private static toRutinaDomain(orm: RutinaOrmEntity): Rutina {
    const itemsDominio = orm.items.map((i) => this.toItemRutinaDomain(i));

    return Rutina.reconstituir({
      id: orm.id,
      numero: NumeroRutina.crear(orm.numero),
      items: itemsDominio,
    });
  }

  private static toItemRutinaDomain(orm: ItemRutinaOrmEntity): ItemRutina {
    const seriesRep = 
      orm.series !== null && orm.repeticiones !== null
        ? SeriesRepeticiones.crear(orm.series, orm.repeticiones)
        : null;

    return ItemRutina.reconstituir({
      id: orm.id,
      ejercicioId: orm.ejercicioId,
      tipo: orm.tipo as TipoEjercicio,
      pesoInicialRecomendado: orm.pesoInicialRecomendado,
      observacion: orm.observacion,
      seriesRepeticiones: seriesRep,
      orden: orm.orden,
    });
  }

  // ── Dominio → ORM (Persistencia) ──────────────────────────

  static toOrm(dominio: PlanEntrenamiento): PlanEntrenamientoOrmEntity {
    const orm = new PlanEntrenamientoOrmEntity();
    
    orm.id = dominio.getId();
    orm.alumnoId = dominio.getAlumnoId();
    orm.objetivoId = dominio.getObjetivoId();
    orm.nombre = dominio.getNombre();
    orm.numeroPlan = dominio.getNumeroPlan();
    orm.fechaInicio = dominio.getPeriodo().getInicio();
    orm.fechaFin = dominio.getPeriodo().getFin();
    
    orm.microPausaMinutos = dominio.getMicroPausa().getMinutos();
    orm.microPausaSegundos = dominio.getMicroPausa().getSegundos();
    orm.macroPausaMinutos = dominio.getMacroPausa().getMinutos();
    orm.macroPausaSegundos = dominio.getMacroPausa().getSegundos();
    
    orm.estado = dominio.getEstado();
    orm.calentamientoIds = [...dominio.getCalentamientoIds()];
    orm.estiramientoIds = [...dominio.getEstiramientoIds()];
    orm.cardioIds = [...dominio.getCardioIds()];

    orm.rutinas = dominio.getRutinas().map((r) => {
      const rutinaOrm = new RutinaOrmEntity();
      rutinaOrm.id = r.getId();
      rutinaOrm.numero = r.getNumero();
      rutinaOrm.planId = orm.id;
      
      rutinaOrm.items = r.getItems().map((i) => {
        const itemOrm = new ItemRutinaOrmEntity();
        itemOrm.id = i.getId();
        itemOrm.ejercicioId = i.getEjercicioId();
        itemOrm.tipo = i.getTipo();
        itemOrm.pesoInicialRecomendado = i.getPesoInicialRecomendado();
        itemOrm.observacion = i.getObservacion();
        itemOrm.series = i.getSeriesRepeticiones()?.getSeries() ?? null;
        itemOrm.repeticiones = i.getSeriesRepeticiones()?.getRepeticiones() ?? null;
        itemOrm.orden = i.getOrden();
        itemOrm.rutinaId = rutinaOrm.id;
        return itemOrm;
      });

      return rutinaOrm;
    });

    return orm;
  }
}