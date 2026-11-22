// SeccionCalentamientoSesion.tsx
// Sección de calentamiento en la sesión de entrenamiento (obligatorio, tilde único por conjunto)

interface ItemCalentamiento {
  id: string;
  nombre: string;
}

interface SeccionCalentamientoSesionProps {
  items: ItemCalentamiento[];
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

const IconoFuego = () => (
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
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
  </svg>
);

export default function SeccionCalentamientoSesion({
  items,
  completado,
  onToggleCompletado,
}: SeccionCalentamientoSesionProps) {
  return (
    <section className="detalle-rutina__seccion-card sesion__calentamiento-seccion">
      <div className="sesion__seccion-header-row">
        <div className="sesion__seccion-header-titulos">
          <div className="sesion__titulo-con-badge">
            <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
              Calentamiento
            </h2>
          </div>
          <p className="sesion__seccion-descripcion">
            Ejercicios de movilidad articular. Tildá el bloque una vez completado para poder finalizar la sesión.
          </p>
        </div>

        <span
          className={`sesion__progreso-badge ${
            completado ? "sesion__progreso-badge--completo" : ""
          }`}
        >
          {completado ? "Completado" : "Pendiente"}
        </span>
      </div>

      <div
        className={`sesion__ejercicio-item sesion__calentamiento-card-unificada ${
          completado ? "sesion__ejercicio-item--completado" : ""
        }`}
      >
        <div className="sesion__ejercicio-header">
          <div className="sesion__ejercicio-info">
            <span className="sesion__ejercicio-nombre">
              Circuito de Movilidad Articular
            </span>

            <div className="sesion__calentamiento-meta">
              <span className="sesion__calentamiento-tag">
                <IconoFuego />
                {items.length} ejercicios de preparación articular
              </span>
            </div>

            {/* Listado de ejercicios que componen el bloque de calentamiento */}
            <div className="sesion__calentamiento-sublista">
              {items.map((item, index) => (
                <div key={item.id} className="sesion__calentamiento-subitem">
                  <span className="sesion__calentamiento-subitem-numero">
                    {index + 1}
                  </span>
                  <span className="sesion__calentamiento-subitem-nombre">
                    {item.nombre}
                  </span>
                </div>
              ))}
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
                ? "Marcar calentamiento como pendiente"
                : "Marcar calentamiento como completado"
            }
            title={
              completado
                ? "Marcar calentamiento como pendiente"
                : "Marcar calentamiento como completado"
            }
          >
            <IconoCheck />
          </button>
        </div>
      </div>
    </section>
  );
}

