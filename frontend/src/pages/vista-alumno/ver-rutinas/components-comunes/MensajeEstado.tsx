// MensajeEstado.tsx
import "./componentsComunes.css";

interface MensajeEstadoProps {
  tipo: "cargando" | "error";
  mensaje: string;
  onAccion?: () => void;
  textoAccion?: string;
}

export default function MensajeEstado({
  tipo,
  mensaje,
  onAccion,
  textoAccion = "Volver",
}: MensajeEstadoProps) {
  if (tipo === "cargando") {
    return (
      <p className="comunes__mensaje comunes__mensaje--cargando">{mensaje}</p>
    );
  }

  return (
    <div className="comunes__mensaje comunes__mensaje--error">
      <p>{mensaje}</p>
      {onAccion && (
        <button
          type="button"
          className="comunes__boton-error"
          onClick={onAccion}
        >
          {textoAccion}
        </button>
      )}
    </div>
  );
}

