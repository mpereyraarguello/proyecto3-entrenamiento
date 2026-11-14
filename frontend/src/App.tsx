// App.tsx
import { Routes, Route } from "react-router-dom";
import VistaAlumno from "./pages/vista-alumno/VistaAlumno";
import VistaProfesor from "./pages/vista-profesor/VistaProfesor";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* Vista del profesor (maneja sus propias pestañas internamente) */}
      <Route path="/profesor/*" element={<VistaProfesor />} />

      {/* Vista del alumno (maneja sus propias rutas internamente) */}
      <Route path="/*" element={<VistaAlumno />} />
    </Routes>
  );
}