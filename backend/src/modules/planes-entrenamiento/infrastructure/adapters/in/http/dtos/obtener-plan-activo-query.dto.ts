import { IsNotEmpty, IsString } from 'class-validator';

export class ObtenerPlanActivoQueryDto {
  @IsString()
  @IsNotEmpty()
  alumnoId: string;
}