// SeccionCardioSesion.tsx
// Sección interactiva de cardio en la sesión de entrenamiento (opcional, con tilde por sección)

interface SeccionCardioSesionProps {
  cardio: string;
  completado: boolean;
  onToggleCompletado: () => void;
}

const IconoCheck = () => (
  <svg
    width="18"
    height="18"
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

const IconoCardio = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default function SeccionCardioSesion({
  cardio,
  completado,
  onToggleCompletado,
}: SeccionCardioSesionProps) {
  if (!cardio) return null;

  return (
    <section className="detalle-rutina__seccion-card sesion__cardio-seccion">
      <div className="sesion__seccion-header-row">
        <div className="sesion__seccion-header-titulos">
          <div className="sesion__titulo-con-badge">
            <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
              Cardio
            </h2>
            <span className="sesion__badge-opcional">Opcional</span>
          </div>
          <p className="sesion__seccion-descripcion">
            Trabajo cardiovascular posterior. Puedes marcarlo si lo completaste para registrarlo en tu historial.
          </p>
        </div>

        <span
          className={`sesion__progreso-badge ${
            completado ? "sesion__progreso-badge--completo" : ""
          }`}
        >
          {completado ? "Realizado" : "Pendiente"}
        </span>
      </div>

      <div
        className={`sesion__ejercicio-item sesion__cardio-card ${
          completado ? "sesion__ejercicio-item--completado" : ""
        }`}
      >
        <div className="sesion__ejercicio-header">
          <div className="sesion__ejercicio-info">
            <span className="sesion__ejercicio-nombre">
              Entrenamiento Cardiovascular
            </span>
            <p className="sesion__cardio-indicacion">{cardio}</p>
            <div className="sesion__calentamiento-meta">
              <span className="sesion__calentamiento-tag">
                <IconoCardio />
                Acondicionamiento aeróbico
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`sesion__boton-check ${
              completado ? "sesion__boton-check--activo" : ""
            }`}
            onClick={onToggleCompletado}
            aria-label={
              completado
                ? "Marcar cardio como pendiente"
                : "Marcar cardio como realizado"
            }
            title={
              completado
                ? "Marcar cardio como pendiente"
                : "Marcar cardio como realizado"
            }
          >
            <IconoCheck />
          </button>
        </div>
      </div>
    </section>
  );
}
