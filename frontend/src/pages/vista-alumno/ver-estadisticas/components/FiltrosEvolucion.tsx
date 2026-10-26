// FiltrosEvolucion.tsx
// Componente de filtrado en cascada: 1° Rutina -> 2° Tipo de Ejercicio -> 3° Ejercicio
import type {
  TipoEjercicioEstadistica,
  EjercicioEvolucion,
} from "../types/estadisticas.types";

interface FiltrosEvolucionProps {
  rutinasDisponibles: number[];
  rutinaSeleccionada: number;
  onCambiarRutina: (rutinaNumero: number) => void;
  tipoSeleccionado: TipoEjercicioEstadistica;
  onCambiarTipo: (tipo: TipoEjercicioEstadistica) => void;
  ejerciciosFiltrados: EjercicioEvolucion[];
  ejercicioSeleccionadoId: number;
  onCambiarEjercicio: (ejercicioId: number) => void;
}

export default function FiltrosEvolucion({
  rutinasDisponibles,
  rutinaSeleccionada,
  onCambiarRutina,
  tipoSeleccionado,
  onCambiarTipo,
  ejerciciosFiltrados,
  ejercicioSeleccionadoId,
  onCambiarEjercicio,
}: FiltrosEvolucionProps) {
  return (
    <div className="estadisticas__filtros-cascada">
      {/* 1° Filtro: Rutina */}
      <div className="estadisticas__filtro-grupo">
        <label className="estadisticas__filtro-etiqueta">
          1. Seleccionar rutina:
        </label>
        <div className="estadisticas__filtro-opciones">
          {rutinasDisponibles.map((num) => {
            const activo = num === rutinaSeleccionada;
            return (
              <button
                key={num}
                type="button"
                className={`estadisticas__btn-filtro ${
                  activo ? "estadisticas__btn-filtro--activo" : ""
                }`}
                onClick={() => onCambiarRutina(num)}
              >
                Rutina {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2° Filtro: Tipo de ejercicio (Core y Fuerza) */}
      <div className="estadisticas__filtro-grupo">
        <label className="estadisticas__filtro-etiqueta">
          2. Tipo de ejercicio:
        </label>
        <div className="estadisticas__filtro-opciones">
          <button
            type="button"
            className={`estadisticas__btn-filtro ${
              tipoSeleccionado === "fuerza"
                ? "estadisticas__btn-filtro--activo"
                : ""
            }`}
            onClick={() => onCambiarTipo("fuerza")}
          >
            Fuerza
          </button>
          <button
            type="button"
            className={`estadisticas__btn-filtro ${
              tipoSeleccionado === "core"
                ? "estadisticas__btn-filtro--activo"
                : ""
            }`}
            onClick={() => onCambiarTipo("core")}
          >
            Core
          </button>
        </div>
      </div>

      {/* 3° Filtro: Ejercicio */}
      <div className="estadisticas__filtro-grupo">
        <label
          htmlFor="select-ejercicio"
          className="estadisticas__filtro-etiqueta"
        >
          3. Ejercicio a consultar:
        </label>
        {ejerciciosFiltrados.length > 0 ? (
          <select
            id="select-ejercicio"
            className="estadisticas__select-ejercicio"
            value={ejercicioSeleccionadoId}
            onChange={(e) => onCambiarEjercicio(Number(e.target.value))}
          >
            {ejerciciosFiltrados.map((ej) => (
              <option key={ej.id} value={ej.id}>
                {ej.nombre}
              </option>
            ))}
          </select>
        ) : (
          <p className="estadisticas__filtro-vacio">
            No hay ejercicios registrados para esta combinación.
          </p>
        )}
      </div>
    </div>
  );
}

