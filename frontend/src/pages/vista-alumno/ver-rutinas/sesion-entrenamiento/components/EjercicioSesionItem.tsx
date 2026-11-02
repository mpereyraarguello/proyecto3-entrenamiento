// EjercicioSesionItem.tsx
// Componente para cada ejercicio durante la sesión, permite registrar peso y repeticiones

import type { EjercicioSesion } from "../types/sesion.types";

interface EjercicioSesionItemProps {
  ejercicioSesion: EjercicioSesion;
  onCambiarPeso: (ejercicioId: number, peso: string) => void;
  onCambiarRepeticiones: (ejercicioId: number, reps: string) => void;
  onToggleCompletado: (ejercicioId: number) => void;
}

const IconoCheck = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function EjercicioSesionItem({
  ejercicioSesion,
  onCambiarPeso,
  onCambiarRepeticiones,
  onToggleCompletado,
}: EjercicioSesionItemProps) {
  const { registro, ultimaSesion } = ejercicioSesion;

  return (
    <article
      className={`sesion__ejercicio-item ${
        registro.completado ? "sesion__ejercicio-item--completado" : ""
      }`}
    >
      <div className="sesion__ejercicio-header">
        <div className="sesion__ejercicio-info">
          <h3 className="sesion__ejercicio-nombre">{ejercicioSesion.nombre}</h3>
          {ejercicioSesion.seriesRepeticiones && (
            <span className="sesion__ejercicio-series">
              {ejercicioSesion.seriesRepeticiones}
            </span>
          )}
        </div>
        <button
          type="button"
          className={`sesion__boton-check ${
            registro.completado ? "sesion__boton-check--activo" : ""
          }`}
          onClick={() => onToggleCompletado(ejercicioSesion.id)}
          aria-label={
            registro.completado
              ? "Marcar como no completado"
              : "Marcar como completado"
          }
        >
          <IconoCheck />
        </button>
      </div>

      {ejercicioSesion.observaciones && (
        <p className="sesion__ejercicio-observacion">
          <strong>Obs:</strong> {ejercicioSesion.observaciones}
        </p>
      )}

      {ultimaSesion && (
        <div className="sesion__ultima-sesion">
          <svg
            className="sesion__ultima-sesion-icono"
            width="14"
            height="14"
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
          <span className="sesion__ultima-sesion-texto">
            Ultima sesion: {ultimaSesion.peso} — {ultimaSesion.repeticiones} reps
          </span>
        </div>
      )}

      <div className="sesion__campos-registro">
        <div className="sesion__campo">
          <label
            className="sesion__campo-label"
            htmlFor={`peso-${ejercicioSesion.id}`}
          >
            Peso utilizado
          </label>
          <input
            id={`peso-${ejercicioSesion.id}`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            className="sesion__campo-input"
            placeholder="Ej: 40 kg"
            value={registro.peso}
            onChange={(e) => onCambiarPeso(ejercicioSesion.id, e.target.value)}
          />
        </div>
        <div className="sesion__campo">
          <label
            className="sesion__campo-label"
            htmlFor={`reps-${ejercicioSesion.id}`}
          >
            Repeticiones
          </label>
          <input
            id={`reps-${ejercicioSesion.id}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            className="sesion__campo-input"
            placeholder="Ej: 12"
            value={registro.repeticiones}
            onChange={(e) =>
              onCambiarRepeticiones(ejercicioSesion.id, e.target.value)
            }
          />
        </div>
      </div>
    </article>
  );
}
