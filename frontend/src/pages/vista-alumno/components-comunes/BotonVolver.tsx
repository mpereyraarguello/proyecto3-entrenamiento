// BotonVolver.tsx
import "./componentsComunes.css";

interface BotonVolverProps {
  onClick: () => void;
  texto?: string;
  ariaLabel?: string;
}

const IconoVolver = () => (
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
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export default function BotonVolver({
  onClick,
  texto = "Volver",
  ariaLabel = "Volver a la pantalla anterior",
}: BotonVolverProps) {
  return (
    <div className="comunes__top-nav">
      <button
        type="button"
        className="comunes__boton-volver"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <IconoVolver />
        {texto}
      </button>
    </div>
  );
}

