import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EjercicioModule } from './modules/ejercicios/infrastructure/ejercicio.module';
import { AlumnosModule } from './modules/alumnos/infrastructure/alumnos.module';
import { SesionesEntrenamientoModule } from './modules/sesiones-entrenamiento/infrastructure/sesiones-entrenamiento.module';

@Module({
  imports: [
    EjercicioModule,
    AlumnosModule,
    SesionesEntrenamientoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
