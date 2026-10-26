// SelectorPlan.tsx
import type { PlanEstadistica } from "../types/estadisticas.types";

interface PlanOpcion {
  id: number;
  numero: number;
  nombre: string;
  esActual: boolean;
}

interface SelectorPlanProps {
  planes: PlanOpcion[];
  planSeleccionado: PlanEstadistica;
  onCambiarPlan: (planId: number) => void;
}

export default function SelectorPlan({
  planes,
  planSeleccionado,
  onCambiarPlan,
}: SelectorPlanProps) {
  return (
    <section className="estadisticas__selector-plan-card">
      <div className="estadisticas__selector-plan-header">
        <span className="estadisticas__selector-plan-etiqueta">
          Consultando estadísticas de:
        </span>
        <div className="estadisticas__selector-tabs">
          {planes.map((p) => {
            const estaActivo = p.id === planSeleccionado.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`estadisticas__tab-plan ${
                  estaActivo ? "estadisticas__tab-plan--activo" : ""
                }`}
                onClick={() => onCambiarPlan(p.id)}
              >
                {p.nombre}
              </button>
            );
          })}
        </div>
      </div>

      <div className="estadisticas__plan-fechas">
        <span>
          Período: <strong>{planSeleccionado.fechaInicio}</strong> al{" "}
          <strong>{planSeleccionado.fechaFin}</strong>
        </span>
        {planSeleccionado.esActual && (
          <span className="estadisticas__badge-activo">Plan Activo</span>
        )}
      </div>
    </section>
  );
}

