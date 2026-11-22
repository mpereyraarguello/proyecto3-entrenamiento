import { Inject, Injectable } from '@nestjs/common';
import { IniciarSesionCommand } from './iniciar-sesion.command';
import { SesionEntrenamientoResponse } from '../../responses/sesion-entrenamiento.response';
import {
  SESION_ENTRENAMIENTO_REPOSITORY,
  type SesionEntrenamientoRepository,
} from '../../../domain/repositories/sesion-entrenamiento.repository';
import { GENERADOR_ID, type GeneradorId } from '../../../../../shared/application/ports/generador-id.port';
import { RELOJ_PORT, type RelojPort } from '../../../../../shared/application/ports/reloj.port';
import { ValidarPuedeIniciarSesionValidator } from '../../validators/validar-puede-iniciar-sesion.validator';
import { SesionEntrenamiento } from '../../../domain/entities/sesion-entrenamiento.entity';
import { EjercicioSesion } from '../../../domain/entities/ejercicio-sesion.entity';

@Injectable()
export class IniciarSesionUseCase {
  constructor(
    @Inject(SESION_ENTRENAMIENTO_REPOSITORY)
    private readonly sesionRepository: SesionEntrenamientoRepository,
    @Inject(GENERADOR_ID)
    private readonly generadorId: GeneradorId,
    @Inject(RELOJ_PORT)
    private readonly reloj: RelojPort,
    private readonly validator: ValidarPuedeIniciarSesionValidator,
  ) {}

  async execute(command: IniciarSesionCommand): Promise<SesionEntrenamientoResponse> {
    // 1. Validar que puede iniciar la sesión (plan activo, sin sesión en curso, rutina válida)
    const planInfo = await this.validator.validar(command.alumnoId, command.rutinaId);

    // 2. Construir los ejercicios de la sesión resolviendo el peso previo de cada uno (CA.1A.2, CP-1A-03, CP-1A-04)
    const ejerciciosSesion: EjercicioSesion[] = [];
    for (const item of planInfo.items) {
      const registroPrevio = await this.sesionRepository.findUltimoPesoEjercicio(
        command.alumnoId,
        item.ejercicioId,
      );

      const ejSesion = EjercicioSesion.crear({
        id: this.generadorId.generar(),
        ejercicioId: item.ejercicioId,
        nombre: item.nombre,
        tipo: item.tipo,
        orden: item.orden,
        seriesPlanificadas: item.seriesPlanificadas,
        repeticionesPlanificadas: item.repeticionesPlanificadas,
        rirPlanificado: item.rirPlanificado,
        pesoAnterior: registroPrevio ? registroPrevio.peso : null,
        repeticionesAnteriores: registroPrevio ? registroPrevio.repeticiones : null,
      });

      ejerciciosSesion.push(ejSesion);
    }

    // 3. Crear el agregado de dominio
    const sesion = SesionEntrenamiento.iniciar({
      id: this.generadorId.generar(),
      alumnoId: command.alumnoId,
      planId: planInfo.planId,
      rutinaId: planInfo.rutinaId,
      rutinaNumero: planInfo.rutinaNumero,
      semana: planInfo.semanaActual,
      fechaInicio: this.reloj.ahora(),
      tieneCardio: planInfo.tieneCardio,
      ejercicios: ejerciciosSesion,
    });

    // 4. Persistir
    await this.sesionRepository.save(sesion);

    // 5. Retornar response
    return SesionEntrenamientoResponse.desdeDominio(sesion);
  }
}

