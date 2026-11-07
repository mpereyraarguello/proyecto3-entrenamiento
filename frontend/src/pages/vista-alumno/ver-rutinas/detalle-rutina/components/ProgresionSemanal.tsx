// ProgresionSemanal.tsx
import type { ProgresionSemana } from "../../types/rutinas.types";

interface ProgresionSemanalProps {
  progresiones: ProgresionSemana[];
}

const IconoProgresion = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default function ProgresionSemanal({
  progresiones,
}: ProgresionSemanalProps) {
  return (
    <section className="detalle-rutina__seccion-card">
      <div className="detalle-rutina__seccion-header">
        <IconoProgresion />
        <h2 className="detalle-rutina__seccion-titulo">
          Progresión semanal (Fuerza y Core)
        </h2>
      </div>
      <p className="detalle-rutina__seccion-descripcion">
        Indicaciones de series, repeticiones y RIR (repeticiones en reserva) para
        cada semana del plan activo:
      </p>
      <div className="detalle-rutina__progresiones-grid">
        {progresiones.map((prog) => (
          <div key={prog.semana} className="detalle-rutina__progresion-card">
            <span className="detalle-rutina__progresion-semana">
              Semana {prog.semana}
            </span>
            <span className="detalle-rutina__progresion-series">
              {prog.series}x{prog.repeticiones}
            </span>
            <span className="detalle-rutina__progresion-rir">
              RIR {prog.rir}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

