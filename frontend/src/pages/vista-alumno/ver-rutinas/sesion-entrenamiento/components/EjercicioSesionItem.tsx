// EjercicioSesionItem.tsx
// Componente para cada ejercicio durante la sesión, permite registrar peso y repeticiones
// Se considera completado automáticamente cuando se cargan todas sus series.

import type { EjercicioSesion } from "../types/sesion.types";
import { esPesoValido, esRepeticionesValidas } from "../utils/validacionSerie";

interface EjercicioSesionItemProps {
  ejercicioSesion: EjercicioSesion;
  onCambiarSerie: (
    ejercicioId: number,
    numeroSerie: number,
    campo: "peso" | "repeticiones",
    valor: string
  ) => void;
}

const IconoCheck = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function EjercicioSesionItem({
  ejercicioSesion,
  onCambiarSerie,
}: EjercicioSesionItemProps) {
  const { registro, ultimaSesion } = ejercicioSesion;

  const cumplido = registro.completado;

  return (
    <article
      className={`sesion__ejercicio-item ${
        cumplido ? "sesion__ejercicio-item--completado" : ""
      }`}
    >
      <div className="sesion__ejercicio-header">
        <div className="sesion__ejercicio-info">
          <h3 className="sesion__ejercicio-nombre">{ejercicioSesion.nombre}</h3>
          <span className="sesion__ejercicio-series">
            {registro.series.length} series planificadas
          </span>
        </div>

        {/* Indicador automático de estado (sin botón de tilde manual) */}
        <div
          className={`sesion__indicador-estado ${
            cumplido
              ? "sesion__indicador-estado--listo"
              : "sesion__indicador-estado--pendiente"
          }`}
          title={
            cumplido
              ? "Completado (todas las series registradas)"
              : "Ingresá peso y repeticiones en cada serie"
          }
        >
          {cumplido ? (
            <>
              <IconoCheck />
              <span>Listo</span>
            </>
          ) : (
            <span>Ingresar datos</span>
          )}
        </div>
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

      {registro.series.map((serie) => {
        const claveSerie = `${ejercicioSesion.id}-${serie.numeroSerie}`;
        const pesoInvalido = serie.peso.trim() !== "" && !esPesoValido(serie.peso);
        const repeticionesInvalidas =
          serie.repeticiones.trim() !== "" &&
          !esRepeticionesValidas(serie.repeticiones);

        return (
          <div key={claveSerie} className="sesion__serie-registro">
            <span className="sesion__serie-titulo">Serie {serie.numeroSerie}</span>
            <div className="sesion__campos-registro">
              <div className="sesion__campo">
                <label className="sesion__campo-label" htmlFor={`peso-${claveSerie}`}>
                  Peso (kg)
                </label>
                <input
                  id={`peso-${claveSerie}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  className="sesion__campo-input"
                  placeholder="Ej: 40"
                  aria-invalid={pesoInvalido}
                  value={serie.peso}
                  onChange={(e) =>
                    onCambiarSerie(ejercicioSesion.id, serie.numeroSerie, "peso", e.target.value)
                  }
                />
                {pesoInvalido && (
                  <span className="sesion__campo-error">
                    Ingresá un número mayor o igual a cero.
                  </span>
                )}
              </div>
              <div className="sesion__campo">
                <label className="sesion__campo-label" htmlFor={`reps-${claveSerie}`}>
                  Repeticiones
                </label>
                <input
                  id={`reps-${claveSerie}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  className="sesion__campo-input"
                  placeholder="Ej: 12"
                  aria-invalid={repeticionesInvalidas}
                  value={serie.repeticiones}
                  onChange={(e) =>
                    onCambiarSerie(ejercicioSesion.id, serie.numeroSerie, "repeticiones", e.target.value)
                  }
                />
                {repeticionesInvalidas && (
                  <span className="sesion__campo-error">
                    Ingresá un número entero mayor o igual a cero.
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </article>
  );
}
