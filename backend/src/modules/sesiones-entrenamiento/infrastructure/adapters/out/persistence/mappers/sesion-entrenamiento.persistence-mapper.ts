import { SesionEntrenamientoOrmEntity } from '../orm-entities/sesion-entrenamiento.orm-entity';
import { EjercicioSesionOrmEntity } from '../orm-entities/ejercicio-sesion.orm-entity';
import { SerieEjercicioOrmEntity } from '../orm-entities/serie-ejercicio.orm-entity';
import { SesionEntrenamiento } from '../../../../../domain/entities/sesion-entrenamiento.entity';
import { EjercicioSesion } from '../../../../../domain/entities/ejercicio-sesion.entity';
import { SerieEjercicio } from '../../../../../domain/value-objects/serie-ejercicio.vo';
import { EstadoSesion } from '../../../../../domain/enums/estado-sesion.enum';
import { TipoEjercicio } from '../../../../../../../shared/domain/enums/tipo-ejercicio.enum';

export class SesionEntrenamientoPersistenceMapper {
  static toDomain(orm: SesionEntrenamientoOrmEntity): SesionEntrenamiento {
    const ejerciciosOrdenados = [...(orm.ejercicios || [])].sort((a, b) => a.orden - b.orden);
    const ejerciciosDomain = ejerciciosOrdenados.map((ejOrm) => {
      const seriesOrdenadas = [...(ejOrm.series || [])].sort((a, b) => a.numeroSerie - b.numeroSerie);
      const seriesDomain = seriesOrdenadas.map((sOrm) =>
        SerieEjercicio.crear({
          numeroSerie: sOrm.numeroSerie,
          peso: Number(sOrm.peso),
          repeticiones: sOrm.repeticiones,
        }),
      );

      return EjercicioSesion.reconstituir({
        id: ejOrm.id,
        ejercicioId: ejOrm.ejercicioId,
        nombre: ejOrm.nombre,
        tipo: ejOrm.tipo as TipoEjercicio,
        orden: ejOrm.orden,
        seriesPlanificadas: ejOrm.seriesPlanificadas,
        repeticionesPlanificadas: ejOrm.repeticionesPlanificadas,
        rirPlanificado: ejOrm.rirPlanificado,
        pesoAnterior: ejOrm.pesoAnterior !== null ? Number(ejOrm.pesoAnterior) : null,
        repeticionesAnteriores: ejOrm.repeticionesAnteriores,
        series: seriesDomain,
        completado: ejOrm.completado,
      });
    });

    return SesionEntrenamiento.reconstituir({
      id: orm.id,
      alumnoId: orm.alumnoId,
      planId: orm.planId,
      rutinaId: orm.rutinaId,
      rutinaNumero: orm.rutinaNumero,
      semana: orm.semana,
      estado: orm.estado as EstadoSesion,
      fechaInicio: orm.fechaInicio,
      fechaFin: orm.fechaFin,
      bloqueCalentamientoCompletado: orm.bloqueCalentamientoCompletado,
      bloqueCardioCompletado: orm.bloqueCardioCompletado,
      bloqueEstiramientoCompletado: orm.bloqueEstiramientoCompletado,
      ejercicios: ejerciciosDomain,
    });
  }

  static toOrm(domain: SesionEntrenamiento): SesionEntrenamientoOrmEntity {
    const orm = new SesionEntrenamientoOrmEntity();
    orm.id = domain.getId();
    orm.alumnoId = domain.getAlumnoId();
    orm.planId = domain.getPlanId();
    orm.rutinaId = domain.getRutinaId();
    orm.rutinaNumero = domain.getRutinaNumero();
    orm.semana = domain.getSemana();
    orm.estado = domain.getEstado();
    orm.fechaInicio = domain.getFechaInicio();
    orm.fechaFin = domain.getFechaFin();
    orm.bloqueCalentamientoCompletado = domain.isBloqueCalentamientoCompletado();
    orm.bloqueCardioCompletado = domain.isBloqueCardioCompletado();
    orm.bloqueEstiramientoCompletado = domain.isBloqueEstiramientoCompletado();

    orm.ejercicios = domain.getEjercicios().map((ejDomain) => {
      const ejOrm = new EjercicioSesionOrmEntity();
      ejOrm.id = ejDomain.id;
      ejOrm.sesionId = domain.getId();
      ejOrm.ejercicioId = ejDomain.getEjercicioId();
      ejOrm.nombre = ejDomain.getNombre();
      ejOrm.tipo = ejDomain.getTipo();
      ejOrm.orden = ejDomain.getOrden();
      ejOrm.seriesPlanificadas = ejDomain.getSeriesPlanificadas();
      ejOrm.repeticionesPlanificadas = ejDomain.getRepeticionesPlanificadas();
      ejOrm.rirPlanificado = ejDomain.getRirPlanificado();
      ejOrm.pesoAnterior = ejDomain.getPesoAnterior();
      ejOrm.repeticionesAnteriores = ejDomain.getRepeticionesAnteriores();
      ejOrm.completado = ejDomain.estaCompletado();

      ejOrm.series = ejDomain.getSeries().map((sDomain) => {
        const sOrm = new SerieEjercicioOrmEntity();
        sOrm.id = `${ejDomain.id}_s${sDomain.getNumeroSerie()}`;
        sOrm.ejercicioSesionId = ejDomain.id;
        sOrm.numeroSerie = sDomain.getNumeroSerie();
        sOrm.peso = sDomain.getPesoValor();
        sOrm.repeticiones = sDomain.getRepeticionesValor();
        return sOrm;
      });

      return ejOrm;
    });

    return orm;
  }
}
