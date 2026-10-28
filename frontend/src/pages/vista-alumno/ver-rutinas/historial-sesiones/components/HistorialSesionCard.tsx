// HistorialSesionCard.tsx
// Tarjeta que representa una sesión completada en el historial

import { useState } from "react";
import type { SesionHistorial } from "../types/historial.types";

interface HistorialSesionCardProps {
  sesion: SesionHistorial;
  inicialmenteAbierto?: boolean;
}

const IconoCalendario = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconoCheck = () => (
  <svg
    width="14"
    height="14"
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

const IconoCruz = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconoChevron = ({ abierto }: { abierto: boolean }) => (
  <svg
    className={`historial__chevron ${abierto ? "historial__chevron--abierto" : ""}`}
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function HistorialSesionCard({
  sesion,
  inicialmenteAbierto = false,
}: HistorialSesionCardProps) {
  const [abierto, setAbierto] = useState<boolean>(inicialmenteAbierto);

  const totalEjercicios = sesion.ejerciciosCompletados.length;
  const totalRealizados = sesion.ejerciciosCompletados.filter(
    (e) => e.completado
  ).length;

  return (
    <article className="historial__card">
      <header
        className="historial__card-header"
        onClick={() => setAbierto((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setAbierto((prev) => !prev);
          }
        }}
        aria-expanded={abierto}
      >
        <div className="historial__card-top-info">
          <span className="historial__badge-plan">
            PLAN N° {sesion.planNumero}
          </span>
          <IconoChevron abierto={abierto} />
        </div>

        <h3 className="historial__rutina-nombre">
          {sesion.rutinaNombre && sesion.rutinaNombre.trim() !== ""
            ? sesion.rutinaNombre
            : `Rutina ${sesion.rutinaNumero}`}
        </h3>

        <div className="historial__card-meta">
          <div className="historial__meta-item">
            <IconoCalendario />
            <span>{sesion.fecha}</span>
          </div>
          <span className="historial__meta-completados">
            <IconoCheck />
            {totalRealizados}/{totalEjercicios} realizados
          </span>
        </div>
      </header>

      {abierto && (
        <div className="historial__card-contenido">
          <h4 className="historial__detalle-titulo">
            Detalle de la sesión ({totalRealizados}/{totalEjercicios} realizados)
          </h4>

          <div className="historial__ejercicios-lista">
            {sesion.ejerciciosCompletados.map((ej) => {
              const categoriaLower = ej.categoria.toLowerCase();
              const esFuerzaOCore =
                categoriaLower === "core" || categoriaLower === "fuerza";

              return (
                <div
                  key={ej.ejercicioId}
                  className={`historial__ejercicio-item ${
                    !ej.completado
                      ? "historial__ejercicio-item--no-realizado"
                      : ""
                  }`}
                >
                  <div className="historial__ejercicio-cabecera">
                    <div className="historial__ejercicio-nombre-col">
                      <div className="historial__ejercicio-nombre-row">
                        <span className="historial__ejercicio-nombre">
                          {ej.nombre}
                        </span>
                        {(categoriaLower === "cardio" ||
                          categoriaLower === "estiramiento") && (
                          <span className="historial__tag-opcional">
                            Opcional
                          </span>
                        )}
                      </div>
                      {ej.series && (
                        <span className="historial__ejercicio-series">
                          {ej.series}
                        </span>
                      )}
                    </div>
                    <span
                      className={`historial__ejercicio-categoria historial__ejercicio-categoria--${categoriaLower}`}
                    >
                      {ej.categoria.toUpperCase()}
                    </span>
                  </div>

                  <div className="historial__ejercicio-stats">
                    {esFuerzaOCore && (
                      <>
                        <div className="historial__stat-pildora">
                          <span className="historial__stat-label">Peso:</span>
                          <span className="historial__stat-valor">
                            {ej.peso && ej.peso !== "" ? ej.peso : "-"}
                          </span>
                        </div>
                        <div className="historial__stat-pildora">
                          <span className="historial__stat-label">Reps:</span>
                          <span className="historial__stat-valor">
                            {ej.repeticiones && ej.repeticiones !== ""
                              ? ej.repeticiones
                              : "-"}
                          </span>
                        </div>
                      </>
                    )}

                    {ej.completado ? (
                      <div className="historial__stat-check historial__stat-check--realizado">
                        <IconoCheck />
                        <span>Realizado</span>
                      </div>
                    ) : (
                      <div className="historial__stat-check historial__stat-check--no-realizado">
                        <IconoCruz />
                        <span>No realizado</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
