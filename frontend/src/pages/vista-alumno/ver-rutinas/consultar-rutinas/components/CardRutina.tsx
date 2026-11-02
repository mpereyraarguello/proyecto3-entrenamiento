// CardRutina.tsx
import type { RutinaResumen } from "../../types/rutinas.types";

interface CardRutinaProps {
  rutina: RutinaResumen;
  onSeleccionar: (id: number) => void;
}

const IconoPesaMini = () => (
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
    <path d="M6 6v12" />
    <path d="M18 6v12" />
    <path d="M3 8v8" />
    <path d="M21 8v8" />
    <path d="M6 12h12" />
  </svg>
);

const IconoFlecha = () => (
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
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export default function CardRutina({ rutina, onSeleccionar }: CardRutinaProps) {
  return (
    <article
      className="ver-rutinas__card"
      onClick={() => onSeleccionar(rutina.id)}
    >
      <div className="ver-rutinas__card-header">
        <h2 className="ver-rutinas__card-titulo">RUTINA N° {rutina.numero}</h2>
        <span className="ver-rutinas__badge-ejercicios">
          <IconoPesaMini />
          {rutina.cantidadEjercicios} ejercicios
        </span>
      </div>

      <p className="ver-rutinas__card-descripcion">
        Incluye calentamiento, ejercicios de core, fuerza, cardio y
        estiramientos indicados por tu profesor.
      </p>

      <div className="ver-rutinas__card-footer">
        <button
          type="button"
          className="ver-rutinas__boton ver-rutinas__boton--iniciar"
          onClick={(e) => {
            e.stopPropagation();
            onSeleccionar(rutina.id);
          }}
        >
          Iniciar
          <IconoFlecha />
        </button>
      </div>
    </article>
  );
}

