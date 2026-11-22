export class ConsultarPesoPrevioEjercicioCommand {
  constructor(
    public readonly alumnoId: string,
    public readonly ejercicioId: string,
  ) {}
}

