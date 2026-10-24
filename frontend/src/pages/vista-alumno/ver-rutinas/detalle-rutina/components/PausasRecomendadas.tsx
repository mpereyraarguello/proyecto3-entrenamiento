// PausasRecomendadas.tsx
import type { Pausas } from "../../types/rutinas.types";

interface PausasRecomendadasProps {
  pausas: Pausas;
}

const IconoReloj = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function PausasRecomendadas({ pausas }: PausasRecomendadasProps) {
  return (
    <section className="detalle-rutina__seccion-card">
      <div className="detalle-rutina__seccion-header">
        <IconoReloj />
        <h2 className="detalle-rutina__seccion-titulo">Pausas recomendadas</h2>
      </div>
      <div className="detalle-rutina__pausas-grid">
        <div className="detalle-rutina__pausa-item">
          <span className="detalle-rutina__pausa-label">
            Micropausa (entre series)
          </span>
          <strong className="detalle-rutina__pausa-valor">
            {pausas.microPausa}
          </strong>
        </div>
        <div className="detalle-rutina__pausa-item">
          <span className="detalle-rutina__pausa-label">
            Macropausa (entre ejercicios)
          </span>
          <strong className="detalle-rutina__pausa-valor">
            {pausas.macroPausa}
          </strong>
        </div>
      </div>
    </section>
  );
}

