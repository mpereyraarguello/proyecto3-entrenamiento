// SeccionEstiramiento.tsx
interface SeccionEstiramientoProps {
  descripcion: string;
}

export default function SeccionEstiramiento({
  descripcion,
}: SeccionEstiramientoProps) {
  if (!descripcion) return null;

  return (
    <section className="detalle-rutina__seccion-card">
      <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
        Estiramiento
      </h2>
      <p className="detalle-rutina__estiramiento-texto">{descripcion}</p>
    </section>
  );
}

