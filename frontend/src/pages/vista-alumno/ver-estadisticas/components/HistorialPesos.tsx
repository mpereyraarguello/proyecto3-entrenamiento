// HistorialPesos.tsx
// Muestra el historial cronológico de evolución de pesos del ejercicio seleccionado
import type { RegistroPeso } from "../types/estadisticas.types";

interface HistorialPesosProps {
  registros: RegistroPeso[];
  pesoInicial: number;
  unidad: string;
}

export default function HistorialPesos({
  registros,
  pesoInicial,
  unidad,
}: HistorialPesosProps) {
  if (!registros || registros.length === 0) {
    return (
      <p className="estadisticas__sin-registros">
        No hay registros de cargas aún para este ejercicio en el plan.
      </p>
    );
  }

  // Peso máximo registrado en el plan actual para calcular proporción de barra
  const maxPesoRegistrado = Math.max(
    ...registros.map((r) => r.peso),
    pesoInicial || 1
  );

  return (
    <div className="estadisticas__historial-pesos">
      <h3 className="estadisticas__historial-titulo">
        Evolución de cargas por sesión
      </h3>

      <div className="estadisticas__registros-lista">
        {registros.map((reg) => {
          const porcentajeRelativo = Math.max(
            15,
            Math.round((reg.peso / maxPesoRegistrado) * 100)
          );

          return (
            <div key={reg.id} className="estadisticas__registro-fila">
              <div className="estadisticas__registro-meta">
                <span className="estadisticas__registro-semana">
                  Semana {reg.semana}
                </span>
                <span className="estadisticas__registro-fecha">{reg.fecha}</span>
              </div>

              <div className="estadisticas__registro-barra-col">
                <div className="estadisticas__barra-fondo estadisticas__barra-fondo--peso">
                  <div
                    className="estadisticas__barra-relleno estadisticas__barra-relleno--peso"
                    style={{ width: `${porcentajeRelativo}%` }}
                  />
                </div>
              </div>

              <div className="estadisticas__registro-datos">
                <strong className="estadisticas__registro-peso">
                  {reg.peso} {reg.unidad || unidad}
                </strong>
                <span className="estadisticas__registro-series">
                  {reg.series}x{reg.repeticiones}
                  {reg.rir !== undefined ? ` (RIR ${reg.rir})` : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

