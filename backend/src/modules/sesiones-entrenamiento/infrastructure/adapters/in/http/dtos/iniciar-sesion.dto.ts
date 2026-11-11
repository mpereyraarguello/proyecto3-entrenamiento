import { IsNotEmpty, IsString } from 'class-validator';

export class IniciarSesionDto {
  @IsNotEmpty({ message: 'El alumnoId es obligatorio.' })
  @IsString({ message: 'El alumnoId debe ser una cadena de texto.' })
  alumnoId: string;

  @IsNotEmpty({ message: 'El rutinaId es obligatorio.' })
  @IsString({ message: 'El rutinaId debe ser una cadena de texto.' })
  rutinaId: string;
}

