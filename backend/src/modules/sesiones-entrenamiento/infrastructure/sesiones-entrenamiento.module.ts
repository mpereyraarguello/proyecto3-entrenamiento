import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entidades ORM
import { SesionEntrenamientoOrmEntity } from './adapters/out/persistence/orm-entities/sesion-entrenamiento.orm-entity';
import { EjercicioSesionOrmEntity } from './adapters/out/persistence/orm-entities/ejercicio-sesion.orm-entity';
import { SerieEjercicioOrmEntity } from './adapters/out/persistence/orm-entities/serie-ejercicio.orm-entity';

// Controlador
import { SesionesEntrenamientoController } from './adapters/in/http/sesiones-entrenamiento.controller';

// Repositorio y persistencia
import { SESION_ENTRENAMIENTO_REPOSITORY } from '../domain/repositories/sesion-entrenamiento.repository';
import { SesionEntrenamientoTypeOrmRepository } from './adapters/out/persistence/sesion-entrenamiento.typeorm.repository';

// Puertos y adaptadores
import { PLAN_CONSULTA_PORT } from '../application/ports/plan-consulta.port';
import { PlanConsultaAdapter } from './adapters/out/modules/plan-consulta.adapter';
import { GENERADOR_ID } from '../../../shared/application/ports/generador-id.port';
import { RELOJ_PORT } from '../../../shared/application/ports/reloj.port';
import { UuidGeneradorIdAdapter } from '../../../shared/infrastructure/adapters/uuid-generador-id.adapter';
import { RelojSystemAdapter } from '../../../shared/infrastructure/adapters/reloj.system';

// Validators
import { ValidarPuedeIniciarSesionValidator } from '../application/validators/validar-puede-iniciar-sesion.validator';

// Use Cases
import { IniciarSesionUseCase } from '../application/use-cases/iniciar-sesion/iniciar-sesion.use-case';
import { ConsultarSesionEnCursoUseCase } from '../application/use-cases/consultar-sesion-en-curso/consultar-sesion-en-curso.use-case';
import { RegistrarAvanceSesionUseCase } from '../application/use-cases/registrar-avance-sesion/registrar-avance-sesion.use-case';
import { FinalizarSesionUseCase } from '../application/use-cases/finalizar-sesion/finalizar-sesion.use-case';
import { MarcarBloqueSesionUseCase } from '../application/use-cases/marcar-bloque-sesion/marcar-bloque-sesion.use-case';
import { ConsultarHistorialSesionesPlanUseCase } from '../application/use-cases/consultar-historial-sesiones-plan/consultar-historial-sesiones-plan.use-case';
import { ConsultarDetalleSesionHistorialUseCase } from '../application/use-cases/consultar-detalle-sesion-historial/consultar-detalle-sesion-historial.use-case';
import { ConsultarPesoPrevioEjercicioUseCase } from '../application/use-cases/consultar-peso-previo-ejercicio/consultar-peso-previo-ejercicio.use-case';
import { ConsultarPlanesHistorialUseCase } from '../application/use-cases/consultar-planes-historial/consultar-planes-historial.use-case';

// Otros módulos necesarios para los puertos
import { PlanesEntrenamientoModule } from '../../planes-entrenamiento/infrastructure/planes-entrenamiento.module';
import { EjercicioModule } from '../../ejercicios/infrastructure/ejercicio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SesionEntrenamientoOrmEntity,
      EjercicioSesionOrmEntity,
      SerieEjercicioOrmEntity,
    ]),
    PlanesEntrenamientoModule,
    EjercicioModule,
  ],
  controllers: [SesionesEntrenamientoController],
  providers: [
    // 1. Repositorio principal
    {
      provide: SESION_ENTRENAMIENTO_REPOSITORY,
      useClass: SesionEntrenamientoTypeOrmRepository,
    },

    // 2. Puertos hacia otros módulos y shared
    {
      provide: PLAN_CONSULTA_PORT,
      useClass: PlanConsultaAdapter,
    },
    {
      provide: GENERADOR_ID,
      useClass: UuidGeneradorIdAdapter,
    },
    {
      provide: RELOJ_PORT,
      useClass: RelojSystemAdapter,
    },

    // 3. Validators
    ValidarPuedeIniciarSesionValidator,

    // 4. Use Cases
    IniciarSesionUseCase,
    ConsultarSesionEnCursoUseCase,
    RegistrarAvanceSesionUseCase,
    FinalizarSesionUseCase,
    MarcarBloqueSesionUseCase,
    ConsultarHistorialSesionesPlanUseCase,
    ConsultarDetalleSesionHistorialUseCase,
    ConsultarPesoPrevioEjercicioUseCase,
    ConsultarPlanesHistorialUseCase,
  ],
  exports: [
    SESION_ENTRENAMIENTO_REPOSITORY,
    IniciarSesionUseCase,
    ConsultarSesionEnCursoUseCase,
    RegistrarAvanceSesionUseCase,
    FinalizarSesionUseCase,
    MarcarBloqueSesionUseCase,
    ConsultarHistorialSesionesPlanUseCase,
    ConsultarDetalleSesionHistorialUseCase,
    ConsultarPesoPrevioEjercicioUseCase,
    ConsultarPlanesHistorialUseCase,
  ],
})
export class SesionesEntrenamientoModule {}

