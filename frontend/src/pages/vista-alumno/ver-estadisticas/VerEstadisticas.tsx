// VerEstadisticas.tsx
// Componente principal de estadísticas y evolución del alumno
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "../components-comunes/BotonVolver";
import EncabezadoPantalla from "../components-comunes/EncabezadoPantalla";
import MensajeEstado from "../components-comunes/MensajeEstado";
import type { PlanEstadistica } from "./types/estadisticas.types";
import SelectorPlan from "./components/SelectorPlan";
import CardSesionesFinalizadas from "./components/CardSesionesFinalizadas";
import CardGruposMusculares from "./components/CardGruposMusculares";
import CardEvolucionPesos from "./components/CardEvolucionPesos";
import {
  obtenerPlanesDisponibles,
  obtenerEstadisticasPlan,
} from "./services/estadisticasApi";
import "./VerEstadisticas.css";

const IconoGrafico = () => (
  <svg
    className="estadisticas__icono-pantalla"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export default function VerEstadisticas() {
  const navigate = useNavigate();

  const [planes, setPlanes] = useState<
    { id: number; numero: number; nombre: string; esActual: boolean }[]
  >([]);
  const [planActual, setPlanActual] = useState<PlanEstadistica | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // 1. Obtener listado de planes (actual y anteriores)
    obtenerPlanesDisponibles()
      .then((listaPlanes) => {
        setPlanes(listaPlanes);
        // Por defecto cargamos el primer plan (plan actual)
        const idDefecto = listaPlanes[0]?.id ?? 1;
        return obtenerEstadisticasPlan(idDefecto);
      })
      .then((datosPlan) => {
        setPlanActual(datosPlan);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const cambiarPlan = (planId: number) => {
    setCargando(true);
    obtenerEstadisticasPlan(planId)
      .then((datos) => {
        setPlanActual(datos);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setCargando(false);
      });
  };

  const irAlInicio = () => {
    navigate("/");
  };

  return (
    <main className="estadisticas">
      <div className="estadisticas__container">
        {/* Barra superior con botón volver */}
        <BotonVolver onClick={irAlInicio} ariaLabel="Volver a la pantalla de inicio" />

        {/* Encabezado descriptivo de la pantalla con icono SVG y título */}
        <EncabezadoPantalla
          titulo="EVOLUCIÓN DEL ALUMNO"
          subtitulo="Conocé tu progreso en los pesos utilizados, sesiones finalizadas y grupos musculares trabajados."
          icono={<IconoGrafico />}
          
        />

        {/* Estado: Cargando */}
        {cargando && !planActual && (
          <MensajeEstado
            tipo="cargando"
            mensaje="Cargando estadísticas del alumno..."
          />
        )}

        {/* Estado: Error */}
        {error && (
          <MensajeEstado
            tipo="error"
            mensaje="Ocurrió un error al cargar las estadísticas. Por favor, intentá nuevamente más tarde."
            onAccion={irAlInicio}
            textoAccion="Volver"
          />
        )}

        {/* Contenido cuando hay datos cargados */}
        {!error && planActual && (
          <>
            {/* Selector de Plan Actual vs Planes Anteriores */}
            <SelectorPlan
              planes={planes}
              planSeleccionado={planActual}
              onCambiarPlan={cambiarPlan}
            />

            {/* Card 1: Cantidad de sesiones finalizadas y porcentaje por rutina */}
            <CardSesionesFinalizadas
              estadistica={planActual.estadisticaSesiones}
            />

            {/* Card 2: Porcentaje de grupos musculares trabajados */}
            <CardGruposMusculares grupos={planActual.gruposMusculares} />

            {/* Card 3: Evolución de pesos con filtros en cascada (Rutina -> Tipo -> Ejercicio) y PR */}
            <CardEvolucionPesos ejercicios={planActual.ejerciciosEvolucion} />
          </>
        )}
      </div>
    </main>
  );
}

