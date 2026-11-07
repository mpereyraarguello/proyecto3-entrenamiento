import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EjercicioModule } from './modules/ejercicios/infrastructure/ejercicio.module';

@Module({
  imports: [
    EjercicioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
