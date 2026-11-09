import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { AlumnosController } from './adapters/in/http/alumnos.controller';

// ORM y Persistencia
import { AlumnoOrmEntity } from './adapters/out/persistence/orm-entities/alumno.orm-entity';
import { AlumnoTypeOrmRepository } from './adapters/out/persistence/alumno.typeorm.repository';
import { ALUMNO_REPOSITORY } from '../domain/repositories/alumno.repository';

// Puertos y Adaptadores de Shared
import { GENERADOR_ID } from '../../../shared/application/ports/generador-id.port';
import { RELOJ_PORT } from '../../../shared/application/ports/reloj.port';
import { UuidGeneradorIdAdapter } from '../../../shared/infrastructure/adapters/uuid-generador-id.adapter';
import { RelojSystemAdapter } from '../../../shared/infrastructure/adapters/reloj.system';

// Validators y Use Cases
import { AlumnoUnicoValidator } from '../application/validators/alumno-unico.validator';
import { CrearAlumnoUseCase } from '../application/use-cases/crear-alumno/crear-alumno.use-case';
import { ModificarAlumnoUseCase } from '../application/use-cases/modificar-alumno/modificar-alumno.use-case';
import { EliminarAlumnoUseCase } from '../application/use-cases/eliminar-alumno/eliminar-alumno.use-case';
import { ObtenerAlumnoUseCase } from '../application/use-cases/obtener-alumno/obtener-alumno.use-case';
import { ListarAlumnosUseCase } from '../application/use-cases/listar-alumnos/listar-alumnos.use-case';
import { VerificarExistenciaAlumnoUseCase } from '../application/use-cases/verificar-existencia-alumno/verificar-existencia-alumno.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([AlumnoOrmEntity])],
  controllers: [AlumnosController],
  providers: [
    // 1. Repositorio
    { provide: ALUMNO_REPOSITORY, useClass: AlumnoTypeOrmRepository },

    // 2. Puertos de Shared
    { provide: GENERADOR_ID, useClass: UuidGeneradorIdAdapter },
    { provide: RELOJ_PORT, useClass: RelojSystemAdapter },

    // 3. Validators
    AlumnoUnicoValidator,

    // 4. Use Cases
    CrearAlumnoUseCase,
    ModificarAlumnoUseCase,
    EliminarAlumnoUseCase,
    ObtenerAlumnoUseCase,
    ListarAlumnosUseCase,
    VerificarExistenciaAlumnoUseCase,
  ],
  exports: [VerificarExistenciaAlumnoUseCase],
})
export class AlumnosModule {}
