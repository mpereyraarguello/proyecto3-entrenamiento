// validacionSerie.ts
// Validaciones de formato de los campos de peso y repeticiones (CA.1A.6)

import type { RegistroSerie } from "../types/sesion.types";

export const normalizarPeso = (peso: string): string =>
  peso.trim().replace(",", ".");

export const esPesoValido = (peso: string): boolean =>
  /^\d+(\.\d+)?$/.test(normalizarPeso(peso));

export const esRepeticionesValidas = (repeticiones: string): boolean =>
  /^\d+$/.test(repeticiones.trim());

export const esSerieCompleta = (serie: RegistroSerie): boolean =>
  esPesoValido(serie.peso) && esRepeticionesValidas(serie.repeticiones);
