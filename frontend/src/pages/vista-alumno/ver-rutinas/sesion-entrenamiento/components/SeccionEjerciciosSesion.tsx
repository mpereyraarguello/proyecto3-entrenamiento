// SeccionEjerciciosSesion.tsx
// Sección de ejercicios agrupados por tipo (core/fuerza) durante la sesión

import type { EjercicioSesion } from "../types/sesion.types";
import EjercicioSesionItem from "./EjercicioSesionItem";

interface SeccionEjerciciosSesionProps {
  titulo: string;
  ejercicios: EjercicioSesion[];
  onCambiarPeso: (ejercicioId: number, peso: string) => void;
  onCambiarRepeticiones: (ejercicioId: number, reps: string) => void;
  onToggleCompletado: (ejercicioId: number) => void;
}

export default function SeccionEjerciciosSesion({
  titulo,
  ejercicios,
  onCambiarPeso,
  onCambiarRepeticiones,
  onToggleCompletado,
}: SeccionEjerciciosSesionProps) {
  if (!ejercicios || ejercicios.length === 0) return null;

  const completados = ejercicios.filter((ej) => ej.registro.completado).length;
  const total = ejercicios.length;

  return (
    <section className="detalle-rutina__seccion-card">
      <div className="sesion__seccion-header-row">
        <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
          {titulo}
        </h2>
        <span className="sesion__progreso-badge">
          {completados}/{total}
        </span>
      </div>
      <div className="detalle-rutina__ejercicios-lista">
        {ejercicios.map((ej) => (
          <EjercicioSesionItem
            key={ej.id}
            ejercicioSesion={ej}
            onCambiarPeso={onCambiarPeso}
            onCambiarRepeticiones={onCambiarRepeticiones}
            onToggleCompletado={onToggleCompletado}
          />
        ))}
      </div>
    </section>
  );
}
