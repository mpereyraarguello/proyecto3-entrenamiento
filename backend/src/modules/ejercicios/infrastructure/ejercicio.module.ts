import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjercicioController } from './adapters/in/http/ejercicio.controller';
import { CrearEjercicioUseCase } from '../application/use-cases/crear-ejercicio/crear-ejercicio.use-case';
import { ListarEjerciciosUseCase } from '../application/use-cases/listar-ejercicios/listar-ejercicios.use-case';
import { ConsultarEjercicioUseCase } from '../application/use-cases/consultar-ejercicio/consultar-ejercicio.use-case';
import { ValidarNombreEjercicioUnicoValidator } from '../application/validators/validar-nombre-ejercicio-unico.validator';
import { EJERCICIO_REPOSITORY } from '../domain/repositories/ejercicio.repository';
import { EjercicioTypeOrmRepository } from './adapters/out/persistence/ejercicio.typeorm.repository';
import { EjercicioOrmEntity } from './adapters/out/persistence/orm-entities/ejercicio.orm-entity';
import { GENERADOR_ID } from '../../../shared/application/ports/generador-id.port';
import { UuidGeneradorIdAdapter } from '../../../shared/infrastructure/adapters/uuid-generador-id.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([EjercicioOrmEntity]),
  ],
  controllers: [
    EjercicioController,
  ],
  providers: [
    // Use Cases
    CrearEjercicioUseCase,
    ListarEjerciciosUseCase,
    ConsultarEjercicioUseCase,

    // Validators
    ValidarNombreEjercicioUnicoValidator,

    // Repositories (Puertos y Adaptadores)
    {
      provide: EJERCICIO_REPOSITORY,
      useClass: EjercicioTypeOrmRepository,
    },

    // Shared Ports
    {
      provide: GENERADOR_ID,
      useClass: UuidGeneradorIdAdapter,
    },
  ],
  exports: [
    EJERCICIO_REPOSITORY,
    CrearEjercicioUseCase,
    ListarEjerciciosUseCase,
    ConsultarEjercicioUseCase,
  ],
})
export class EjercicioModule {}
