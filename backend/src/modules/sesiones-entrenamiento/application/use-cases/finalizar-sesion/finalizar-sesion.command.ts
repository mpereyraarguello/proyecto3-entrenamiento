export class FinalizarSesionCommand {
  constructor(
    public readonly sesionId: string,
    public readonly alumnoId: string,
  ) {}
}

