// CardEvolucionPesos.tsx
// Card principal de evolución de pesos con filtros en cascada (Rutina -> Tipo -> Ejercicio)
import { useState, useMemo } from "react";
import type {
  EjercicioEvolucion,
  TipoEjercicioEstadistica,
} from "../types/estadisticas.types";
import FiltrosEvolucion from "./FiltrosEvolucion";
import BadgePR from "./BadgePR";
import GraficoEvolucionPesos from "./GraficoEvolucionPesos";

interface CardEvolucionPesosProps {
  ejercicios: EjercicioEvolucion[];
}

const IconoTendencia = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default function CardEvolucionPesos({
  ejercicios,
}: CardEvolucionPesosProps) {
  // 1° Filtro: Rutina (1, 2, 3)
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState<number>(1);

  // 2° Filtro: Tipo de ejercicio (fuerza o core)
  const [tipoSeleccionado, setTipoSeleccionado] =
    useState<TipoEjercicioEstadistica>("fuerza");

  // Obtener números de rutinas únicas disponibles
  const rutinasDisponibles = useMemo(() => {
    const set = new Set<number>();
    ejercicios.forEach((ej) => set.add(ej.numeroRutina));
    return Array.from(set).sort((a, b) => a - b);
  }, [ejercicios]);

  // Ejercicios filtrados por rutina y tipo
  const ejerciciosFiltrados = useMemo(() => {
    return ejercicios.filter(
      (ej) =>
        ej.numeroRutina === rutinaSeleccionada && ej.tipo === tipoSeleccionado
    );
  }, [ejercicios, rutinaSeleccionada, tipoSeleccionado]);

  // 3° Filtro: Ejercicio específico
  const [ejercicioIdManual, setEjercicioIdManual] = useState<number | null>(
    null
  );

  // Si el ejercicio actual ya no pertenece a la lista filtrada, toma el primero disponible
  const ejercicioActivo = useMemo(() => {
    if (ejerciciosFiltrados.length === 0) return null;
    const encontrado = ejerciciosFiltrados.find(
      (ej) => ej.id === ejercicioIdManual
    );
    return encontrado || ejerciciosFiltrados[0];
  }, [ejerciciosFiltrados, ejercicioIdManual]);

  const manejarCambioRutina = (num: number) => {
    setRutinaSeleccionada(num);
    setEjercicioIdManual(null); // Resetea para auto-seleccionar el primero
  };

  const manejarCambioTipo = (tipo: TipoEjercicioEstadistica) => {
    setTipoSeleccionado(tipo);
    setEjercicioIdManual(null); // Resetea para auto-seleccionar el primero
  };

  return (
    <article className="estadisticas__card estadisticas__card--evolucion">
      <div className="estadisticas__card-header">
        <div className="estadisticas__card-icono">
          <IconoTendencia />
        </div>
        <div>
          <h2 className="estadisticas__card-titulo">EVOLUCIÓN DE PESOS</h2>
          <p className="estadisticas__card-subtitulo">
            Filtrá por rutina, tipo y ejercicio para consultar tu progreso y PR
          </p>
        </div>
      </div>

      {/* 1°, 2° y 3° Paso de filtrado */}
      <FiltrosEvolucion
        rutinasDisponibles={rutinasDisponibles.length > 0 ? rutinasDisponibles : [1, 2, 3]}
        rutinaSeleccionada={rutinaSeleccionada}
        onCambiarRutina={manejarCambioRutina}
        tipoSeleccionado={tipoSeleccionado}
        onCambiarTipo={manejarCambioTipo}
        ejerciciosFiltrados={ejerciciosFiltrados}
        ejercicioSeleccionadoId={ejercicioActivo ? ejercicioActivo.id : 0}
        onCambiarEjercicio={(id) => setEjercicioIdManual(id)}
      />

      {/* Detalle del ejercicio activo: PR y Progresión */}
      {ejercicioActivo ? (
        <div className="estadisticas__evolucion-detalle">
          {/* Badge PR Histórico */}
          <BadgePR
            pr={ejercicioActivo.prHistorico}
            nombreEjercicio={ejercicioActivo.nombre}
          />

          {/* Gráfico interactivo de líneas con todos los registros de cargas */}
          <GraficoEvolucionPesos
            registros={ejercicioActivo.registros}
            pesoInicial={ejercicioActivo.pesoInicial}
            unidad={ejercicioActivo.unidad}
          />
        </div>
      ) : (
        <p className="estadisticas__sin-registros">
          Seleccioná un ejercicio para consultar su evolución de pesos.
        </p>
      )}
    </article>
  );
}

