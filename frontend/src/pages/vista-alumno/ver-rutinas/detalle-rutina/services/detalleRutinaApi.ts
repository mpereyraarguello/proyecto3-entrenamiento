// detalleRutinaApi.ts
// Servicio para consultar el detalle completo de una rutina

import type {
  ProgresionSemana,
  Pausas,
  RutinaDetalle,
} from "../../types/rutinas.types";

const CALENTAMIENTO_DEFAULT = `MOV. TÓRAX CUADRUP. 2X10
ROTAC. INT. EXT. CAD. 2X10
DORSIFLEX TOB. 3X10
PUENTE FRONTAL BAJO 15’’`;

const PROGRESION_SEMANAL_DEFAULT: ProgresionSemana[] = [
  { semana: 1, series: 3, repeticiones: 12, rir: 3 },
  { semana: 2, series: 3, repeticiones: 10, rir: 3 },
  { semana: 3, series: 4, repeticiones: 8, rir: 3 },
  { semana: 4, series: 3, repeticiones: 9, rir: 2 },
];

const PAUSAS_DEFAULT: Pausas = {
  microPausa: "1' 30''",
  macroPausa: "3'",
};

const ESTIRAMIENTO_FINAL = {
  descripcion: "Elongación de los grupos musculares durante 10'' cada uno desde abajo hacia arriba.",
};

