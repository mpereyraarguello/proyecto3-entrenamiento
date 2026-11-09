import { IsOptional, IsString } from 'class-validator';

export class ListarAlumnosQueryDto {
  @IsOptional()
  @IsString({ message: 'El término de búsqueda debe ser una cadena de texto.' })
  termino?: string;
}
