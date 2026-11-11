import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IniciarSesionDto } from './dtos/iniciar-sesion.dto';
import { RegistrarAvanceSesionDto } from './dtos/registrar-avance-sesion.dto';
import { FinalizarSesionDto } from './dtos/finalizar-sesion.dto';
import { MarcarBloqueSesionDto } from './dtos/marcar-bloque-sesion.dto';
import { IniciarSesionUseCase } from '../../../../application/use-cases/iniciar-sesion/iniciar-sesion.use-case';
import { IniciarSesionCommand } from '../../../../application/use-cases/iniciar-sesion/iniciar-sesion.command';
import { ConsultarSesionEnCursoUseCase } from '../../../../application/use-cases/consultar-sesion-en-curso/consultar-sesion-en-curso.use-case';
import { ConsultarSesionEnCursoCommand } from '../../../../application/use-cases/consultar-sesion-en-curso/consultar-sesion-en-curso.command';
import { RegistrarAvanceSesionUseCase } from '../../../../application/use-cases/registrar-avance-sesion/registrar-avance-sesion.use-case';
import { RegistrarAvanceSesionCommand } from '../../../../application/use-cases/registrar-avance-sesion/registrar-avance-sesion.command';
import { FinalizarSesionUseCase } from '../../../../application/use-cases/finalizar-sesion/finalizar-sesion.use-case';
import { FinalizarSesionCommand } from '../../../../application/use-cases/finalizar-sesion/finalizar-sesion.command';
import { MarcarBloqueSesionUseCase } from '../../../../application/use-cases/marcar-bloque-sesion/marcar-bloque-sesion.use-case';
import { MarcarBloqueSesionCommand } from '../../../../application/use-cases/marcar-bloque-sesion/marcar-bloque-sesion.command';
import { ConsultarHistorialSesionesPlanUseCase } from '../../../../application/use-cases/consultar-historial-sesiones-plan/consultar-historial-sesiones-plan.use-case';
import { ConsultarHistorialSesionesPlanCommand } from '../../../../application/use-cases/consultar-historial-sesiones-plan/consultar-historial-sesiones-plan.command';
import { ConsultarDetalleSesionHistorialUseCase } from '../../../../application/use-cases/consultar-detalle-sesion-historial/consultar-detalle-sesion-historial.use-case';
import { ConsultarDetalleSesionHistorialCommand } from '../../../../application/use-cases/consultar-detalle-sesion-historial/consultar-detalle-sesion-historial.command';
import { ConsultarPesoPrevioEjercicioUseCase } from '../../../../application/use-cases/consultar-peso-previo-ejercicio/consultar-peso-previo-ejercicio.use-case';
import { ConsultarPesoPrevioEjercicioCommand } from '../../../../application/use-cases/consultar-peso-previo-ejercicio/consultar-peso-previo-ejercicio.command';
import { ConsultarPlanesHistorialUseCase } from '../../../../application/use-cases/consultar-planes-historial/consultar-planes-historial.use-case';
import { ConsultarPlanesHistorialCommand } from '../../../../application/use-cases/consultar-planes-historial/consultar-planes-historial.command';
import { SesionEntrenamientoResponse } from '../../../../application/responses/sesion-entrenamiento.response';
import { PesoPrevioResponse } from '../../../../application/responses/peso-previo.response';
import { PlanHistorialResponse } from '../../../../application/responses/plan-historial.response';
import {
  HistorialSesionesPlanResponse,
  ItemHistorialSesionResponse,
} from '../../../../application/responses/historial-sesiones-plan.response';

