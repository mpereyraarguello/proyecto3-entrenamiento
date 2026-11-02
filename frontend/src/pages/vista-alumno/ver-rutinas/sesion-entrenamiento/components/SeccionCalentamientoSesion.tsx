// SeccionCalentamientoSesion.tsx
// Sección interactiva de calentamiento en la sesión de entrenamiento (ejercicios opcionales)

interface ItemCalentamiento {
  id: string;
  nombre: string;
}

interface SeccionCalentamientoSesionProps {
  items: ItemCalentamiento[];
  completadosMap: Record<string, boolean>;
  onToggleItem: (id: string) => void;
  onMarcarTodos?: (marcar: boolean) => void;
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
  completadosMap,
  onToggleItem,
  onMarcarTodos,
}: SeccionCalentamientoSesionProps) {
  const total = items.length;
  const completados = items.filter((it) => completadosMap[it.id]).length;
  const todosMarcados = total > 0 && completados === total;

  return (
    <section className="detalle-rutina__seccion-card sesion__calentamiento-seccion">
      <div className="sesion__seccion-header-row">
        <div className="sesion__seccion-header-titulos">
          <div className="sesion__titulo-con-badge">
            <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
              Calentamiento
            </h2>
            <span className="sesion__badge-opcional">Opcional</span>
          </div>
          <p className="sesion__seccion-descripcion">
            Ejercicios de movilidad previos. Puedes marcarlos como terminados o dejarlos pendientes sin bloquear la sesión.
          </p>
        </div>

        <div className="sesion__header-acciones-opcional">
          <span className="sesion__progreso-badge">
            {completados}/{total}
          </span>
          {onMarcarTodos && total > 1 && (
            <button
              type="button"
              className="sesion__boton-marcar-todos"
              onClick={() => onMarcarTodos(!todosMarcados)}
            >
              {todosMarcados ? "Desmarcar todos" : "Marcar todos"}
            </button>
          )}
        </div>
      </div>

      <div className="sesion__calentamiento-lista">
        {items.map((item, index) => {
          const completado = Boolean(completadosMap[item.id]);

          return (
            <div
              key={item.id}
              className={`sesion__ejercicio-item sesion__calentamiento-item ${
                completado ? "sesion__ejercicio-item--completado" : ""
              }`}
            >
              <div className="sesion__ejercicio-header">
                <div className="sesion__ejercicio-info">
                  <div className="sesion__ejercicio-top-row">
                    <span className="sesion__calentamiento-numero">
                      {index + 1}
                    </span>
                    <span className="sesion__ejercicio-nombre">
                      {item.nombre}
                    </span>
                  </div>
                  <div className="sesion__calentamiento-meta">
                    <span className="sesion__calentamiento-tag">
                      <IconoFuego />
                      Movilidad articular
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`sesion__boton-check ${
                    completado ? "sesion__boton-check--activo" : ""
                  }`}
                  onClick={() => onToggleItem(item.id)}
                  aria-label={`${
                    completado ? "Marcar como pendiente" : "Marcar como terminado"
                  } ${item.nombre}`}
                  title={
                    completado ? "Marcar como pendiente" : "Marcar como terminado"
                  }
                >
                  <IconoCheck />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
