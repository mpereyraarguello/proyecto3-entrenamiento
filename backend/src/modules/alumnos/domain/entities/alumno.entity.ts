import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { Email } from '../value-objects/email.vo';
import { ObjetivoAlumno } from '../enums/objetivo-alumno.enum';
import { AlumnoInvalidoException } from '../exceptions/alumno-invalido.exception';
import { AlumnoCreadoEvent } from '../events/alumno-creado.event';

export interface AlumnoProps {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: Email;
  contrasenia: string;
  objetivos: ObjetivoAlumno[];
  activo: boolean;
  creadoEn: Date;
  actualizadoEn: Date | null;
  bajaEn: Date | null;
}

export interface CrearAlumnoParams {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: Email;
  contrasenia: string;
  objetivos: ObjetivoAlumno[];
  fechaActual: Date;
}

export interface ModificarAlumnoParams {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: Email;
  contrasenia: string;
  objetivos: ObjetivoAlumno[];
  fechaActual: Date;
}

const REGEX_DNI = /^\d{7,8}$/;
const REGEX_TELEFONO = /^[\d\s+\-()]{7,20}$/;
const MIN_LONGITUD_CONTRASENIA = 6;
const MAX_LONGITUD_NOMBRE = 50;

export class Alumno extends AggregateRoot<string> {
  private constructor(private readonly props: AlumnoProps) {
    super(props.id);
  }

  static crear(params: CrearAlumnoParams): Alumno {
    if (!params.id || params.id.trim().length === 0) {
      throw new AlumnoInvalidoException('El identificador del alumno es obligatorio.');
    }

    const nombreLimpio = Alumno.validarNombre(params.nombre, 'nombre');
    const apellidoLimpio = Alumno.validarNombre(params.apellido, 'apellido');
    const dniLimpio = Alumno.validarDni(params.dni);
    const telefonoLimpio = Alumno.validarTelefono(params.telefono);
    const contraseniaValidada = Alumno.validarContrasenia(params.contrasenia);
    const objetivosUnicos = Alumno.validarObjetivos(params.objetivos);

    const alumno = new Alumno({
      id: params.id.trim(),
      nombre: nombreLimpio,
      apellido: apellidoLimpio,
      dni: dniLimpio,
      telefono: telefonoLimpio,
      correo: params.correo,
      contrasenia: contraseniaValidada,
      objetivos: objetivosUnicos,
      activo: true,
      creadoEn: params.fechaActual,
      actualizadoEn: null,
      bajaEn: null,
    });

    alumno.addDomainEvent(
      new AlumnoCreadoEvent(
        alumno.getId(),
        alumno.getCorreo().getValor(),
        params.fechaActual,
      ),
    );

    return alumno;
  }

  static reconstituir(props: AlumnoProps): Alumno {
    return new Alumno({
      ...props,
      objetivos: [...props.objetivos],
    });
  }

  modificar(params: ModificarAlumnoParams): void {
    if (!this.props.activo) {
      throw new AlumnoInvalidoException(
        'No se puede modificar un alumno que se encuentra dado de baja.',
      );
    }

    const nombreLimpio = Alumno.validarNombre(params.nombre, 'nombre');
    const apellidoLimpio = Alumno.validarNombre(params.apellido, 'apellido');
    const dniLimpio = Alumno.validarDni(params.dni);
    const telefonoLimpio = Alumno.validarTelefono(params.telefono);
    const contraseniaValidada = Alumno.validarContrasenia(params.contrasenia);
    const objetivosUnicos = Alumno.validarObjetivos(params.objetivos);

    this.props.nombre = nombreLimpio;
    this.props.apellido = apellidoLimpio;
    this.props.dni = dniLimpio;
    this.props.telefono = telefonoLimpio;
    this.props.correo = params.correo;
    this.props.contrasenia = contraseniaValidada;
    this.props.objetivos = objetivosUnicos;
    this.props.actualizadoEn = params.fechaActual;
  }

  darDeBaja(fechaActual: Date): void {
    if (!this.props.activo) {
      throw new AlumnoInvalidoException('El alumno ya se encuentra dado de baja.');
    }
    this.props.activo = false;
    this.props.bajaEn = fechaActual;
    this.props.actualizadoEn = fechaActual;
  }

  getId(): string {
    return this.props.id;
  }

  getNombre(): string {
    return this.props.nombre;
  }

  getApellido(): string {
    return this.props.apellido;
  }

  getDni(): string {
    return this.props.dni;
  }

  getTelefono(): string {
    return this.props.telefono;
  }

  getCorreo(): Email {
    return this.props.correo;
  }

  getContrasenia(): string {
    return this.props.contrasenia;
  }

  getObjetivos(): ReadonlyArray<ObjetivoAlumno> {
    return [...this.props.objetivos];
  }

  estaActivo(): boolean {
    return this.props.activo;
  }

  getCreadoEn(): Date {
    return this.props.creadoEn;
  }

  getActualizadoEn(): Date | null {
    return this.props.actualizadoEn;
  }

  getBajaEn(): Date | null {
    return this.props.bajaEn;
  }

  private static validarNombre(valor: string, campo: 'nombre' | 'apellido'): string {
    const limpio = valor?.trim();
    if (!limpio) {
      throw new AlumnoInvalidoException(`El ${campo} es obligatorio.`);
    }
    if (limpio.length > MAX_LONGITUD_NOMBRE) {
      throw new AlumnoInvalidoException(
        `El ${campo} no puede superar los ${MAX_LONGITUD_NOMBRE} caracteres.`,
      );
    }
    return limpio;
  }

  private static validarDni(dni: string): string {
    const limpio = dni?.trim();
    if (!limpio) {
      throw new AlumnoInvalidoException('El DNI es obligatorio.');
    }
    if (!REGEX_DNI.test(limpio)) {
      throw new AlumnoInvalidoException(
        'El DNI debe tener 7 u 8 dígitos numéricos.',
      );
    }
    return limpio;
  }

  private static validarTelefono(telefono: string): string {
    const limpio = telefono?.trim();
    if (!limpio) {
      throw new AlumnoInvalidoException('El teléfono es obligatorio.');
    }
    if (!REGEX_TELEFONO.test(limpio)) {
      throw new AlumnoInvalidoException(
        'El teléfono debe tener un formato válido de entre 7 y 20 caracteres.',
      );
    }
    return limpio;
  }

  private static validarContrasenia(contrasenia: string): string {
    if (!contrasenia || contrasenia.length < MIN_LONGITUD_CONTRASENIA) {
      throw new AlumnoInvalidoException(
        `La contraseña debe tener al menos ${MIN_LONGITUD_CONTRASENIA} caracteres.`,
      );
    }
    return contrasenia;
  }

  private static validarObjetivos(
    objetivos: ObjetivoAlumno[],
  ): ObjetivoAlumno[] {
    if (!objetivos || objetivos.length === 0) {
      throw new AlumnoInvalidoException(
        'El alumno debe tener al menos un objetivo asignado.',
      );
    }
    const valoresValidos = new Set(Object.values(ObjetivoAlumno));
    for (const obj of objetivos) {
      if (!valoresValidos.has(obj)) {
        throw new AlumnoInvalidoException(
          `El objetivo "${obj}" no pertenece a la lista de objetivos válidos.`,
        );
      }
    }
    return Array.from(new Set(objetivos));
  }
}
