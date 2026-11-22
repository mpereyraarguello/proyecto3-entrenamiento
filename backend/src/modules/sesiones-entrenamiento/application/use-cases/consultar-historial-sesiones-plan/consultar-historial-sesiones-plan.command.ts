export class ConsultarHistorialSesionesPlanCommand {
  constructor(
    public readonly alumnoId: string,
    public readonly planId: string,
  ) {}
}

