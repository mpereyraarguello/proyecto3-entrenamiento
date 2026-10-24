import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

interface PlanActivo {
  id: number;
  numero: number;
  fechaInicio: string;
  fechaFin: string;
}

interface InicioProps {
  nombre?: string;
}

const PLAN_MOCK: PlanActivo = {
  id: 22,
  numero: 22,
  fechaInicio: "2026-10-19",
  fechaFin: "2026-11-13",
};

const obtenerPlanActivo = (): Promise<PlanActivo> =>
  new Promise((resolve) => setTimeout(() => resolve(PLAN_MOCK), 400));

const formatearFecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-AR", { timeZone: "UTC" });

const IconoPesa = () => (
  <svg
    className="inicio__icono"
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

const IconoFlecha = () => (
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
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export default function InicioAlumno({ nombre = "Mateo" }: InicioProps) {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PlanActivo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    obtenerPlanActivo()
      .then(setPlan)
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  return (
    <main className="inicio">
      <div className="inicio__container">
        <header>
          <div className="inicio__encabezado">
            <IconoPesa />
            <h1 className="inicio__titulo">¡Bienvenido {nombre}!</h1>
          </div>
          <p className="inicio__subtitulo">
            Encontrá tu plan de entrenamiento activo y seguí tus rutinas.
          </p>
        </header>

        {cargando && (
          <p className="inicio__mensaje inicio__mensaje--cargando">
            Cargando plan activo...
          </p>
        )}

        {error && (
          <p className="inicio__mensaje inicio__mensaje--error">
            No se pudo obtener el plan activo. Intentá nuevamente más tarde.
          </p>
        )}

        {plan && !cargando && !error && (
          <section className="inicio__card">
            <div className="inicio__plan-header">
              <h2 className="inicio__plan-titulo">PLAN N° {plan.numero}</h2>
              <span className="inicio__badge">Activo</span>
            </div>

            <div className="inicio__fila">
              <span className="inicio__etiqueta">Fecha de inicio</span>
              <span className="inicio__valor">
                {formatearFecha(plan.fechaInicio)}
              </span>
            </div>

            <div className="inicio__fila">
              <span className="inicio__etiqueta">Fecha de fin</span>
              <span className="inicio__valor">
                {formatearFecha(plan.fechaFin)}
              </span>
            </div>

            <button
              type="button"
              className="inicio__boton"
              onClick={() => navigate(`/planes/${plan.id}/rutinas`)}
            >
              Ver rutinas
              <IconoFlecha />
            </button>
          </section>
        )}
      </div>
    </main>
  );
}