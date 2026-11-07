// ListaRutinas.tsx
import type { RutinaResumen } from "../../types/rutinas.types";
import CardRutina from "./CardRutina";

interface ListaRutinasProps {
  rutinas: RutinaResumen[];
  onSeleccionarRutina: (id: number) => void;
}

export default function ListaRutinas({
  rutinas,
  onSeleccionarRutina,
}: ListaRutinasProps) {
  return (
    <section
      className="ver-rutinas__lista"
      aria-label="Listado de rutinas del plan activo"
    >
      {rutinas.map((rutina) => (
        <CardRutina
          key={rutina.id}
          rutina={rutina}
          onSeleccionar={onSeleccionarRutina}
        />
      ))}
    </section>
  );
}

