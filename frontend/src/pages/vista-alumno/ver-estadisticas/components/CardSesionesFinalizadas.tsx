// CardSesionesFinalizadas.tsx
import type { EstadisticaSesiones } from "../types/estadisticas.types";

interface CardSesionesFinalizadasProps {
  estadistica: EstadisticaSesiones;
}

const IconoCheckSesion = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function CardSesionesFinalizadas({
  estadistica,
}: CardSesionesFinalizadasProps) {
  const { totalSesionesFinalizadas, sesionesPorRutina } = estadistica;

  return (
    <article className="estadisticas__card">
      <div className="estadisticas__card-header">
        <div className="estadisticas__card-icono">
          <IconoCheckSesion />
        </div>
        <div>
          <h2 className="estadisticas__card-titulo">SESIONES FINALIZADAS</h2>
          <p className="estadisticas__card-subtitulo">
            Total y porcentaje completado por cada rutina
          </p>
        </div>
      </div>

      {/* Contador destacado de sesiones totales */}
      <div className="estadisticas__sesiones-total-bloque">
        <span className="estadisticas__sesiones-numero">
          {totalSesionesFinalizadas}
        </span>
        <span className="estadisticas__sesiones-texto">
          sesiones completadas en este plan
        </span>
      </div>

      {/* Desglose por rutina */}
      <div className="estadisticas__rutinas-lista">
        {sesionesPorRutina.map((item) => (
          <div key={item.rutinaId} className="estadisticas__rutina-item">
            <div className="estadisticas__rutina-info">
              <span className="estadisticas__rutina-nombre">
                RUTINA N° {item.numeroRutina}
              </span>
              <span className="estadisticas__rutina-valores">
                <strong>{item.cantidadSesiones}</strong> sesiones ({item.porcentaje}%)
              </span>
            </div>

            {/* Barra de progreso */}
            <div
              className="estadisticas__barra-fondo"
              role="progressbar"
              aria-valuenow={item.porcentaje}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="estadisticas__barra-relleno"
                style={{ width: `${item.porcentaje}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

