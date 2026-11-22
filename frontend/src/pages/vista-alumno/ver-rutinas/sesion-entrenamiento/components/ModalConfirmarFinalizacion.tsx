// ModalConfirmarFinalizacion.tsx
// Pide confirmación antes de cerrar la sesión, porque después no se puede modificar (CP-2A-06)

interface ModalConfirmarFinalizacionProps {
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ModalConfirmarFinalizacion({
  onConfirmar,
  onCancelar,
}: ModalConfirmarFinalizacionProps) {
  return (
    <div className="sesion__modal-overlay">
      <div className="sesion__modal-card" role="dialog" aria-modal="true">
        <h2 className="sesion__modal-titulo">¿Finalizar la sesión?</h2>
        <p className="sesion__modal-texto">
          Una vez finalizada no vas a poder modificar los pesos ni las repeticiones registradas.
        </p>
        <div className="sesion__modal-acciones">
          <button
            type="button"
            className="detalle-rutina__boton detalle-rutina__boton--iniciar"
            onClick={onConfirmar}
          >
            Sí, finalizar
          </button>
          <button
            type="button"
            className="sesion__boton-cancelar"
            onClick={onCancelar}
          >
            Seguir entrenando
          </button>
        </div>
      </div>
    </div>
  );
}
