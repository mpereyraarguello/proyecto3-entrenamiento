export class ConsultarDetalleSesionHistorialCommand {
  constructor(
    public readonly sesionId: string,
    public readonly alumnoId: string,
  ) {}
}

