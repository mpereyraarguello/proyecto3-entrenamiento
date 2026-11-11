export interface SerieAvanceItem {
  numeroSerie: number;
  peso: number | string;
  repeticiones: number | string;
}

export interface RegistroAvanceEjercicioItem {
  ejercicioId: string;
  series: SerieAvanceItem[];
}

export class RegistrarAvanceSesionCommand {
  constructor(
    public readonly sesionId: string,
    public readonly alumnoId: string,
    public readonly registros: RegistroAvanceEjercicioItem[],
    public readonly bloques?: {
      calentamientoCompletado?: boolean;
      cardioCompletado?: boolean;
      estiramientoCompletado?: boolean;
    },
  ) {}
}

