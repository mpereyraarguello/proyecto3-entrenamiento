// GraficoEvolucionPesos.tsx
// Gráfico de líneas SVG interactivo que muestra la evolución de cargas por sesión
import { useState } from "react";
import type { RegistroPeso } from "../types/estadisticas.types";

interface GraficoEvolucionPesosProps {
  registros: RegistroPeso[];
  pesoInicial: number;
  unidad: string;
}

const IconoTrendingUp = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default function GraficoEvolucionPesos({
  registros,
  pesoInicial,
  unidad,
}: GraficoEvolucionPesosProps) {
  const [indiceHover, setIndiceHover] = useState<number | null>(null);

  if (!registros || registros.length === 0) {
    return (
      <div className="estadisticas__grafico-vacio">
        <p className="estadisticas__sin-registros">
          No hay registros de cargas aún para este ejercicio en el plan.
        </p>
      </div>
    );
  }

  // Dimensiones del SVG
  const width = 500;
  const height = 230;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 40;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  // Cálculo de rango de pesos
  const todosLosPesos = registros.map((r) => r.peso);
  const minValor = Math.min(...todosLosPesos);
  const maxValor = Math.max(...todosLosPesos);

  // Escala con margen superior e inferior
  const margen = Math.max(2, (maxValor - minValor) * 0.15);
  const yMin = Math.max(0, Math.floor(minValor - margen));
  const yMax = Math.ceil(maxValor + margen) || yMin + 10;
  const yRange = yMax - yMin || 1;

  // Función para obtener coordenadas (x, y) de cada registro
  const obtenerCoords = (index: number, peso: number) => {
    const x =
      registros.length === 1
        ? paddingLeft + plotWidth / 2
        : paddingLeft + (index / (registros.length - 1)) * plotWidth;

    const y = paddingTop + plotHeight - ((peso - yMin) / yRange) * plotHeight;
    return { x, y };
  };

  const puntos = registros.map((r, i) => ({
    ...r,
    ...obtenerCoords(i, r.peso),
    indice: i,
  }));

  // Generar path de la línea
  const linePath = puntos.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // Generar path del área con gradiente debajo de la línea
  const primerPunto = puntos[0];
  const ultimoPunto = puntos[puntos.length - 1];
  const baseY = paddingTop + plotHeight;
  const areaPath = `${linePath} L ${ultimoPunto.x} ${baseY} L ${primerPunto.x} ${baseY} Z`;

  // Líneas de referencia horizontales (eje Y)
  const lineasGuia = [
    { valor: yMax, y: paddingTop },
    { valor: Math.round((yMax + yMin) / 2), y: paddingTop + plotHeight / 2 },
    { valor: yMin, y: baseY },
  ];

  // Datos para el punto activo o seleccionado
  const puntoSeleccionado =
    indiceHover !== null ? puntos[indiceHover] : puntos[puntos.length - 1];

  // Cálculo de progreso total
  const primerRegistro = registros[0];
  const ultimoRegistro = registros[registros.length - 1];
  const diferencia = ultimoRegistro.peso - (primerRegistro?.peso ?? pesoInicial);
  const porcentajeProgreso =
    primerRegistro && primerRegistro.peso > 0
      ? ((diferencia / primerRegistro.peso) * 100).toFixed(1)
      : null;

  return (
    <div className="estadisticas__grafico-contenedor">
      <div className="estadisticas__grafico-header">
        <h3 className="estadisticas__historial-titulo">
          Evolución de cargas por sesión
        </h3>
        <span className="estadisticas__grafico-sub">
          {registros.length} sesiones registradas
        </span>
      </div>

      {/* Indicador flotante / Detalle del punto seleccionado */}
      {puntoSeleccionado && (
        <aside
          className="estadisticas__tooltip-card"
          aria-label="Detalle del registro seleccionado"
        >
          <div className="estadisticas__tooltip-item">
            <span className="estadisticas__tooltip-label">Fecha:</span>
            <strong className="estadisticas__tooltip-valor">
              {puntoSeleccionado.fecha}
            </strong>
          </div>
          <div className="estadisticas__tooltip-item">
            <span className="estadisticas__tooltip-label">Carga:</span>
            <strong className="estadisticas__tooltip-valor estadisticas__tooltip-valor--resaltado">
              {puntoSeleccionado.peso} {puntoSeleccionado.unidad || unidad}
            </strong>
          </div>
          <div className="estadisticas__tooltip-item">
            <span className="estadisticas__tooltip-label">Series y Reps:</span>
            <span className="estadisticas__tooltip-valor">
              {puntoSeleccionado.series}x{puntoSeleccionado.repeticiones}
              {puntoSeleccionado.rir !== undefined
                ? ` (RIR ${puntoSeleccionado.rir})`
                : ""}
            </span>
          </div>
        </aside>
      )}

      {/* Gráfico SVG de líneas */}
      <div className="estadisticas__svg-wrapper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="estadisticas__svg"
          role="img"
          aria-label="Gráfico de líneas que muestra la evolución de cargas a lo largo de las sesiones"
        >
          <defs>
            <linearGradient
              id="degradadoAreaCargas"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#00ff00" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00ff00" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Líneas guía horizontales y etiquetas del eje Y */}
          {lineasGuia.map((guia, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={guia.y}
                x2={width - paddingRight}
                y2={guia.y}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 8}
                y={guia.y + 4}
                textAnchor="end"
                fill="#6e8b7e"
                fontSize="10"
                fontFamily="system-ui, sans-serif"
              >
                {guia.valor} {unidad}
              </text>
            </g>
          ))}

          {/* Área sombreada con degradado debajo de la curva */}
          <path d={areaPath} fill="url(#degradadoAreaCargas)" />

          {/* Línea principal que une los registros */}
          <path
            d={linePath}
            fill="none"
            stroke="#00ff00"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Línea vertical que sigue el hover activo */}
          {puntoSeleccionado && (
            <line
              x1={puntoSeleccionado.x}
              y1={paddingTop}
              x2={puntoSeleccionado.x}
              y2={baseY}
              stroke="rgba(0, 255, 0, 0.4)"
              strokeDasharray="2 2"
              strokeWidth="1.5"
            />
          )}

          {/* Puntos de cada sesión */}
          {puntos.map((p) => {
            const estaActivo = puntoSeleccionado.indice === p.indice;
            // Formatear fecha para el eje X: día y mes (ej: "08/10")
            const fechaCorta = p.fecha.split("/").slice(0, 2).join("/");

            return (
              <g
                key={p.id}
                className="estadisticas__punto-grupo"
                onMouseEnter={() => setIndiceHover(p.indice)}
                onClick={() => setIndiceHover(p.indice)}
                style={{ cursor: "pointer" }}
              >
                {/* Zona de impacto táctil invisible más amplia */}
                <circle cx={p.x} cy={p.y} r="18" fill="transparent" />

                {/* Anillo de resalte activo */}
                {estaActivo && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="none"
                    stroke="#00ff00"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                )}

                {/* Punto central del registro */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={estaActivo ? "5.5" : "4"}
                  fill={estaActivo ? "#00ff00" : "#1e1e1e"}
                  stroke="#00ff00"
                  strokeWidth="2.5"
                  style={{ transition: "all 0.15s ease" }}
                />

                {/* Etiqueta de fecha en el eje X */}
                <text
                  x={p.x}
                  y={baseY + 16}
                  textAnchor="middle"
                  fill={estaActivo ? "#00ff00" : "#6e8b7e"}
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight={estaActivo ? "600" : "400"}
                >
                  {fechaCorta}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Resumen de evolución y progresión global */}
      <footer className="estadisticas__grafico-resumen">
        <div className="estadisticas__resumen-col">
          <span className="estadisticas__resumen-etiqueta">Carga inicial</span>
          <strong className="estadisticas__resumen-dato">
            {primerRegistro.peso} {primerRegistro.unidad || unidad}
          </strong>
        </div>

        <div className="estadisticas__resumen-col">
          <span className="estadisticas__resumen-etiqueta">Carga actual</span>
          <strong className="estadisticas__resumen-dato estadisticas__resumen-dato--verde">
            {ultimoRegistro.peso} {ultimoRegistro.unidad || unidad}
          </strong>
        </div>

        <div className="estadisticas__resumen-col estadisticas__resumen-col--progreso">
          <span className="estadisticas__resumen-etiqueta">Progreso</span>
          <strong
            className={`estadisticas__resumen-dato ${
              diferencia >= 0
                ? "estadisticas__resumen-dato--verde"
                : "estadisticas__resumen-dato--neutro"
            }`}
          >
            {diferencia >= 0 ? "+" : ""}
            {diferencia} {unidad}
            {porcentajeProgreso ? ` (${porcentajeProgreso}%)` : ""}
            <IconoTrendingUp />
          </strong>
        </div>
      </footer>
    </div>
  );
}

