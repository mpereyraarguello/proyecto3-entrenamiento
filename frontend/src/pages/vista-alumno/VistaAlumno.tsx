// src/pages/vista-alumno/VistaAlumno.tsx
import { Routes, Route } from "react-router-dom";
import InicioAlumno from "./ver-rutinas/Inicio";
import ConsultarRutinas from "./ver-rutinas/consultar-rutinas/ConsultarRutinas";
import DetalleRutina from "./ver-rutinas/detalle-rutina/DetalleRutina";
import HistorialSesiones from "./ver-rutinas/historial-sesiones/HistorialSesiones";
import SesionEntrenamiento from "./ver-rutinas/sesion-entrenamiento/SesionEntrenamiento";
import VerEstadisticas from "./ver-estadisticas/VerEstadisticas";
import HeaderAlumno from "./components-comunes/HeaderAlumno";

export default function VistaAlumno() {
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
          <Route path="/estadisticas" element={<VerEstadisticas />} />
        </Routes>
      </div>

      {/* Barra de navegación inferior fija independientemente de la pantalla */}
      <HeaderAlumno />
    </div>
  );
}