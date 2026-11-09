import type { Exercise } from '../types/exercise'

export const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 'sample-squat-1',
    nombre: 'Sentadilla con barra',
    observacion: 'Mantener la columna neutra, pecho erguido y bajar controladamente flexionando caderas y rodillas hasta los 90°. Empujar con los talones.',
    imagenUrl: '/exercise-example.png',
    grupoMuscular: 'Tren Inferior',
    tipoEjercicio: 'fuerza',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'sample-press-2',
    nombre: 'Press de banca plano',
    observacion: 'Retraer escápulas, apoyar los pies firmemente en el suelo y descender la barra hasta rozar la parte media del esternón. Espirar al empujar.',
    imagenUrl: '/exercise-example.png',
    grupoMuscular: 'Pecho',
    tipoEjercicio: 'fuerza',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'sample-plank-3',
    nombre: 'Plancha abdominal isométrica',
    observacion: 'Alinear talones, cadera y hombros. Contraer glúteos y transverso abdominal sin que se hunda la zona lumbar. Respiración constante.',
    imagenUrl: '/exercise-example.png',
    grupoMuscular: 'Abdomen',
    tipoEjercicio: 'core',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'sample-rope-4',
    nombre: 'Salto con soga continuo',
    observacion: 'Mantener el salto suave apoyando el metatarso, codos pegados al cuerpo y giros de muñeca controlados.',
    imagenUrl: '/exercise-example.png',
    grupoMuscular: 'Tren Inferior',
    tipoEjercicio: 'cardio',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'sample-warmup-5',
    nombre: 'Rotaciones articulares y movilidad de hombros',
    observacion: 'Movilidad dinámica de hombros y escápulas previa al entrenamiento de fuerza con pesas.',
    imagenUrl: '/exercise-example.png',
    grupoMuscular: 'Hombros',
    tipoEjercicio: 'calentamiento',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'sample-stretch-6',
    nombre: 'Estiramiento profundo de isquiotibiales',
    observacion: 'Mantener la espalda recta al inclinarse hacia delante. Sostener de 20 a 30 segundos sin rebotes.',
    imagenUrl: '/exercise-example.png',
    grupoMuscular: 'Tren Inferior',
    tipoEjercicio: 'estiramiento',
    createdAt: new Date().toISOString(),
  },
]

