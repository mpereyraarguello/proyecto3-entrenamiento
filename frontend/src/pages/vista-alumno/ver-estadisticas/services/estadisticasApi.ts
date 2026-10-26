// estadisticasApi.ts
// Servicio de datos mockeados para estadísticas y evolución del alumno

import type {
  PlanEstadistica,
  EjercicioEvolucion,
} from "../types/estadisticas.types";

const EJERCICIOS_PLAN_1: EjercicioEvolucion[] = [
  // RUTINA 1 - FUERZA
  {
    id: 1,
    nombre: "Sentadilla profunda",
    tipo: "fuerza",
    rutinaId: 1,
    numeroRutina: 1,
    pesoInicial: 40,
    unidad: "kg",
    prHistorico: {
      peso: 55,
      unidad: "kg",
      fecha: "29/10/2026",
      nombrePlan: "Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 101, fecha: "08/10/2026", semana: 1, peso: 40, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 102, fecha: "11/10/2026", semana: 1, peso: 42.5, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 103, fecha: "15/10/2026", semana: 2, peso: 45, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 104, fecha: "18/10/2026", semana: 2, peso: 47.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 105, fecha: "22/10/2026", semana: 3, peso: 50, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
      { id: 106, fecha: "25/10/2026", semana: 3, peso: 52.5, unidad: "kg", series: 4, repeticiones: 8, rir: 2 },
      { id: 107, fecha: "29/10/2026", semana: 4, peso: 55, unidad: "kg", series: 4, repeticiones: 8, rir: 2 },
    ],
  },
  {
    id: 2,
    nombre: "Subo al banco polea",
    tipo: "fuerza",
    rutinaId: 1,
    numeroRutina: 1,
    pesoInicial: 15,
    unidad: "kg",
    prHistorico: {
      peso: 20,
      unidad: "kg",
      fecha: "22/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 104, fecha: "08/10/2026", semana: 1, peso: 15, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 105, fecha: "15/10/2026", semana: 2, peso: 17.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 106, fecha: "22/10/2026", semana: 3, peso: 20, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 3,
    nombre: "Pull Over",
    tipo: "fuerza",
    rutinaId: 1,
    numeroRutina: 1,
    pesoInicial: 12,
    unidad: "kg",
    prHistorico: {
      peso: 16,
      unidad: "kg",
      fecha: "22/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 107, fecha: "08/10/2026", semana: 1, peso: 12, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 108, fecha: "15/10/2026", semana: 2, peso: 14, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 109, fecha: "22/10/2026", semana: 3, peso: 16, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 4,
    nombre: "Jalón al pecho supino",
    tipo: "fuerza",
    rutinaId: 1,
    numeroRutina: 1,
    pesoInicial: 35,
    unidad: "kg",
    prHistorico: {
      peso: 45,
      unidad: "kg",
      fecha: "20/09/2026",
      nombrePlan: " Plan N° 21 (Anterior)",
      esPlanActual: false,
    },
    registros: [
      { id: 110, fecha: "08/10/2026", semana: 1, peso: 35, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 111, fecha: "15/10/2026", semana: 2, peso: 37.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 112, fecha: "22/10/2026", semana: 3, peso: 42.5, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 5,
    nombre: "Peso muerto rumano",
    tipo: "fuerza",
    rutinaId: 1,
    numeroRutina: 1,
    pesoInicial: 50,
    unidad: "kg",
    prHistorico: {
      peso: 65,
      unidad: "kg",
      fecha: "18/09/2026",
      nombrePlan: " Plan N° 21 (Anterior)",
      esPlanActual: false,
    },
    registros: [
      { id: 113, fecha: "08/10/2026", semana: 1, peso: 50, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 114, fecha: "15/10/2026", semana: 2, peso: 55, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 115, fecha: "22/10/2026", semana: 3, peso: 60, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  // RUTINA 1 - CORE
  {
    id: 6,
    nombre: "Puente bajo TRX",
    tipo: "core",
    rutinaId: 1,
    numeroRutina: 1,
    pesoInicial: 0,
    unidad: "kg",
    prHistorico: {
      peso: 5,
      unidad: "kg",
      fecha: "15/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 116, fecha: "08/10/2026", semana: 1, peso: 0, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 117, fecha: "15/10/2026", semana: 2, peso: 2.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 118, fecha: "22/10/2026", semana: 3, peso: 5, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 7,
    nombre: "Rueda abdominal",
    tipo: "core",
    rutinaId: 1,
    numeroRutina: 1,
    pesoInicial: 0,
    unidad: "kg",
    prHistorico: {
      peso: 10,
      unidad: "kg",
      fecha: "22/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 119, fecha: "08/10/2026", semana: 1, peso: 0, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 120, fecha: "15/10/2026", semana: 2, peso: 5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 121, fecha: "22/10/2026", semana: 3, peso: 10, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },

  // RUTINA 2 - FUERZA
  {
    id: 8,
    nombre: "Sentadilla búlgara",
    tipo: "fuerza",
    rutinaId: 2,
    numeroRutina: 2,
    pesoInicial: 10,
    unidad: "kg",
    prHistorico: {
      peso: 15,
      unidad: "kg",
      fecha: "23/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 122, fecha: "09/10/2026", semana: 1, peso: 10, unidad: "kg  ", series: 3, repeticiones: 12, rir: 3 },
      { id: 123, fecha: "16/10/2026", semana: 2, peso: 12.5, unidad: "kg  ", series: 3, repeticiones: 10, rir: 3 },
      { id: 124, fecha: "23/10/2026", semana: 3, peso: 15, unidad: "kg  ", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 9,
    nombre: "Aducción de cadera polea",
    tipo: "fuerza",
    rutinaId: 2,
    numeroRutina: 2,
    pesoInicial: 10,
    unidad: "kg",
    prHistorico: {
      peso: 15,
      unidad: "kg",
      fecha: "16/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 125, fecha: "09/10/2026", semana: 1, peso: 10, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 126, fecha: "16/10/2026", semana: 2, peso: 12.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 127, fecha: "23/10/2026", semana: 3, peso: 15, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 10,
    nombre: "Remo 90°",
    tipo: "fuerza",
    rutinaId: 2,
    numeroRutina: 2,
    pesoInicial: 30,
    unidad: "kg",
    prHistorico: {
      peso: 40,
      unidad: "kg",
      fecha: "15/09/2026",
      nombrePlan: " Plan N° 21 (Anterior)",
      esPlanActual: false,
    },
    registros: [
      { id: 128, fecha: "09/10/2026", semana: 1, peso: 30, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 129, fecha: "16/10/2026", semana: 2, peso: 35, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 130, fecha: "23/10/2026", semana: 3, peso: 37.5, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 11,
    nombre: "Pull Face (deltoides posteriores)",
    tipo: "fuerza",
    rutinaId: 2,
    numeroRutina: 2,
    pesoInicial: 15,
    unidad: "kg",
    prHistorico: {
      peso: 20,
      unidad: "kg",
      fecha: "23/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 131, fecha: "09/10/2026", semana: 1, peso: 15, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 132, fecha: "16/10/2026", semana: 2, peso: 17.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 133, fecha: "23/10/2026", semana: 3, peso: 20, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 12,
    nombre: "Hip Thrust con banda",
    tipo: "fuerza",
    rutinaId: 2,
    numeroRutina: 2,
    pesoInicial: 45,
    unidad: "kg",
    prHistorico: {
      peso: 55,
      unidad: "kg",
      fecha: "23/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 134, fecha: "09/10/2026", semana: 1, peso: 45, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 135, fecha: "16/10/2026", semana: 2, peso: 50, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 136, fecha: "23/10/2026", semana: 3, peso: 55, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  // RUTINA 2 - CORE
  {
    id: 13,
    nombre: "Elevación de pelvis invertida",
    tipo: "core",
    rutinaId: 2,
    numeroRutina: 2,
    pesoInicial: 0,
    unidad: "kg",
    prHistorico: {
      peso: 5,
      unidad: "kg",
      fecha: "16/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 137, fecha: "09/10/2026", semana: 1, peso: 0, unidad: "kg", series: 3, repeticiones: 15, rir: 3 },
      { id: 138, fecha: "16/10/2026", semana: 2, peso: 2.5, unidad: "kg", series: 3, repeticiones: 15, rir: 3 },
      { id: 139, fecha: "23/10/2026", semana: 3, peso: 5, unidad: "kg", series: 4, repeticiones: 12, rir: 3 },
    ],
  },
  {
    id: 14,
    nombre: "Puente polea rotación",
    tipo: "core",
    rutinaId: 2,
    numeroRutina: 2,
    pesoInicial: 7.5,
    unidad: "kg",
    prHistorico: {
      peso: 12.5,
      unidad: "kg",
      fecha: "23/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 140, fecha: "09/10/2026", semana: 1, peso: 7.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 141, fecha: "16/10/2026", semana: 2, peso: 10, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 142, fecha: "23/10/2026", semana: 3, peso: 12.5, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },

  // RUTINA 3 - FUERZA
  {
    id: 15,
    nombre: "Sentadilla sumo déficit",
    tipo: "fuerza",
    rutinaId: 3,
    numeroRutina: 3,
    pesoInicial: 35,
    unidad: "kg",
    prHistorico: {
      peso: 45,
      unidad: "kg",
      fecha: "24/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 143, fecha: "10/10/2026", semana: 1, peso: 35, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 144, fecha: "17/10/2026", semana: 2, peso: 40, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 145, fecha: "24/10/2026", semana: 3, peso: 45, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 16,
    nombre: "Press Martillo",
    tipo: "fuerza",
    rutinaId: 3,
    numeroRutina: 3,
    pesoInicial: 12,
    unidad: "kg  ",
    prHistorico: {
      peso: 16,
      unidad: "kg  ",
      fecha: "17/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 146, fecha: "10/10/2026", semana: 1, peso: 12, unidad: "kg  ", series: 3, repeticiones: 12, rir: 3 },
      { id: 147, fecha: "17/10/2026", semana: 2, peso: 14, unidad: "kg  ", series: 3, repeticiones: 10, rir: 3 },
      { id: 148, fecha: "24/10/2026", semana: 3, peso: 16, unidad: "kg  ", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 17,
    nombre: "Peso muerto rumano unilateral",
    tipo: "fuerza",
    rutinaId: 3,
    numeroRutina: 3,
    pesoInicial: 16,
    unidad: "kg",
    prHistorico: {
      peso: 22,
      unidad: "kg",
      fecha: "24/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 149, fecha: "10/10/2026", semana: 1, peso: 16, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 150, fecha: "17/10/2026", semana: 2, peso: 18, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 151, fecha: "24/10/2026", semana: 3, peso: 22, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  {
    id: 18,
    nombre: "Polea de glúteos",
    tipo: "fuerza",
    rutinaId: 3,
    numeroRutina: 3,
    pesoInicial: 15,
    unidad: "kg",
    prHistorico: {
      peso: 20,
      unidad: "kg",
      fecha: "24/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 152, fecha: "10/10/2026", semana: 1, peso: 15, unidad: "kg", series: 3, repeticiones: 12, rir: 3 },
      { id: 153, fecha: "17/10/2026", semana: 2, peso: 17.5, unidad: "kg", series: 3, repeticiones: 10, rir: 3 },
      { id: 154, fecha: "24/10/2026", semana: 3, peso: 20, unidad: "kg", series: 4, repeticiones: 8, rir: 3 },
    ],
  },
  // RUTINA 3 - CORE
  {
    id: 19,
    nombre: "Puente bajo dinámico",
    tipo: "core",
    rutinaId: 3,
    numeroRutina: 3,
    pesoInicial: 0,
    unidad: "kg",
    prHistorico: {
      peso: 5,
      unidad: "kg",
      fecha: "17/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 155, fecha: "10/10/2026", semana: 1, peso: 0, unidad: "kg", series: 3, repeticiones: 15, rir: 3 },
      { id: 156, fecha: "17/10/2026", semana: 2, peso: 2.5, unidad: "kg", series: 3, repeticiones: 15, rir: 3 },
      { id: 157, fecha: "24/10/2026", semana: 3, peso: 5, unidad: "kg", series: 4, repeticiones: 12, rir: 3 },
    ],
  },
  {
    id: 20,
    nombre: "Puente lateral abducción",
    tipo: "core",
    rutinaId: 3,
    numeroRutina: 3,
    pesoInicial: 0,
    unidad: "kg",
    prHistorico: {
      peso: 4,
      unidad: "kg",
      fecha: "24/10/2026",
      nombrePlan: " Plan N° 22 (Actual)",
      esPlanActual: true,
    },
    registros: [
      { id: 158, fecha: "10/10/2026", semana: 1, peso: 0, unidad: "kg", series: 3, repeticiones: 15, rir: 3 },
      { id: 159, fecha: "17/10/2026", semana: 2, peso: 2, unidad: "kg", series: 3, repeticiones: 15, rir: 3 },
      { id: 160, fecha: "24/10/2026", semana: 3, peso: 4, unidad: "kg", series: 4, repeticiones: 12, rir: 3 },
    ],
  },
];

const PLANES_MOCK: Record<number, PlanEstadistica> = {
  1: {
    id: 1,
    numero: 1,
    nombre: "Plan N° 22 (Actual)",
    fechaInicio: "19/10/2026",
    fechaFin: "13/11/2026",
    esActual: true,
    estadisticaSesiones: {
      totalSesionesFinalizadas: 12,
      sesionesPorRutina: [
        {
          rutinaId: 1,
          numeroRutina: 1,
          nombreRutina: "Rutina 1",
          cantidadSesiones: 5,
          porcentaje: 41.7,
        },
        {
          rutinaId: 2,
          numeroRutina: 2,
          nombreRutina: "Rutina 2",
          cantidadSesiones: 4,
          porcentaje: 33.3,
        },
        {
          rutinaId: 3,
          numeroRutina: 3,
          nombreRutina: "Rutina 3",
          cantidadSesiones: 3,
          porcentaje: 25.0,
        },
      ],
    },
    gruposMusculares: [
      {
        grupo: "Piernas y glúteos",
        porcentaje: 35.0,
        ejerciciosAsociados: [
          "Sentadilla profunda",
          "Subo al banco polea",
          "Sentadilla búlgara",
          "Hip Thrust con banda",
          "Sentadilla sumo déficit",
        ],
      },
      {
        grupo: "Espalda",
        porcentaje: 25.0,
        ejerciciosAsociados: [
          "Pull Over",
          "Jalón al pecho supino",
          "Remo 90°",
          "Pull Face",
        ],
      },
      {
        grupo: "Core y abdomen",
        porcentaje: 20.0,
        ejerciciosAsociados: [
          "Puente bajo TRX",
          "Rueda abdominal",
          "Elevación pelvis",
          "Puente dinámico",
        ],
      },
      {
        grupo: "Pecho y hombros",
        porcentaje: 15.0,
        ejerciciosAsociados: ["Pull Face (deltoides)", "Press Martillo"],
      },
      {
        grupo: "Brazos",
        porcentaje: 5.0,
        ejerciciosAsociados: ["Press Martillo"],
      },
    ],
    ejerciciosEvolucion: EJERCICIOS_PLAN_1,
  },
  0: {
    id: 0,
    numero: 0,
    nombre: "Plan Anterior",
    fechaInicio: "21/09/2026",
    fechaFin: "16/10/2026",
    esActual: false,
    estadisticaSesiones: {
      totalSesionesFinalizadas: 16,
      sesionesPorRutina: [
        {
          rutinaId: 1,
          numeroRutina: 1,
          nombreRutina: "Rutina 1",
          cantidadSesiones: 6,
          porcentaje: 37.5,
        },
        {
          rutinaId: 2,
          numeroRutina: 2,
          nombreRutina: "Rutina 2",
          cantidadSesiones: 5,
          porcentaje: 31.25,
        },
        {
          rutinaId: 3,
          numeroRutina: 3,
          nombreRutina: "Rutina 3",
          cantidadSesiones: 5,
          porcentaje: 31.25,
        },
      ],
    },
    gruposMusculares: [
      {
        grupo: "Piernas y glúteos",
        porcentaje: 30.0,
        ejerciciosAsociados: ["Sentadilla profunda", "Prensa 45°", "Peso muerto"],
      },
      {
        grupo: "Espalda",
        porcentaje: 30.0,
        ejerciciosAsociados: ["Jalón al pecho", "Remo con barra 90°"],
      },
      {
        grupo: "Core y abdomen",
        porcentaje: 20.0,
        ejerciciosAsociados: ["Plancha abdominal", "Elevaciones de piernas"],
      },
      {
        grupo: "Pecho y hombros",
        porcentaje: 15.0,
        ejerciciosAsociados: ["Press de banca plano", "Press militar"],
      },
      {
        grupo: "Brazos",
        porcentaje: 5.0,
        ejerciciosAsociados: ["Curl de bíceps", "Fondos tricep"],
      },
    ],
    ejerciciosEvolucion: [
      {
        id: 1,
        nombre: "Sentadilla profunda",
        tipo: "fuerza",
        rutinaId: 1,
        numeroRutina: 1,
        pesoInicial: 35,
        unidad: "kg",
        prHistorico: {
          peso: 50,
          unidad: "kg",
          fecha: "25/09/2026",
          nombrePlan: "Plan Anterior",
          esPlanActual: false,
        },
        registros: [
          { id: 201, fecha: "05/09/2026", semana: 1, peso: 35, unidad: "kg", series: 3, repeticiones: 12 },
          { id: 202, fecha: "15/09/2026", semana: 2, peso: 42.5, unidad: "kg", series: 3, repeticiones: 10 },
          { id: 203, fecha: "25/09/2026", semana: 3, peso: 50, unidad: "kg", series: 4, repeticiones: 8 },
        ],
      },
      {
        id: 4,
        nombre: "Jalón al pecho supino",
        tipo: "fuerza",
        rutinaId: 1,
        numeroRutina: 1,
        pesoInicial: 30,
        unidad: "kg",
        prHistorico: {
          peso: 45,
          unidad: "kg",
          fecha: "20/09/2026",
          nombrePlan: "Plan Anterior",
          esPlanActual: false,
        },
        registros: [
          { id: 204, fecha: "05/09/2026", semana: 1, peso: 30, unidad: "kg", series: 3, repeticiones: 12 },
          { id: 205, fecha: "12/09/2026", semana: 2, peso: 37.5, unidad: "kg", series: 3, repeticiones: 10 },
          { id: 206, fecha: "20/09/2026", semana: 3, peso: 45, unidad: "kg", series: 4, repeticiones: 8 },
        ],
      },
      {
        id: 5,
        nombre: "Peso muerto rumano",
        tipo: "fuerza",
        rutinaId: 1,
        numeroRutina: 1,
        pesoInicial: 45,
        unidad: "kg",
        prHistorico: {
          peso: 65,
          unidad: "kg",
          fecha: "18/09/2026",
          nombrePlan: "Plan Anterior",
          esPlanActual: false,
        },
        registros: [
          { id: 207, fecha: "05/09/2026", semana: 1, peso: 45, unidad: "kg", series: 3, repeticiones: 12 },
          { id: 208, fecha: "12/09/2026", semana: 2, peso: 55, unidad: "kg", series: 3, repeticiones: 10 },
          { id: 209, fecha: "18/09/2026", semana: 3, peso: 65, unidad: "kg", series: 4, repeticiones: 8 },
        ],
      },
      {
        id: 6,
        nombre: "Puente bajo TRX",
        tipo: "core",
        rutinaId: 1,
        numeroRutina: 1,
        pesoInicial: 0,
        unidad: "kg",
        prHistorico: {
          peso: 2.5,
          unidad: "kg",
          fecha: "18/09/2026",
          nombrePlan: "Plan Anterior",
          esPlanActual: false,
        },
        registros: [
          { id: 210, fecha: "05/09/2026", semana: 1, peso: 0, unidad: "kg", series: 3, repeticiones: 10 },
          { id: 211, fecha: "18/09/2026", semana: 2, peso: 2.5, unidad: "kg", series: 3, repeticiones: 10 },
        ],
      },
    ],
  },
};

/**
 * Simula endpoint: GET /api/alumno/planes
 * Retorna los planes disponibles para consultar estadísticas
 */
export const obtenerPlanesDisponibles = (): Promise<
  { id: number; numero: number; nombre: string; esActual: boolean }[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, numero: 22, nombre: "Plan actual (N° 22)", esActual: true },
        { id: 0, numero: 21, nombre: "Plan anterior (N° 21)", esActual: false },
      ]);
    }, 250);
  });
};

/**
 * Simula endpoint: GET /api/alumno/planes/:planId/estadisticas
 * Retorna la información completa de sesiones, grupos musculares y ejercicios de ese plan
 */
export const obtenerEstadisticasPlan = (
  planId: number
): Promise<PlanEstadistica | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = PLANES_MOCK[planId] || PLANES_MOCK[1];
      resolve(plan);
    }, 300);
  });
};