const MOCK_RUTINAS_DETALLE: Record<number, RutinaDetalle> = {
  1: {
    id: 1,
    numero: 1,
    nombre: "Día 1",
    cantidadEjercicios: 12,
    calentamiento: CALENTAMIENTO_DEFAULT,
    core: [
      {
        id: 101,
        tipo: "core",
        nombre: "Puente bajo TRX",
        seriesRepeticiones: "3x10",
        observaciones: "Mantener abdomen contraído sin quebrar la cintura.",
      },
      {
        id: 102,
        tipo: "core",
        nombre: "Rueda abdominal",
        seriesRepeticiones: "3x10x10''",
        observaciones: "Extensión controlada, evitar arquear la zona lumbar.",
      },
    ],
    fuerza: [
      {
        id: 201,
        tipo: "fuerza",
        nombre: "Sentadilla profunda",
        pesoInicial: "40 kg",
        observaciones: "Profundidad por debajo de los 90°, rodillas alineadas con puntas de pie.",
      },
      {
        id: 202,
        tipo: "fuerza",
        nombre: "Subo al banco polea",
        pesoInicial: "15 kg",
        observaciones: "Empujar con el talón de la pierna apoyada, bajada amortiguada.",
      },
      {
        id: 203,
        tipo: "fuerza",
        nombre: "Pull Over",
        pesoInicial: "12 kg",
        observaciones: "Brazos semiextendidos, foco en la expansión del dorsal.",
      },
      {
        id: 204,
        tipo: "fuerza",
        nombre: "Jalón al pecho supino",
        pesoInicial: "35 kg",
        observaciones: "Pecho hacia arriba y codos guiados hacia las costillas.",
      },
      {
        id: 205,
        tipo: "fuerza",
        nombre: "Peso muerto rumano",
        pesoInicial: "50 kg",
        observaciones: "Espalda recta, flexión mínima de rodillas y cadera hacia atrás.",
      },
    ],
    cardio: "10' caminata",
    estiramiento: ESTIRAMIENTO_FINAL,
    progresionSemanal: PROGRESION_SEMANAL_DEFAULT,
    pausas: PAUSAS_DEFAULT,
  },
  2: {
    id: 2,
    numero: 2,
    nombre: "Día 2",
    cantidadEjercicios: 12,
    calentamiento: CALENTAMIENTO_DEFAULT,
    core: [
      {
        id: 103,
        tipo: "core",
        nombre: "Elevación de pelvis invertida",
        seriesRepeticiones: "3x15",
        observaciones: "Subir con el abdomen inferior sin generar balanceo.",
      },
      {
        id: 104,
        tipo: "core",
        nombre: "Puente polea rotación",
        seriesRepeticiones: "3x10",
        observaciones: "Giro controlado desde el torso, cadera fija al frente.",
      },
    ],
    fuerza: [
      {
        id: 206,
        tipo: "fuerza",
        nombre: "Sentadilla búlgara",
        pesoInicial: "10 kg c/u",
        observaciones: "Mantener torso vertical, rodilla trasera desciende cerca del suelo.",
      },
      {
        id: 207,
        tipo: "fuerza",
        nombre: "Aducción de cadera polea",
        pesoInicial: "10 kg",
        observaciones: "Movimiento pausado en el punto máximo de contracción interna.",
      },
      {
        id: 208,
        tipo: "fuerza",
        nombre: "Remo 90°",
        pesoInicial: "30 kg",
        observaciones: "Torso paralelo al piso, llevar la barra hacia el ombligo.",
      },
      {
        id: 209,
        tipo: "fuerza",
        nombre: "Pull Face (deltoides posteriores)",
        pesoInicial: "15 kg",
        observaciones: "Tirar hacia la frente separando los extremos de la cuerda.",
      },
      {
        id: 210,
        tipo: "fuerza",
        nombre: "Hip Thrust con banda",
        pesoInicial: "45 kg",
        observaciones: "Pausa de 1 segundo arriba contrayendo glúteos intensamente.",
      },
    ],
    cardio: "10' caminata",
    estiramiento: ESTIRAMIENTO_FINAL,
    progresionSemanal: PROGRESION_SEMANAL_DEFAULT,
    pausas: PAUSAS_DEFAULT,
  },
  3: {
    id: 3,
    numero: 3,
    nombre: "Día 3",
    cantidadEjercicios: 11,
    calentamiento: CALENTAMIENTO_DEFAULT,
    core: [
      {
        id: 105,
        tipo: "core",
        nombre: "Puente bajo dinámico",
        seriesRepeticiones: "3x15",
        observaciones: "Alternar apoyos manteniendo la pelvis neutra y fija.",
      },
      {
        id: 106,
        tipo: "core",
        nombre: "Puente lateral abducción",
        seriesRepeticiones: "3x15",
        observaciones: "Línea recta cabeza-talones, elevar la pierna superior sin rotar cadera.",
      },
    ],
    fuerza: [
      {
        id: 211,
        tipo: "fuerza",
        nombre: "Sentadilla sumo déficit",
        pesoInicial: "35 kg",
        observaciones: "Pies abiertos a 45°, descender manteniendo las rodillas hacia afuera.",
      },
      {
        id: 212,
        tipo: "fuerza",
        nombre: "Press Martillo",
        pesoInicial: "12 kg c/u",
        observaciones: "Codos pegados al cuerpo, control total sin impulso lumbar.",
      },
      {
        id: 213,
        tipo: "fuerza",
        nombre: "Peso muerto rumano unilateral",
        pesoInicial: "16 kg",
        observaciones: "Estabilidad en la pierna de apoyo, mantener cadera nivelada.",
      },
      {
        id: 214,
        tipo: "fuerza",
        nombre: "Polea de glúteos",
        pesoInicial: "15 kg",
        observaciones: "Patada hacia atrás y arriba apretando en la contracción máxima.",
      },
    ],
    cardio: "10' caminata",
    estiramiento: ESTIRAMIENTO_FINAL,
    progresionSemanal: PROGRESION_SEMANAL_DEFAULT,
    pausas: PAUSAS_DEFAULT,
  },
};

/**
 * Endpoint simulado: GET /api/rutinas/:rutinaId
 */
export const obtenerDetalleRutina = (
  rutinaId: number | string
): Promise<RutinaDetalle | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idNum = Number(rutinaId);
      const rutina = MOCK_RUTINAS_DETALLE[idNum] || null;
      resolve(rutina);
    }, 300);
  });
};

