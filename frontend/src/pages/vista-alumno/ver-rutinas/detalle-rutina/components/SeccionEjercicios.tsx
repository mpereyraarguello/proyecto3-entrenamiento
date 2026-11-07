// SeccionEjercicios.tsx
import type { Ejercicio } from "../../types/rutinas.types";
import EjercicioItem from "./EjercicioItem";

interface SeccionEjerciciosProps {
  titulo: string;
  ejercicios: Ejercicio[];
}

export default function SeccionEjercicios({
  titulo,
  ejercicios,
}: SeccionEjerciciosProps) {
  if (!ejercicios || ejercicios.length === 0) return null;

  return (
    <section className="detalle-rutina__seccion-card">
      <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
        {titulo}
      </h2>
      <div className="detalle-rutina__ejercicios-lista">
        {ejercicios.map((ej) => (
          <EjercicioItem key={ej.id} ejercicio={ej} />
        ))}
      </div>
    </section>
  );
}

