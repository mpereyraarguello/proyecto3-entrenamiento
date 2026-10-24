// EncabezadoPantalla.tsx
import type { ReactNode } from "react";
import "./componentsComunes.css";

interface EncabezadoPantallaProps {
  titulo: string;
  subtitulo: string;
  icono?: ReactNode;
  badge?: string;
}

export default function EncabezadoPantalla({
  titulo,
  subtitulo,
  icono,
  badge,
}: EncabezadoPantallaProps) {
  return (
    <header className="comunes__header">
      <div className="comunes__encabezado">
        {icono && <div className="comunes__icono-wrapper">{icono}</div>}
        <h1 className="comunes__titulo">{titulo}</h1>
      </div>
      <p className="comunes__subtitulo">{subtitulo}</p>
      {badge && (
        <div className="comunes__badge-wrapper">
          <span className="comunes__badge">{badge}</span>
        </div>
      )}
    </header>
  );
}

