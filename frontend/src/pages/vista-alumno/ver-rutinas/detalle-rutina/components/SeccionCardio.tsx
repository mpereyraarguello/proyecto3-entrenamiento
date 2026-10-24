// SeccionCardio.tsx
interface SeccionCardioProps {
  cardio: string;
}

export default function SeccionCardio({ cardio }: SeccionCardioProps) {
  if (!cardio) return null;

  return (
    <section className="detalle-rutina__seccion-card">
      <h2 className="detalle-rutina__seccion-titulo detalle-rutina__seccion-titulo--categoria">
        Cardio
      </h2>
      <p className="detalle-rutina__bloque-texto">{cardio}</p>
    </section>
  );
}

