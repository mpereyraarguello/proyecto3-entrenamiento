import { IsNotEmpty, IsString } from 'class-validator';

export class FinalizarSesionDto {
  @IsNotEmpty({ message: 'El alumnoId es obligatorio.' })
  @IsString({ message: 'El alumnoId debe ser una cadena de texto.' })
  alumnoId: string;
}

