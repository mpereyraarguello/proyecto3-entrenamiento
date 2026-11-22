import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EstadoPlan } from 'src/modules/planes-entrenamiento/domain/enums/estado-plan.enums';

export class ListarPlanesQueryDto {
  @IsString()
  @IsNotEmpty()
  alumnoId?: string;

  @IsEnum(EstadoPlan)
  @IsOptional()
  estado?: EstadoPlan;
}