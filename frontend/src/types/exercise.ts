export type ExerciseType = 'fuerza' | 'cardio' | 'core' | 'calentamiento' | 'estiramiento'

export type MuscleGroup = 
  | 'Tren Inferior'
  | 'Pecho'
  | 'Abdomen'
  | 'Espalda'
  | 'Hombros'
  | 'Brazos'

export interface Exercise {
  id: string
  nombre: string
  observacion: string
  imagenUrl: string
  grupoMuscular: MuscleGroup
  tipoEjercicio: ExerciseType
  createdAt: string
}

export const EXERCISE_TYPES: { id: ExerciseType; label: string; description: string }[] = [
  { id: 'fuerza', label: 'Fuerza', description: 'Cargas, hipertrofia y potencia' },
  { id: 'core', label: 'Core', description: 'Estabilidad abdominal y lumbar' },
  { id: 'cardio', label: 'Cardio', description: 'Resistencia cardiovascular y aeróbica' },
  { id: 'calentamiento', label: 'Calentamiento', description: 'Activación muscular previa' },
  { id: 'estiramiento', label: 'Estiramiento', description: 'Flexibilidad y movilidad articular' },
]

export const MUSCLE_GROUPS: { id: MuscleGroup; label: string;}[] = [
  { id: 'Tren Inferior', label: 'Piernas'},
  { id: 'Pecho', label: 'Pecho'},
  { id: 'Espalda', label: 'Espalda'},
  { id: 'Hombros', label: 'Hombros'},
  { id: 'Brazos', label: 'Brazos'},
  { id: 'Abdomen', label: 'Abdomen'},
]
