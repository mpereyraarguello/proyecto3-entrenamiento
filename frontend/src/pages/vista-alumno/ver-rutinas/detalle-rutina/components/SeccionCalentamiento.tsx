// SeccionCalentamiento.tsx
interface SeccionCalentamientoProps {
  indicaciones: string;
}

export default function SeccionCalentamiento({
  indicaciones,
}: SeccionCalentamientoProps) {
  if (!indicaciones) return null;

  return (
    <section className="detalle-rutina__seccion-card">
      <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
        Calentamiento
      </h2>
      <p className="detalle-rutina__bloque-texto">{indicaciones}</p>
    </section>
  );
}

