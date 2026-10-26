// App.tsx
import { Routes, Route } from "react-router-dom";
import InicioAlumno from "./pages/vista-alumno/ver-rutinas/Inicio";
import ConsultarRutinas from "./pages/vista-alumno/ver-rutinas/consultar-rutinas/ConsultarRutinas";
import DetalleRutina from "./pages/vista-alumno/ver-rutinas/detalle-rutina/DetalleRutina";
import VerEstadisticas from "./pages/vista-alumno/ver-estadisticas/VerEstadisticas";
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
          <Route path="/estadisticas" element={<VerEstadisticas />} />
        </Routes>
      </div>

      {/* Barra de navegación inferior fija independientemente de la pantalla */}
      <HeaderAlumno />
    </div>
  );
}