@Controller('sesiones-entrenamiento')
export class SesionesEntrenamientoController {
  constructor(
    private readonly iniciarSesionUseCase: IniciarSesionUseCase,
    private readonly consultarSesionEnCursoUseCase: ConsultarSesionEnCursoUseCase,
    private readonly registrarAvanceSesionUseCase: RegistrarAvanceSesionUseCase,
    private readonly finalizarSesionUseCase: FinalizarSesionUseCase,
    private readonly marcarBloqueSesionUseCase: MarcarBloqueSesionUseCase,
    private readonly consultarHistorialSesionesPlanUseCase: ConsultarHistorialSesionesPlanUseCase,
    private readonly consultarDetalleSesionHistorialUseCase: ConsultarDetalleSesionHistorialUseCase,
    private readonly consultarPesoPrevioEjercicioUseCase: ConsultarPesoPrevioEjercicioUseCase,
    private readonly consultarPlanesHistorialUseCase: ConsultarPlanesHistorialUseCase,
  ) {}

  @Post('iniciar')
  async iniciar(@Body() dto: IniciarSesionDto): Promise<SesionEntrenamientoResponse> {
    const command = new IniciarSesionCommand(dto.alumnoId, dto.rutinaId);
    return this.iniciarSesionUseCase.execute(command);
  }

  @Get('en-curso/:alumnoId')
  async obtenerEnCurso(
    @Param('alumnoId') alumnoId: string,
  ): Promise<SesionEntrenamientoResponse | null> {
    const command = new ConsultarSesionEnCursoCommand(alumnoId);
    return this.consultarSesionEnCursoUseCase.execute(command);
  }

  @Put(':id/avance')
  async registrarAvance(
    @Param('id') id: string,
    @Body() dto: RegistrarAvanceSesionDto,
  ): Promise<SesionEntrenamientoResponse> {
    const command = new RegistrarAvanceSesionCommand(
      id,
      dto.alumnoId,
      dto.registros,
      dto.bloques,
    );
    return this.registrarAvanceSesionUseCase.execute(command);
  }

  @Patch(':id/bloques')
  async marcarBloque(
    @Param('id') id: string,
    @Body() dto: MarcarBloqueSesionDto,
  ): Promise<SesionEntrenamientoResponse> {
    const command = new MarcarBloqueSesionCommand(
      id,
      dto.alumnoId,
      dto.bloque,
      dto.completado,
    );
    return this.marcarBloqueSesionUseCase.execute(command);
  }

  @Post(':id/finalizar')
  async finalizar(
    @Param('id') id: string,
    @Body() dto: FinalizarSesionDto,
  ): Promise<SesionEntrenamientoResponse> {
    const command = new FinalizarSesionCommand(id, dto.alumnoId);
    return this.finalizarSesionUseCase.execute(command);
  }

  @Get('historial/:alumnoId')
  async consultarPlanesHistorial(
    @Param('alumnoId') alumnoId: string,
  ): Promise<PlanHistorialResponse[]> {
    const command = new ConsultarPlanesHistorialCommand(alumnoId);
    return this.consultarPlanesHistorialUseCase.execute(command);
  }

  @Get('historial/:alumnoId/:planId')
  async consultarHistorial(
    @Param('alumnoId') alumnoId: string,
    @Param('planId') planId: string,
  ): Promise<HistorialSesionesPlanResponse> {
    const command = new ConsultarHistorialSesionesPlanCommand(alumnoId, planId);
    return this.consultarHistorialSesionesPlanUseCase.execute(command);
  }

  @Get('historial-detalle/:id')
  async consultarDetalleHistorial(
    @Param('id') id: string,
    @Query('alumnoId') alumnoId: string,
  ): Promise<ItemHistorialSesionResponse> {
    const command = new ConsultarDetalleSesionHistorialCommand(id, alumnoId);
    return this.consultarDetalleSesionHistorialUseCase.execute(command);
  }

  @Get('peso-previo/:alumnoId/:ejercicioId')
  async obtenerPesoPrevio(
    @Param('alumnoId') alumnoId: string,
    @Param('ejercicioId') ejercicioId: string,
  ): Promise<PesoPrevioResponse> {
    const command = new ConsultarPesoPrevioEjercicioCommand(alumnoId, ejercicioId);
    return this.consultarPesoPrevioEjercicioUseCase.execute(command);
  }
}
