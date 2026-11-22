// HistorialSesiones.tsx
// Pantalla de historial de sesiones de entrenamiento del alumno

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotonVolver from "../components-comunes/BotonVolver";
import EncabezadoPantalla from "../components-comunes/EncabezadoPantalla";
import MensajeEstado from "../components-comunes/MensajeEstado";
import type { SesionHistorial } from "./types/historial.types";
import {
  obtenerHistorialPlan,
  obtenerPlanesConHistorial,
  type PlanConHistorial,
} from "./services/historialApi";
import HistorialSesionCard from "./components/HistorialSesionCard";
import "./HistorialSesiones.css";

const IconoHistorial = () => (
  <svg
    className="detalle-rutina__icono-pantalla"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
    <path d="M3.05 11a9 9 0 0 1 .5-2m0 0A9 9 0 0 1 12 3" />
  </svg>
);

const IconoPesaSmall = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6.5 6.5v11" />
    <path d="M17.5 6.5v11" />
    <path d="M3.5 9v6" />
    <path d="M20.5 9v6" />
    <path d="M6.5 12h11" />
  </svg>
);

const ALUMNO_ID = "alu-1";

export default function HistorialSesiones() {
  const navigate = useNavigate();
  const { id: planId } = useParams<{ id?: string }>();

  const [sesiones, setSesiones] = useState<SesionHistorial[]>([]);
  const [totalSesiones, setTotalSesiones] = useState<number>(0);
  const [totalEjerciciosCompletados, setTotalEjerciciosCompletados] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [planes, setPlanes] = useState<PlanConHistorial[]>([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      setCargando(true);
      setError(false);

      const planesConHistorial = await obtenerPlanesConHistorial(ALUMNO_ID);
      setPlanes(planesConHistorial);

      const planConsultado = planId ?? planesConHistorial[0]?.planId;
      if (!planConsultado) {
        setSesiones([]);
        setTotalSesiones(0);
        setTotalEjerciciosCompletados(0);
        return;
      }

      const data = await obtenerHistorialPlan(ALUMNO_ID, planConsultado);
      setSesiones(data.sesiones);
      setTotalSesiones(data.totalSesiones);
      setTotalEjerciciosCompletados(data.totalEjerciciosCompletados);
    };

    cargarHistorial()
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, [planId]);

  const handleVolver = () => {
    if (planId) {
      navigate(`/planes/${planId}/rutinas`);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="historial">
      <div className="historial__container">
        <BotonVolver onClick={handleVolver} ariaLabel="Volver" />

        <EncabezadoPantalla
          titulo="HISTORIAL DE SESIONES"
          subtitulo="Consultá las sesiones de entrenamiento completadas, pesos utilizados y repeticiones registradas."
          icono={<IconoHistorial />}
          badge={`${sesiones.length} sesiones registradas`}
        />

        {cargando && (
          <MensajeEstado
            tipo="cargando"
            mensaje="Cargando historial de sesiones..."
          />
        )}

        {error && !cargando && (
          <MensajeEstado
            tipo="error"
            mensaje="No se pudo cargar el historial de sesiones."
            onAccion={handleVolver}
            textoAccion="Volver"
          />
        )}

        {!cargando && !error && (
          <div className="historial__contenido">
            {planes.length > 0 && (
              <label className="historial__selector-plan">
                <span>Plan de entrenamiento</span>
                <select
                  value={planId ?? planes[0].planId}
                  onChange={(e) => navigate(`/planes/${e.target.value}/historial`)}
                >
                  {planId && !planes.some((plan) => plan.planId === planId) && (
                    <option value={planId}>Plan actual (sin sesiones)</option>
                  )}
                  {planes.map((plan) => (
                    <option key={plan.planId} value={plan.planId}>
                      {plan.etiqueta}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {/* Resumen numérico */}
            <section className="historial__resumen-grid" aria-label="Métricas del historial">
              <div className="historial__resumen-card">
                <span className="historial__resumen-numero">{totalSesiones}</span>
                <span className="historial__resumen-label">Sesiones totales</span>
              </div>
              <div className="historial__resumen-card">
                <span className="historial__resumen-numero">{totalEjerciciosCompletados}</span>
                <span className="historial__resumen-label">Ejercicios realizados</span>
              </div>
            </section>

            {/* Listado de sesiones */}
            {sesiones.length === 0 ? (
              <div className="historial__vacio">
                <IconoPesaSmall />
                <h3 className="historial__vacio-titulo">Aún no hay sesiones</h3>
                <p className="historial__vacio-texto">
                  Iniciá tu primera sesión de entrenamiento para comenzar a registrar tus pesos y repeticiones.
                </p>
                <button
                  type="button"
                  className="historial__boton-iniciar"
                  onClick={() => navigate(`/planes/${planId || 22}/rutinas`)}
                >
                  Ir a rutinas
                </button>
              </div>
            ) : (
              <div className="historial__lista">
                {sesiones.map((sesion, index) => (
                  <HistorialSesionCard
                    key={sesion.id}
                    sesion={sesion}
                    inicialmenteAbierto={index === 0}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
