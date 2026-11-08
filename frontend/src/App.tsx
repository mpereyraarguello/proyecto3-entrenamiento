// App.tsx
import { Routes, Route } from "react-router-dom";

import "./App.css";
import VistaAlumno from "./VistaAlumno";
import VistaProfesor from "./VistaProfesor";

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