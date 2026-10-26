// ── Tipos compartidos entre módulos de gestionar-alumno ──────────────────────

export type ObjetivoAlumno =
  | 'Pérdida de peso'
  | 'Ganancia muscular'
  | 'Resistencia cardiovascular'
  | 'Flexibilidad y movilidad'
  | 'Rehabilitación'
  | 'Mantenimiento físico'
  | 'Rendimiento deportivo'
  | 'Tonificación'

export const OBJETIVOS_ALUMNO: ObjetivoAlumno[] = [
  'Pérdida de peso',
  'Ganancia muscular',
  'Resistencia cardiovascular',
  'Flexibilidad y movilidad',
  'Rehabilitación',
  'Mantenimiento físico',
  'Rendimiento deportivo',
  'Tonificación',
]

export interface Alumno {
  id: string
  nombre: string
  apellido: string
  dni: string
  telefono: string
  correo: string
  contrasenia: string
  objetivos: ObjetivoAlumno[]
  creadoEn: string
}

// Datos mockeados de un alumno ya cargado (usado en modificar-alumno)
export const ALUMNO_MOCK: Alumno = {
  id: '1001',
  nombre: 'Lucas',
  apellido: 'Fernández',
  dni: '38742156',
  telefono: '+54 9 11 5678-1234',
  correo: 'lucas.fernandez@gmail.com',
  contrasenia: 'lucas2024',
  objetivos: ['Ganancia muscular', 'Rendimiento deportivo'],
  creadoEn: '2024-03-15T10:30:00.000Z',
}

