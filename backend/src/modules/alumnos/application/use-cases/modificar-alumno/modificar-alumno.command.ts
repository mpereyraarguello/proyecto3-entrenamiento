import { ObjetivoAlumno } from '../../../domain/enums/objetivo-alumno.enum';

export class ModificarAlumnoCommand {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly dni: string,
    public readonly telefono: string,
    public readonly correo: string,
    public readonly contrasenia: string,
    public readonly objetivos: ObjetivoAlumno[],
  ) {}
}
