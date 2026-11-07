// CardGruposMusculares.tsx
import type { GrupoMuscularPorcentaje } from "../types/estadisticas.types";

interface CardGruposMuscularesProps {
  grupos: GrupoMuscularPorcentaje[];
}

const IconoMusculo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 4v16" />
    <path d="M18 4v16" />
    <path d="M2 7v10" />
    <path d="M22 7v10" />
    <path d="M6 12h12" />
  </svg>
);

export default function CardGruposMusculares({
  grupos,
}: CardGruposMuscularesProps) {
  return (
    <article className="estadisticas__card">
      <div className="estadisticas__card-header">
        <div className="estadisticas__card-icono">
          <IconoMusculo />
        </div>
        <div>
          <h2 className="estadisticas__card-titulo">
            GRUPOS MUSCULARES TRABAJADOS
          </h2>
          <p className="estadisticas__card-subtitulo">
            Distribución según los ejercicios de las sesiones finalizadas
          </p>
        </div>
      </div>

      <div className="estadisticas__grupos-lista">
        {grupos.map((item) => (
          <div key={item.grupo} className="estadisticas__grupo-item">
            <div className="estadisticas__grupo-info">
              <span className="estadisticas__grupo-nombre">{item.grupo}</span>
              <span className="estadisticas__grupo-porcentaje">
                {item.porcentaje}%
              </span>
            </div>

            <div
              className="estadisticas__barra-fondo"
              role="progressbar"
              aria-valuenow={item.porcentaje}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="estadisticas__barra-relleno estadisticas__barra-relleno--musculo"
                style={{ width: `${item.porcentaje}%` }}
              />
            </div>

           
          </div>
        ))}
      </div>
    </article>
  );
}

