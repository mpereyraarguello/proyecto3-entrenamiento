// AlertaSesion.tsx
interface AlertaSesionProps {
  numeroRutina?: number;
  onFinalizar: () => void;
}

export default function AlertaSesion({
  numeroRutina,
  onFinalizar,
}: AlertaSesionProps) {
  return (
    <aside className="detalle-rutina__alerta-inicio" role="status">
      <div>
        <h3 className="detalle-rutina__alerta-titulo">
          ¡Sesión iniciada con éxito!
        </h3>
        <p className="detalle-rutina__alerta-texto">
          Comenzaste la Rutina N° {numeroRutina}. Podés seguir tus ejercicios a
          continuación.
        </p>
      </div>
      <button
        type="button"
        className="detalle-rutina__boton detalle-rutina__boton--finalizar"
        onClick={onFinalizar}
      >
        Finalizar
      </button>
    </aside>
  );
}

