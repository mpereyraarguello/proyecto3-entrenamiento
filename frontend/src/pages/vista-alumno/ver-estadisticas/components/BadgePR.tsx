// BadgePR.tsx
// Componente que destaca el Récord Personal (PR) histórico y la fecha en que se alcanzó
import type { PRHistorico } from "../types/estadisticas.types";

interface BadgePRProps {
  pr: PRHistorico;
  nombreEjercicio: string;
}

const IconoTrofeo = () => (
  <svg
    className="estadisticas__icono-trofeo"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
    <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
    <path d="M6 2h12v7a6 6 0 0 1-12 0V2z" />
  </svg>
);

export default function BadgePR({ pr, nombreEjercicio }: BadgePRProps) {
  return (
    <div className="estadisticas__pr-card">
      <div className="estadisticas__pr-header">
        <IconoTrofeo />
        <div>
          <span className="estadisticas__pr-titulo">
            RÉCORD PERSONAL HISTÓRICO (PR)
          </span>
          <span className="estadisticas__pr-ejercicio">{nombreEjercicio}</span>
        </div>
      </div>

      <div className="estadisticas__pr-cuerpo">
        <div className="estadisticas__pr-valor">
          {pr.peso} <span className="estadisticas__pr-unidad">{pr.unidad}</span>
        </div>

        <div className="estadisticas__pr-meta">
          <span className="estadisticas__pr-fecha">
            Alcanzado el: <strong>{pr.fecha}</strong>
          </span>
          <span
            className={`estadisticas__pr-origen ${
              pr.esPlanActual
                ? "estadisticas__pr-origen--actual"
                : "estadisticas__pr-origen--anterior"
            }`}
          >
            {pr.nombrePlan}
          </span>
        </div>
      </div>
    </div>
  );
}

