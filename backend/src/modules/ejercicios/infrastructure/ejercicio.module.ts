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
import { ModificarEjercicioUseCase } from '../application/use-cases/modificar-ejercicio/modificar-ejercicio.use-case';
import { EliminarEjercicioUseCase } from '../application/use-cases/eliminar-ejercicio/eliminar-ejercicio.use-case';
import { ValidarEjercicioNoEnRutinaActivaValidator } from '../application/validators/validar-ejercicio-no-en-rutina-activa.validator';
import { VERIFICADOR_EJERCICIO_PORT } from '../application/ports/verificador-ejercicio-en-rutina-activa.port';
import { VerificarEjercicioEnRutinaActivaUseCase } from 'src/modules/planes-entrenamiento/application/use-cases/verificar-ejercicio-en-rutina-activa/verificar-ejercicio-en-rutina-activa.use-case';
import { VerificadorEjercicioEnRutinaActivaAdapter } from './adapters/out/modules/verificador-ejercicio-en-rutina-activa.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([EjercicioOrmEntity]),
  ],
  controllers: [
    EjercicioController,
  ],
  providers: [
    CrearEjercicioUseCase,
    ModificarEjercicioUseCase,
    EliminarEjercicioUseCase,
    EjercicioValidator,
    EjercicioFinder,
    EjercicioQueryService,
    ValidarEjercicioNoEnRutinaActivaValidator,
    {
      provide: EJERCICIO_REPOSITORY,
      useClass: EjercicioTypeOrmRepository,
    },
    {
      provide: VERIFICADOR_EJERCICIO_PORT,
      useClass: VerificadorEjercicioEnRutinaActivaAdapter, //este es el que se conecta con plan-entrenamiento
    },
  ],
  exports: [
    EJERCICIO_REPOSITORY,
    CrearEjercicioUseCase,
    EjercicioQueryService,
    EjercicioFinder,
    ModificarEjercicioUseCase,
    EliminarEjercicioUseCase,
  ],
})
export class EjercicioModule {}
