// EjercicioItem.tsx
import type { Ejercicio } from "../../types/rutinas.types";

interface EjercicioItemProps {
  ejercicio: Ejercicio;
}

export default function EjercicioItem({ ejercicio }: EjercicioItemProps) {
  const tieneDetalle =
    Boolean(ejercicio.seriesRepeticiones) ||
    Boolean(ejercicio.pesoInicial) ||
    Boolean(ejercicio.duracion);

  return (
    <article className="detalle-rutina__ejercicio-item">
      <div className="detalle-rutina__ejercicio-main">
        <h3 className="detalle-rutina__ejercicio-nombre">{ejercicio.nombre}</h3>
        {tieneDetalle && (
          <span
            className={`detalle-rutina__ejercicio-tag ${
              ejercicio.pesoInicial
                ? "detalle-rutina__ejercicio-tag--peso"
                : ""
            }`}
          >
            {ejercicio.pesoInicial
              ? `Peso inicial: ${ejercicio.pesoInicial}`
              : ejercicio.seriesRepeticiones || ejercicio.duracion}
          </span>
        )}
      </div>
      {ejercicio.observaciones && (
        <p className="detalle-rutina__ejercicio-observacion">
          <strong>Observaciones:</strong> {ejercicio.observaciones}
        </p>
      )}
    </article>
  );
}

