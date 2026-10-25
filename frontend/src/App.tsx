// App.tsx
import { Routes, Route } from "react-router-dom";
import InicioAlumno from "./pages/vista-alumno/ver-rutinas/Inicio";
import ConsultarRutinas from "./pages/vista-alumno/ver-rutinas/consultar-rutinas/ConsultarRutinas";
import DetalleRutina from "./pages/vista-alumno/ver-rutinas/detalle-rutina/DetalleRutina";
import SesionEntrenamiento from "./pages/vista-alumno/ver-rutinas/sesion-entrenamiento/SesionEntrenamiento";
import HistorialSesiones from "./pages/vista-alumno/ver-rutinas/historial-sesiones/HistorialSesiones";
import HeaderAlumno from "./pages/vista-alumno/components-comunes/HeaderAlumno";
import "./App.css";

export default function App() {
  return (
    <div className="app-layout">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<InicioAlumno />} />
          <Route path="/planes/:id/rutinas" element={<ConsultarRutinas />} />
          <Route path="/planes/:id/rutinas/:idRutina" element={<DetalleRutina />} />
          <Route path="/planes/:id/rutinas/:idRutina/sesion" element={<SesionEntrenamiento />} />
          <Route path="/historial" element={<HistorialSesiones />} />
          <Route path="/planes/:id/historial" element={<HistorialSesiones />} />
          <Route
            path="/estadisticas"
            element={
              <main
                style={{
                  minHeight: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 20px",
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-coolvetica, sans-serif)",
                    fontSize: "2rem",
                    marginBottom: "8px",
                  }}
                >
                  ESTADÍSTICAS
                </h1>
                <p
                  style={{
                    color: "#6e8b7e",
                    fontSize: "0.95rem",
                    maxWidth: "380px",
                  }}
                >
                  Módulo de estadísticas del alumno en desarrollo. Próximamente
                  podrás consultar tus métricas y evolución.
                </p>
              </main>
            }
          />
        </Routes>
      </div>

      {/* Barra de navegación inferior fija independientemente de la pantalla */}
      <HeaderAlumno />
    </div>
  );
}