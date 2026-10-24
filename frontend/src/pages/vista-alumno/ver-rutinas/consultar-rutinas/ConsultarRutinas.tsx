// ConsultarRutinas.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotonVolver from "../components-comunes/BotonVolver";
import EncabezadoPantalla from "../components-comunes/EncabezadoPantalla";
import MensajeEstado from "../components-comunes/MensajeEstado";
import type {
  PlanActivoDetalle,
  RutinaResumen,
} from "../types/rutinas.types";
import ListaRutinas from "./components/ListaRutinas";
import SinPlanActivo from "./components/SinPlanActivo";
import { obtenerRutinasPorPlan } from "./services/rutinasApi";
import "./ConsultarRutinas.css";

const IconoRutinas = () => (
  <svg
    className="ver-rutinas__icono-pantalla"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
    <circle cx="12" cy="8" r="0.5" fill="currentColor" />
  </svg>
);

export default function ConsultarRutinas() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [plan, setPlan] = useState<PlanActivoDetalle | null>(null);
  const [rutinas, setRutinas] = useState<RutinaResumen[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    obtenerRutinasPorPlan(id)
      .then((resultado) => {
        setPlan(resultado.plan);
        setRutinas(resultado.rutinas);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  const irAlInicio = () => {
    navigate("/");
  };

  const seleccionarRutina = (rutinaId: number) => {
    const planId = plan?.id ?? id ?? 1;
    navigate(`/planes/${planId}/rutinas/${rutinaId}`);
  };

  return (
    <main className="ver-rutinas">
      <div className="ver-rutinas__container">
        <BotonVolver onClick={irAlInicio} />

        <EncabezadoPantalla
          titulo="RUTINAS ASIGNADAS"
          subtitulo="Previsualizá y seleccioná una de las rutinas de tu plan de entrenamiento activo para conocer sus ejercicios antes de iniciar la sesión."
          icono={<IconoRutinas />}
          badge={plan && plan.activo ? `PLAN N° ${plan.numero} ACTIVO` : undefined}
        />

        {cargando && (
          <MensajeEstado
            tipo="cargando"
            mensaje="Cargando rutinas asignadas..."
          />
        )}

        {error && !cargando && (
          <MensajeEstado
            tipo="error"
            mensaje="Ocurrió un error al consultar las rutinas del plan activo. Por favor, intentá nuevamente más tarde."
            onAccion={irAlInicio}
            textoAccion="Volver"
          />
        )}

        {!cargando && !error && (!plan || !plan.activo) && (
          <SinPlanActivo onVolver={irAlInicio} />
        )}

        {!cargando && !error && plan && plan.activo && (
          <ListaRutinas
            rutinas={rutinas}
            onSeleccionarRutina={seleccionarRutina}
          />
        )}
      </div>
    </main>
  );
}

