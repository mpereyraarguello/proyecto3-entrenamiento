import { IsNotEmpty, IsString } from 'class-validator';

export class ListarPlanesQueryDto {
  @IsString()
  @IsNotEmpty()
  alumnoId: string;
}