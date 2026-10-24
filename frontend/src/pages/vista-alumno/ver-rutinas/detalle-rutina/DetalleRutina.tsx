// DetalleRutina.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotonVolver from "../components-comunes/BotonVolver";
import EncabezadoPantalla from "../components-comunes/EncabezadoPantalla";
import MensajeEstado from "../components-comunes/MensajeEstado";
import type { RutinaDetalle } from "../types/rutinas.types";
import AlertaSesion from "./components/AlertaSesion";
import PausasRecomendadas from "./components/PausasRecomendadas";
import ProgresionSemanal from "./components/ProgresionSemanal";
import SeccionCalentamiento from "./components/SeccionCalentamiento";
import SeccionCardio from "./components/SeccionCardio";
import SeccionEjercicios from "./components/SeccionEjercicios";
import SeccionEstiramiento from "./components/SeccionEstiramiento";
import { obtenerDetalleRutina } from "./services/detalleRutinaApi";
import "./DetalleRutina.css";

const IconoRutina = () => (
  <svg
    className="detalle-rutina__icono-pantalla"
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

const IconoPlay = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default function DetalleRutina() {
  const navigate = useNavigate();
  const { id: planId, idRutina } = useParams<{ id: string; idRutina: string }>();

  const [rutina, setRutina] = useState<RutinaDetalle | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [sesionIniciada, setSesionIniciada] = useState<boolean>(false);

  useEffect(() => {
    if (!idRutina) return;
    obtenerDetalleRutina(idRutina)
      .then((data) => {
        if (data) {
          setRutina(data);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [idRutina]);

  const volverALista = () => {
    navigate(`/planes/${planId || 1}/rutinas`);
  };

  const iniciarSesion = () => {
    setSesionIniciada(true);
  };

  const finalizarSesion = () => {
    setSesionIniciada(false);
  };

  return (
    <main className="detalle-rutina">
      <div className="detalle-rutina__container">
        <BotonVolver
          onClick={volverALista}
          ariaLabel="Volver al listado de rutinas"
        />

        {rutina && (
          <EncabezadoPantalla
            titulo={`RUTINA N° ${rutina.numero}`}
            subtitulo="Previsualizá los ejercicios, observaciones del profesor, pausas y progresiones semanales antes de iniciar tu sesión de entrenamiento."
            icono={<IconoRutina />}
            badge={`${rutina.cantidadEjercicios} ejercicios en total`}
          />
        )}

        {cargando && (
          <MensajeEstado
            tipo="cargando"
            mensaje="Cargando previsualización de la rutina..."
          />
        )}

        {error && !cargando && (
          <MensajeEstado
            tipo="error"
            mensaje="No se pudo cargar la información de la rutina seleccionada."
            onAccion={volverALista}
            textoAccion="Volver"
          />
        )}

        {sesionIniciada && (
          <AlertaSesion
            numeroRutina={rutina?.numero}
            onFinalizar={finalizarSesion}
          />
        )}

        {!cargando && !error && rutina && (
          <div className="detalle-rutina__contenido">
            <PausasRecomendadas pausas={rutina.pausas} />

            <ProgresionSemanal progresiones={rutina.progresionSemanal} />

            <SeccionCalentamiento indicaciones={rutina.calentamiento} />

            <SeccionCore titulo="Core" ejercicios={rutina.core} />

            <SeccionFuerza titulo="Fuerza" ejercicios={rutina.fuerza} />

            <SeccionCardio cardio={rutina.cardio} />

            <SeccionEstiramiento
              descripcion={rutina.estiramiento.descripcion}
            />

            <div className="detalle-rutina__acciones">
              <button
                type="button"
                className="detalle-rutina__boton detalle-rutina__boton--iniciar"
                onClick={iniciarSesion}
              >
                <IconoPlay />
                Iniciar
              </button>
              <button
                type="button"
                className="detalle-rutina__boton detalle-rutina__boton--cancelar"
                onClick={volverALista}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Subsecciones semánticas reutilizando SeccionEjercicios para legibilidad
const SeccionCore = SeccionEjercicios;
const SeccionFuerza = SeccionEjercicios;

