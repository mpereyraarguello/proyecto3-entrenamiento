// ProgresionSesion.tsx
// Componente de progresión semanal y RIR fijo para la sesión de entrenamiento

import { useState } from "react";
import type { ProgresionSemana } from "../../types/rutinas.types";

interface ProgresionSesionProps {
  progresiones: ProgresionSemana[];
}

const IconoRir = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default function ProgresionSesion({
  progresiones,
}: ProgresionSesionProps) {
  const [semanaActiva, setSemanaActiva] = useState<number>(1);

  if (!progresiones || progresiones.length === 0) return null;

  const progSeleccionada =
    progresiones.find((p) => p.semana === semanaActiva) || progresiones[0];

  return (
    <aside
      className="sesion__progresion-card"
      aria-label="Progresión semanal y RIR del alumno"
    >
      <div className="sesion__progresion-top">
        <div className="sesion__progresion-titulo-row">
          <IconoRir />
          <span className="sesion__progresion-titulo">
            PROGRESIÓN SEMANAL (RIR)
          </span>
        </div>
        <span className="sesion__progresion-info-pill">
          Semana {progSeleccionada.semana}: RIR {progSeleccionada.rir}
        </span>
      </div>

      <div className="sesion__progresion-grid">
        {progresiones.map((prog) => {
          const esActiva = prog.semana === semanaActiva;
          return (
            <button
              key={prog.semana}
              type="button"
              className={`sesion__progresion-semana-btn ${
                esActiva ? "sesion__progresion-semana-btn--activa" : ""
              }`}
              onClick={() => setSemanaActiva(prog.semana)}
              aria-label={`Semana ${prog.semana}: ${prog.series}x${prog.repeticiones}, RIR ${prog.rir}`}
            >
              <span className="sesion__progresion-semana-label">
                Semana {prog.semana}
              </span>
              <span className="sesion__progresion-series-valor">
                {prog.series}x{prog.repeticiones}
              </span>
              <span className="sesion__progresion-rir-badge">
                RIR {prog.rir}
              </span>
            </button>
          );
        })}
      </div>

      <div className="sesion__progresion-guia">
        <span className="sesion__progresion-guia-texto">
          Objetivo actual: <strong>{progSeleccionada.series} series × {progSeleccionada.repeticiones} reps</strong> (dejar {progSeleccionada.rir} repeticiones en reserva antes del fallo).
        </span>
      </div>
    </aside>
  );
}
