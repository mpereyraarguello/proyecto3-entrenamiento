// Coincide con PlanEntrenamientoListItemResponse del Backend
export interface PlanListado {
  id: string;
  alumnoId: string;
  alumnoNombre: string; // El backend ya nos lo manda concatenado (Nombre Apellido)
  nombrePlan: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'ACTIVO' | 'INACTIVO';
  cantidadRutinas: number;
}

// Coincide con PlanEntrenamientoResponse del Backend
export interface PlanDetalle {
  id: string;
  alumnoId: string;
  numeroPlan: number;
  nombre: string;
  objetivoId: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  semanaActual: number;
  microPausa: string; // Ya viene formateado: "1' 30""
  macroPausa: string; // "3' 0""
  cantidadRutinas: number;
  // Nota: Si el backend aún no envía el array de rutinas con sus ejercicios,
  // esto se agregará al PlanEntrenamientoResponse más adelante.
}