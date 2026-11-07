import { Module } from '@nestjs/common';

// Use Cases
import { CrearPlanEntrenamientoUseCase } from '../application/use-cases/crear-plan-entrenamiento.use-case.ts/crear-plan-entrenamiento.use-case';

// Validators
import { AlumnoSinPlanActivoValidator } from '../application/validators/alumno-sin-plan-activo.validator';

// Domain (Factories, Repositorios)
import { PlanEntrenamientoFactory } from '../domain/factories/plan-entrenamiento.factory';
import { PLAN_ENTRENAMIENTO_REPOSITORY } from '../domain/repositories/plan-entrenamiento.repository';

// Puertos de Shared y otros módulos
import { ALUMNO_CONSULTA_PORT } from '../application/ports/alumno-consulta.ports';
import { GENERADOR_ID } from '../../../shared/application/ports/generador-id.port';
import { RELOJ_PORT } from '../../../shared/application/ports/reloj.port';

// Adaptadores (se crearán en la Tanda 3)
import { PlanEntrenamientoTypeOrmRepository } from './adapters/out/persistence/plan-entrenamiento.typeorm.repository';
//import { AlumnoConsultaAdapter } from './adapters/out/modules/alumno-consulta.adapter';
import { UuidGeneradorIdAdapter } from '../../../shared/infrastructure/adapters/uuid-generador-id.adapter';
import { RelojSystemAdapter } from '../../../shared/infrastructure/adapters/reloj.system';

// Controllers
import { PlanesEntrenamientoController } from './adapters/in/http/planes-entrenamiento.controller';

@Module({
  controllers: [PlanesEntrenamientoController],
  providers: [
    // 1. Repositorio
    { provide: PLAN_ENTRENAMIENTO_REPOSITORY, useClass: PlanEntrenamientoTypeOrmRepository },
    
    // 2. Puertos externos
    //{ provide: ALUMNO_CONSULTA_PORT, useClass: AlumnoConsultaAdapter },
    { provide: GENERADOR_ID, useClass: UuidGeneradorIdAdapter },
    { provide: RELOJ_PORT, useClass: RelojSystemAdapter },

    // 3. Factory (usando useFactory porque es dominio puro y no lleva @Injectable)
    {
      provide: PlanEntrenamientoFactory,
      useFactory: (generadorId: any) => new PlanEntrenamientoFactory(generadorId),
      inject: [GENERADOR_ID],
    },

    // 4. Validators y Use Cases
    AlumnoSinPlanActivoValidator,
    CrearPlanEntrenamientoUseCase,
  ],
})
export class PlanesEntrenamientoModule {}