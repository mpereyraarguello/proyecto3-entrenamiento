// HeaderAlumno.tsx
// Componente de navegación inferior para la vista del alumno
import { useLocation, useNavigate } from "react-router-dom";
import "./HeaderAlumno.css";

interface HeaderAlumnoProps {
  opcionActiva?: "inicio" | "estadisticas";
  onNavegar?: (opcion: "inicio" | "estadisticas") => void;
}

const IconoInicio = () => (
  <svg
    className="header-alumno__icono"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconoEstadisticas = () => (
  <svg
    className="header-alumno__icono"
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

export default function HeaderAlumno({
  opcionActiva,
  onNavegar,
}: HeaderAlumnoProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinación de opción activa: por prop directa o por ruta actual
  const esEstadisticas =
    opcionActiva === "estadisticas" ||
    location.pathname.startsWith("/estadisticas");

  const esInicio =
    opcionActiva === "inicio" ||
    (!esEstadisticas &&
      (location.pathname === "/" || location.pathname.startsWith("/planes")));

  const manejarNavegacion = (opcion: "inicio" | "estadisticas") => {
    if (onNavegar) {
      onNavegar(opcion);
      return;
    }

    if (opcion === "inicio") {
      navigate("/");
    } else {
      navigate("/estadisticas");
    }
  };

  return (
    <nav className="header-alumno" aria-label="Navegación principal del alumno">
      <div className="header-alumno__container">
        <div className="header-alumno__nav">
          <button
            type="button"
            className={`header-alumno__enlace ${
              esInicio ? "header-alumno__enlace--activo" : ""
            }`}
            onClick={() => manejarNavegacion("inicio")}
            aria-current={esInicio ? "page" : undefined}
          >
            <IconoInicio />
            <span>Inicio</span>
          </button>

          <button
            type="button"
            className={`header-alumno__enlace ${
              esEstadisticas ? "header-alumno__enlace--activo" : ""
            }`}
            onClick={() => manejarNavegacion("estadisticas")}
            aria-current={esEstadisticas ? "page" : undefined}
          >
            <IconoEstadisticas />
            <span>Estadísticas</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
