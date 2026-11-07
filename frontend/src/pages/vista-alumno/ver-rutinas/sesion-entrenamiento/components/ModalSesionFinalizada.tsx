// ModalSesionFinalizada.tsx
// Modal que se muestra al finalizar la sesión de entrenamiento

interface ModalSesionFinalizadaProps {
  rutinaNumero: number;
  totalEjercicios: number;
  onVolver: () => void;
}

const IconoCheckCircle = () => (
  <svg
    className="sesion__modal-icono"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function ModalSesionFinalizada({
  rutinaNumero,
  totalEjercicios,
  onVolver,
}: ModalSesionFinalizadaProps) {
  return (
    <div className="sesion__modal-overlay">
      <div className="sesion__modal-card">
        <IconoCheckCircle />
        <h2 className="sesion__modal-titulo">Sesion Finalizada</h2>
        <p className="sesion__modal-texto">
          Completaste todos los ejercicios de la Rutina N° {rutinaNumero}.
        </p>
        <div className="sesion__modal-stat">
          <span className="sesion__modal-stat-numero">{totalEjercicios}</span>
          <span className="sesion__modal-stat-label">ejercicios completados</span>
        </div>
        <button
          type="button"
          className="detalle-rutina__boton detalle-rutina__boton--iniciar"
          onClick={onVolver}
        >
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Finalizar
        </button>
      </div>
    </div>
  );
}
