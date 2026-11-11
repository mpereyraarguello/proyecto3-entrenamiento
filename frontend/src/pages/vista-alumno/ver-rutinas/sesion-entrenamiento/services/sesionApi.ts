// sesionApi.ts
// Servicio para interactuar con los endpoints de sesiones de entrenamiento en el backend

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

export interface SerieDto {
  numeroSerie: number;
  peso: number | string;
  repeticiones: number | string;
}

export interface RegistroEjercicioAvanceDto {
  ejercicioId: string;
  series: SerieDto[];
}

export interface BloquesDto {
  calentamientoCompletado?: boolean;
  cardioCompletado?: boolean;
  estiramientoCompletado?: boolean;
}

export interface SesionBackendResponse {
  id: string;
  alumnoId: string;
  planId: string;
  rutinaId: string;
  rutinaNumero: number;
  semana: number;
  estado: string;
  fechaInicio: string;
  fechaFin: string | null;
  bloqueCalentamientoCompletado: boolean;
  bloqueCardioCompletado: boolean | null;
  bloqueEstiramientoCompletado: boolean;
  ejercicios: Array<{
    id: string;
    ejercicioId: string;
    nombre: string;
    tipo: string;
    orden: number;
    seriesPlanificadas: number;
    repeticionesPlanificadas: number;
    rirPlanificado: number;
    pesoAnterior: number | null;
    repeticionesAnteriores: number | null;
    completado: boolean;
    series: Array<{
      numeroSerie: number;
      peso: number;
      repeticiones: number;
    }>;
  }>;
}

export interface PesoPrevioBackendResponse {
  ejercicioId: string;
  peso: number | null;
  repeticiones: number | null;
}

/**
 * Iniciar una sesión de entrenamiento (HU 1A)
 * POST /sesiones-entrenamiento/iniciar
 */
export async function iniciarSesion(
  alumnoId: string,
  rutinaId: string
): Promise<SesionBackendResponse> {
  const response = await fetch(`${API_BASE_URL}/sesiones-entrenamiento/iniciar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alumnoId, rutinaId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Error al iniciar sesión: status ${response.status}`
    );
  }

  return response.json();
}

/**
 * Consultar si el alumno ya tiene una sesión en curso (HU 1A)
 * GET /sesiones-entrenamiento/en-curso/:alumnoId
 */
export async function obtenerSesionEnCurso(
  alumnoId: string
): Promise<SesionBackendResponse | null> {
  const response = await fetch(
    `${API_BASE_URL}/sesiones-entrenamiento/en-curso/${alumnoId}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Error al consultar sesión en curso: status ${response.status}`
    );
  }

  // El backend responde sin contenido cuando no hay sesión en curso
  const contenido = await response.text();
  return contenido ? (JSON.parse(contenido) as SesionBackendResponse) : null;
}

/**
 * Consultar el peso previo registrado para un ejercicio por el alumno (HU 1A)
 * GET /sesiones-entrenamiento/peso-previo/:alumnoId/:ejercicioId
 */
export async function obtenerPesoPrevio(
  alumnoId: string,
  ejercicioId: string | number
): Promise<PesoPrevioBackendResponse | null> {
  const response = await fetch(
    `${API_BASE_URL}/sesiones-entrenamiento/peso-previo/${alumnoId}/${ejercicioId}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/**
 * Marcar bloque opcional/calentamiento de la sesión (HU 4A)
 * PATCH /sesiones-entrenamiento/:id/bloques
 */
export async function marcarBloqueSesion(
  sesionId: string,
  alumnoId: string,
  bloque: "CALENTAMIENTO" | "CARDIO" | "ESTIRAMIENTO",
  completado: boolean
): Promise<SesionBackendResponse> {
  const response = await fetch(
    `${API_BASE_URL}/sesiones-entrenamiento/${sesionId}/bloques`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alumnoId, bloque, completado }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Error al marcar bloque: status ${response.status}`
    );
  }

  return response.json();
}

/**
 * Registrar avance continuo de series, pesos y repeticiones (HU 1A)
 * PUT /sesiones-entrenamiento/:id/avance
 */
export async function registrarAvanceSesion(
  sesionId: string,
  alumnoId: string,
  registros: RegistroEjercicioAvanceDto[],
  bloques?: BloquesDto
): Promise<SesionBackendResponse> {
  const response = await fetch(
    `${API_BASE_URL}/sesiones-entrenamiento/${sesionId}/avance`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alumnoId, registros, bloques }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Error al registrar avance: status ${response.status}`
    );
  }

  return response.json();
}

/**
 * Finalizar la sesión de entrenamiento con validación de obligatorios (HU 2A)
 * POST /sesiones-entrenamiento/:id/finalizar
 */
export async function finalizarSesion(
  sesionId: string,
  alumnoId: string
): Promise<SesionBackendResponse> {
  const response = await fetch(
    `${API_BASE_URL}/sesiones-entrenamiento/${sesionId}/finalizar`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alumnoId }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Error al finalizar sesión: status ${response.status}`
    );
  }

  return response.json();
}
