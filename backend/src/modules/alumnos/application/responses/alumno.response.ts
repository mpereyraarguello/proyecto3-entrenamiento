import { Alumno } from '../../domain/entities/alumno.entity';
import { ObjetivoAlumno } from '../../domain/enums/objetivo-alumno.enum';

export class AlumnoResponse {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly dni: string,
    public readonly telefono: string,
    public readonly correo: string,
    public readonly objetivos: ReadonlyArray<ObjetivoAlumno>,
    public readonly activo: boolean,
    public readonly creadoEn: string,
    public readonly actualizadoEn: string | null,
  ) {}

  static desdeDominio(alumno: Alumno): AlumnoResponse {
    return new AlumnoResponse(
      alumno.getId(),
      alumno.getNombre(),
      alumno.getApellido(),
      alumno.getDni(),
      alumno.getTelefono(),
      alumno.getCorreo().getValor(),
      alumno.getObjetivos(),
      alumno.estaActivo(),
      alumno.getCreadoEn().toISOString(),
      alumno.getActualizadoEn() ? alumno.getActualizadoEn()!.toISOString() : null,
    );
  }
}
