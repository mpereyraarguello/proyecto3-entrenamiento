// SeccionEstiramientoSesion.tsx
// Sección interactiva de estiramiento en la sesión de entrenamiento (opcional)

interface SeccionEstiramientoSesionProps {
  descripcion: string;
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

const IconoCalma = () => (
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
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export default function SeccionEstiramientoSesion({
  descripcion,
  completado,
  onToggleCompletado,
}: SeccionEstiramientoSesionProps) {
  return (
    <section className="detalle-rutina__seccion-card sesion__estiramiento-seccion">
      <div className="sesion__seccion-header-row">
        <div className="sesion__seccion-header-titulos">
          <div className="sesion__titulo-con-badge">
            <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
              Estiramiento
            </h2>
            <span className="sesion__badge-opcional">Opcional</span>
          </div>
          <p className="sesion__seccion-descripcion">
            Vuelta a la calma y elongación muscular. Puedes marcarlo si lo completaste para que figure en tu historial.
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
        className={`sesion__ejercicio-item sesion__estiramiento-card ${
          completado ? "sesion__ejercicio-item--completado" : ""
        }`}
      >
        <div className="sesion__ejercicio-header">
          <div className="sesion__ejercicio-info">
            <span className="sesion__ejercicio-nombre">
              Elongación y vuelta a la calma
            </span>
            <p className="sesion__estiramiento-indicacion">{descripcion}</p>
            <div className="sesion__calentamiento-meta">
              <span className="sesion__calentamiento-tag">
                <IconoCalma />
                Recuperación muscular
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
                ? "Marcar estiramiento como pendiente"
                : "Marcar estiramiento como terminado"
            }
            title={
              completado
                ? "Marcar como pendiente"
                : "Marcar como terminado"
            }
          >
            <IconoCheck />
          </button>
        </div>
      </div>
    </section>
  );
}
