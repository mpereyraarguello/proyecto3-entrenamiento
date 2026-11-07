import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjercicioController } from './adapters/in/http/ejercicio.controller';
import { CrearEjercicioUseCase } from '../application/use-cases/crear-ejercicio/crear-ejercicio.use-case';
import { EjercicioFinder } from '../application/finders/ejercicio.finder';
import { EjercicioQueryService } from '../application/services/ejercicio.query-service';
import { EJERCICIO_REPOSITORY } from '../domain/repositories/ejercicio.repository';
import { EjercicioTypeOrmRepository } from './adapters/out/persistence/ejercicio.typeorm.repository';
import { EjercicioOrmEntity } from './adapters/out/persistence/orm-entities/ejercicio.orm-entity';
import { EjercicioValidator } from '../application/validators/validar-nombre-ejercicio-unico.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([EjercicioOrmEntity]),
  ],
  controllers: [
    EjercicioController,
  ],
  providers: [
    // Use Cases (Escritura / Comandos)
    CrearEjercicioUseCase,

    // Validators
    EjercicioValidator,

    // Consultas / Lecturas (Query Side)
    EjercicioFinder,
    EjercicioQueryService,

    // Repositories (Puertos y Adaptadores)
    {
      provide: EJERCICIO_REPOSITORY,
      useClass: EjercicioTypeOrmRepository,
    },
  ],
  exports: [
    EJERCICIO_REPOSITORY,
    CrearEjercicioUseCase,
    EjercicioQueryService,
    EjercicioFinder,
  ],
})
export class EjercicioModule {}
