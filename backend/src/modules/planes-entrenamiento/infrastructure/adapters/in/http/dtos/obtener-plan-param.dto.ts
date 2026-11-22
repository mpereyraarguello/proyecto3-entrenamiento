import { IsNotEmpty, IsString } from 'class-validator';

export class ObtenerPlanParamDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}