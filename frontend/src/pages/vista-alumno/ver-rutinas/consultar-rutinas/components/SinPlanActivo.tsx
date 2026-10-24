// SinPlanActivo.tsx
interface SinPlanActivoProps {
  onVolver: () => void;
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

export default function SinPlanActivo({ onVolver }: SinPlanActivoProps) {
  return (
    <section className="ver-rutinas__sin-plan">
      <h2 className="ver-rutinas__sin-plan-titulo">
        Sin plan de entrenamiento activo
      </h2>
      <p className="ver-rutinas__sin-plan-texto">
        No disponés de un plan de entrenamiento activo ni rutinas vigentes para
        consultar o ejecutar.
      </p>
      <button
        type="button"
        className="ver-rutinas__boton ver-rutinas__boton--volver"
        onClick={onVolver}
      >
        <IconoVolver />
        Volver
      </button>
    </section>
  );
}

