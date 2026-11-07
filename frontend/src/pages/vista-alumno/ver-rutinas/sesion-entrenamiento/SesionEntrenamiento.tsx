// SesionEntrenamiento.tsx
// Pantalla de sesión de entrenamiento activa

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotonVolver from "../components-comunes/BotonVolver";
import EncabezadoPantalla from "../components-comunes/EncabezadoPantalla";
import MensajeEstado from "../components-comunes/MensajeEstado";
import type { RutinaDetalle } from "../types/rutinas.types";
import { obtenerDetalleRutina } from "../detalle-rutina/services/detalleRutinaApi";
import type { EjercicioSesion, RegistroEjercicio } from "./types/sesion.types";
import { obtenerUltimaSesion, guardarSesion } from "./services/sesionApi";
import SeccionEjerciciosSesion from "./components/SeccionEjerciciosSesion";
import ModalSesionFinalizada from "./components/ModalSesionFinalizada";
import ProgresionSesion from "./components/ProgresionSesion";
import PestanasSesion, { type SeccionSesionTab } from "./components/PestanasSesion";
import SeccionCalentamientoSesion from "./components/SeccionCalentamientoSesion";
import SeccionCardio from "../detalle-rutina/components/SeccionCardio";
import SeccionEstiramientoSesion from "./components/SeccionEstiramientoSesion";
import { agregarSesionAlHistorial } from "../historial-sesiones/services/historialApi";
import "./SesionEntrenamiento.css";

const TABS_ORDER: SeccionSesionTab[] = [
  "calentamiento",
  "core",
  "fuerza",
  "cardio",
  "estiramiento",
];

const IconoSesion = () => (
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
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const IconoFinalizar = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);

const IconoFlechaTab = () => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function SesionEntrenamiento() {
  const navigate = useNavigate();
  const { id: planId, idRutina } = useParams<{
    id: string;
    idRutina: string;
  }>();

  const [rutina, setRutina] = useState<RutinaDetalle | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [registros, setRegistros] = useState<Record<number, RegistroEjercicio>>(
    {}
  );
  const [sesionFinalizada, setSesionFinalizada] = useState<boolean>(false);
  const [tabActiva, setTabActiva] = useState<SeccionSesionTab>("calentamiento");

  // Estado de la última sesión
  const [ultimaSesionMap, setUltimaSesionMap] = useState<
    Record<number, { peso: string; repeticiones: string }>
  >({});

  // Cargar rutina y última sesión
  useEffect(() => {
    if (!idRutina) return;

    Promise.all([obtenerDetalleRutina(idRutina), obtenerUltimaSesion(idRutina)])
      .then(([rutinaData, ultimaSesionData]) => {
        if (rutinaData) {
          setRutina(rutinaData);

          const map: Record<number, { peso: string; repeticiones: string }> = {};
          ultimaSesionData.forEach((us) => {
            map[us.ejercicioId] = { peso: us.peso, repeticiones: us.repeticiones };
          });
          setUltimaSesionMap(map);

          // Inicializar registros para ejercicios de core y fuerza
          const ejerciciosRegistrables = [
            ...rutinaData.core,
            ...rutinaData.fuerza,
          ];
          const registrosIniciales: Record<number, RegistroEjercicio> = {};
          ejerciciosRegistrables.forEach((ej) => {
            registrosIniciales[ej.id] = {
              ejercicioId: ej.id,
              peso: "",
              repeticiones: "",
              completado: false,
            };
          });
          setRegistros(registrosIniciales);
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

  // Construir ejercicios de sesión con datos combinados
  const ejerciciosCore: EjercicioSesion[] = useMemo(() => {
    if (!rutina) return [];
    return rutina.core.map((ej) => ({
      ...ej,
      ultimaSesion: ultimaSesionMap[ej.id]
        ? { ejercicioId: ej.id, ...ultimaSesionMap[ej.id] }
        : undefined,
      registro: registros[ej.id] || {
        ejercicioId: ej.id,
        peso: "",
        repeticiones: "",
        completado: false,
      },
    }));
  }, [rutina, registros, ultimaSesionMap]);

  const ejerciciosFuerza: EjercicioSesion[] = useMemo(() => {
    if (!rutina) return [];
    return rutina.fuerza.map((ej) => ({
      ...ej,
      ultimaSesion: ultimaSesionMap[ej.id]
        ? { ejercicioId: ej.id, ...ultimaSesionMap[ej.id] }
        : undefined,
      registro: registros[ej.id] || {
        ejercicioId: ej.id,
        peso: "",
        repeticiones: "",
        completado: false,
      },
    }));
  }, [rutina, registros, ultimaSesionMap]);

  const todosLosEjercicios = useMemo(
    () => [...ejerciciosCore, ...ejerciciosFuerza],
    [ejerciciosCore, ejerciciosFuerza]
  );

  const totalEjercicios = todosLosEjercicios.length;
  const completados = todosLosEjercicios.filter(
    (ej) => ej.registro.completado
  ).length;
  const coreCompletados = ejerciciosCore.filter(
    (ej) => ej.registro.completado
  ).length;
  const fuerzaCompletados = ejerciciosFuerza.filter(
    (ej) => ej.registro.completado
  ).length;
  const todosCompletados =
    totalEjercicios > 0 && completados === totalEjercicios;
  const porcentaje =
    totalEjercicios > 0 ? Math.round((completados / totalEjercicios) * 100) : 0;

  // Calentamiento y Estiramiento (opcionales)
  const itemsCalentamiento = useMemo(() => {
    if (!rutina || !rutina.calentamiento) return [];
    return rutina.calentamiento
      .split("\n")
      .map((line, idx) => ({
        id: `cal-${idx + 1}`,
        nombre: line.trim(),
      }))
      .filter((item) => item.nombre.length > 0);
  }, [rutina]);

  const [calentamientoCompletados, setCalentamientoCompletados] = useState<
    Record<string, boolean>
  >({});
  const [estiramientoCompletado, setEstiramientoCompletado] =
    useState<boolean>(false);

  const handleToggleCalentamiento = useCallback((id: string) => {
    setCalentamientoCompletados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleMarcarTodosCalentamiento = useCallback(
    (marcar: boolean) => {
      const nuevo: Record<string, boolean> = {};
      itemsCalentamiento.forEach((it) => {
        nuevo[it.id] = marcar;
      });
      setCalentamientoCompletados(nuevo);
    },
    [itemsCalentamiento]
  );

  const handleToggleEstiramiento = useCallback(() => {
    setEstiramientoCompletado((prev) => !prev);
  }, []);

  const calentamientoCompletadosCount = useMemo(
    () =>
      itemsCalentamiento.filter((it) => calentamientoCompletados[it.id]).length,
    [itemsCalentamiento, calentamientoCompletados]
  );

  // Carrusel: índice actual según TABS_ORDER
  const tabIndex = useMemo(() => {
    const idx = TABS_ORDER.indexOf(tabActiva);
    return idx >= 0 ? idx : 0;
  }, [tabActiva]);

  // Altura dinámica del carrusel para ajustarse a cada diapositiva
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const slideActual = slideRefs.current[tabIndex];
    if (!slideActual) return;

    const actualizarAltura = () => {
      if (!slideActual) return;
      const rect = slideActual.getBoundingClientRect();
      const scrollH = slideActual.scrollHeight;
      const offsetH = slideActual.offsetHeight;
      const altura = Math.max(rect.height, scrollH, offsetH);
      if (altura > 0) {
        // Margen extra de seguridad (16px) para evitar cualquier corte en pantallas móviles
        setViewportHeight(Math.ceil(altura) + 16);
      }
    };

    actualizarAltura();

    // Re-medir después de micro-ticks y al finalizar la animación de transición
    const timer1 = setTimeout(actualizarAltura, 60);
    const timer2 = setTimeout(actualizarAltura, 420);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        actualizarAltura();
      });
      ro.observe(slideActual);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(actualizarAltura);
    }

    const onResize = () => actualizarAltura();
    window.addEventListener("resize", onResize);

    return () => {
      if (ro) ro.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", onResize);
    };
  }, [
    tabIndex,
    rutina,
    registros,
    calentamientoCompletados,
    estiramientoCompletado,
  ]);

  // Soporte de gesto swipe horizontal
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0 && tabIndex < TABS_ORDER.length - 1) {
        setTabActiva(TABS_ORDER[tabIndex + 1]);
      } else if (deltaX > 0 && tabIndex > 0) {
        setTabActiva(TABS_ORDER[tabIndex - 1]);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Handlers
  const handleCambiarPeso = useCallback(
    (ejercicioId: number, peso: string) => {
      setRegistros((prev) => ({
        ...prev,
        [ejercicioId]: { ...prev[ejercicioId], peso },
      }));
    },
    []
  );

  const handleCambiarRepeticiones = useCallback(
    (ejercicioId: number, repeticiones: string) => {
      setRegistros((prev) => ({
        ...prev,
        [ejercicioId]: { ...prev[ejercicioId], repeticiones },
      }));
    },
    []
  );

  const handleToggleCompletado = useCallback(
    (ejercicioId: number) => {
      setRegistros((prev) => ({
        ...prev,
        [ejercicioId]: {
          ...prev[ejercicioId],
          completado: !prev[ejercicioId].completado,
        },
      }));
    },
    []
  );

  const handleFinalizar = () => {
    if (!todosCompletados || !rutina) return;

    const registrosArray = Object.values(registros).map((r) => ({
      ejercicioId: r.ejercicioId,
      peso: r.peso,
      repeticiones: r.repeticiones,
    }));

    const ahora = new Date();
    const fechaFormateada = `${ahora.toLocaleDateString("es-AR")} - ${ahora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })} hs`;

    // Armar lista de ejercicios completa para el historial:
    // Calentamiento (opcional) + Core + Fuerza + Estiramiento (opcional)
    const calentamientoHistorial = itemsCalentamiento.map((item) => ({
      ejercicioId: item.id,
      nombre: item.nombre,
      categoria: "calentamiento",
      completado: Boolean(calentamientoCompletados[item.id]),
    }));

    const coreHistorial = ejerciciosCore.map((ej) => ({
      ejercicioId: ej.id,
      nombre: ej.nombre,
      categoria: "core",
      peso: registros[ej.id]?.peso || "-",
      repeticiones: registros[ej.id]?.repeticiones || "-",
      series: ej.seriesRepeticiones,
      completado: Boolean(registros[ej.id]?.completado),
    }));

    const fuerzaHistorial = ejerciciosFuerza.map((ej) => ({
      ejercicioId: ej.id,
      nombre: ej.nombre,
      categoria: "fuerza",
      peso: registros[ej.id]?.peso || "-",
      repeticiones: registros[ej.id]?.repeticiones || "-",
      series: ej.seriesRepeticiones,
      completado: Boolean(registros[ej.id]?.completado),
    }));

    const estiramientoHistorial = [
      {
        ejercicioId: "est-1",
        nombre: "Elongación y vuelta a la calma",
        categoria: "estiramiento",
        series: rutina.estiramiento?.descripcion || "Elongación muscular",
        completado: Boolean(estiramientoCompletado),
      },
    ];

    const ejerciciosHistorial = [
      ...calentamientoHistorial,
      ...coreHistorial,
      ...fuerzaHistorial,
      ...estiramientoHistorial,
    ];

    Promise.all([
      guardarSesion(rutina.id, registrosArray),
      agregarSesionAlHistorial({
        fecha: fechaFormateada,
        planId: Number(planId) || 22,
        planNumero: Number(planId) || 22,
        rutinaId: rutina.id,
        rutinaNumero: rutina.numero,
        rutinaNombre: `Rutina ${rutina.numero}`,
        duracionEstimada: "45 min",
        totalEjercicios: ejerciciosHistorial.length,
        ejerciciosCompletados: ejerciciosHistorial,
      }),
    ]).then(() => {
      setSesionFinalizada(true);
    });
  };

  const handleVolver = () => {
    navigate(`/planes/${planId || 1}/rutinas`);
  };

  const handleVolverADetalle = () => {
    navigate(`/planes/${planId || 1}/rutinas/${idRutina}`);
  };

  return (
    <main className="detalle-rutina">
      <div className="detalle-rutina__container">
        <BotonVolver
          onClick={handleVolverADetalle}
          ariaLabel="Volver al detalle de la rutina"
        />

        {rutina && (
          <EncabezadoPantalla
            titulo={`SESION DE ENTRENAMIENTO`}
            subtitulo={`Rutina N° ${rutina.numero} — Registra los pesos y repeticiones de cada ejercicio de fuerza y core.`}
            icono={<IconoSesion />}
            badge={`${totalEjercicios} ejercicios registrables`}
          />
        )}

        {cargando && (
          <MensajeEstado
            tipo="cargando"
            mensaje="Cargando sesion de entrenamiento..."
          />
        )}

        {error && !cargando && (
          <MensajeEstado
            tipo="error"
            mensaje="No se pudo cargar la rutina para iniciar la sesion."
            onAccion={handleVolver}
            textoAccion="Volver"
          />
        )}

        {!cargando && !error && rutina && (
          <div className="detalle-rutina__contenido">
            {/* Progresión semanal fija (RIR) arriba */}
            {rutina.progresionSemanal && (
              <ProgresionSesion progresiones={rutina.progresionSemanal} />
            )}

            {/* Bloque unificado: Pestañas + Carrusel animado */}
            <section
              className="sesion__bloque-unificado"
              aria-label="Secciones de la rutina"
            >
              {/* Pestañas arriba dentro del mismo bloque */}
              <div className="sesion__bloque-tabs-header">
                <PestanasSesion
                  tabActiva={tabActiva}
                  onCambiarTab={setTabActiva}
                  calentamientoCompletados={calentamientoCompletadosCount}
                  calentamientoTotal={itemsCalentamiento.length}
                  coreCompletados={coreCompletados}
                  coreTotal={ejerciciosCore.length}
                  fuerzaCompletados={fuerzaCompletados}
                  fuerzaTotal={ejerciciosFuerza.length}
                  estiramientoCompletado={estiramientoCompletado}
                />
              </div>

              {/* Viewport del carrusel con animación suave */}
              <div
                className="sesion__carrusel-viewport"
                style={{
                  height: viewportHeight ? `${viewportHeight}px` : "auto",
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="sesion__carrusel-track"
                  style={{
                    transform: `translateX(-${tabIndex * 100}%)`,
                  }}
                >
                  {/* Slide 0: Calentamiento (opcional) */}
                  <div
                    ref={(el) => {
                      slideRefs.current[0] = el;
                    }}
                    className={`sesion__carrusel-slide ${
                      tabIndex === 0 ? "sesion__carrusel-slide--activa" : ""
                    }`}
                    aria-hidden={tabIndex !== 0}
                  >
                    <div className="sesion__tab-bloque">
                      <SeccionCalentamientoSesion
                        items={itemsCalentamiento}
                        completadosMap={calentamientoCompletados}
                        onToggleItem={handleToggleCalentamiento}
                        onMarcarTodos={handleMarcarTodosCalentamiento}
                      />
                      <button
                        type="button"
                        className="sesion__boton-tab-siguiente"
                        onClick={() => setTabActiva("core")}
                      >
                        <span>Ir a Core</span>
                        <IconoFlechaTab />
                      </button>
                    </div>
                  </div>

                  {/* Slide 1: Core */}
                  <div
                    ref={(el) => {
                      slideRefs.current[1] = el;
                    }}
                    className={`sesion__carrusel-slide ${
                      tabIndex === 1 ? "sesion__carrusel-slide--activa" : ""
                    }`}
                    aria-hidden={tabIndex !== 1}
                  >
                    <div className="sesion__tab-bloque">
                      <SeccionEjerciciosSesion
                        titulo="Core"
                        ejercicios={ejerciciosCore}
                        onCambiarPeso={handleCambiarPeso}
                        onCambiarRepeticiones={handleCambiarRepeticiones}
                        onToggleCompletado={handleToggleCompletado}
                      />
                      <button
                        type="button"
                        className="sesion__boton-tab-siguiente"
                        onClick={() => setTabActiva("fuerza")}
                      >
                        <span>Ir a Fuerza</span>
                        <IconoFlechaTab />
                      </button>
                    </div>
                  </div>

                  {/* Slide 2: Fuerza */}
                  <div
                    ref={(el) => {
                      slideRefs.current[2] = el;
                    }}
                    className={`sesion__carrusel-slide ${
                      tabIndex === 2 ? "sesion__carrusel-slide--activa" : ""
                    }`}
                    aria-hidden={tabIndex !== 2}
                  >
                    <div className="sesion__tab-bloque">
                      <SeccionEjerciciosSesion
                        titulo="Fuerza"
                        ejercicios={ejerciciosFuerza}
                        onCambiarPeso={handleCambiarPeso}
                        onCambiarRepeticiones={handleCambiarRepeticiones}
                        onToggleCompletado={handleToggleCompletado}
                      />
                      <button
                        type="button"
                        className="sesion__boton-tab-siguiente"
                        onClick={() => setTabActiva("cardio")}
                      >
                        <span>Ir a Cardio</span>
                        <IconoFlechaTab />
                      </button>
                    </div>
                  </div>

                  {/* Slide 3: Cardio */}
                  <div
                    ref={(el) => {
                      slideRefs.current[3] = el;
                    }}
                    className={`sesion__carrusel-slide ${
                      tabIndex === 3 ? "sesion__carrusel-slide--activa" : ""
                    }`}
                    aria-hidden={tabIndex !== 3}
                  >
                    <div className="sesion__tab-bloque">
                      <SeccionCardio cardio={rutina.cardio} />
                      <button
                        type="button"
                        className="sesion__boton-tab-siguiente"
                        onClick={() => setTabActiva("estiramiento")}
                      >
                        <span>Ir a Estiramiento</span>
                        <IconoFlechaTab />
                      </button>
                    </div>
                  </div>

                  {/* Slide 4: Estiramiento (opcional) */}
                  <div
                    ref={(el) => {
                      slideRefs.current[4] = el;
                    }}
                    className={`sesion__carrusel-slide ${
                      tabIndex === 4 ? "sesion__carrusel-slide--activa" : ""
                    }`}
                    aria-hidden={tabIndex !== 4}
                  >
                    <div className="sesion__tab-bloque">
                      <SeccionEstiramientoSesion
                        descripcion={rutina.estiramiento.descripcion}
                        completado={estiramientoCompletado}
                        onToggleCompletado={handleToggleEstiramiento}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Barra de progreso general */}
            <div className="sesion__progreso-general">
              <div className="sesion__progreso-header">
                <span className="sesion__progreso-label">Progreso general</span>
                <span className="sesion__progreso-porcentaje">
                  {porcentaje}% ({completados}/{totalEjercicios})
                </span>
              </div>
              <div className="sesion__progreso-barra-bg">
                <div
                  className="sesion__progreso-barra-fill"
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="sesion__acciones">
              {!todosCompletados && (
                <p className="sesion__mensaje-requisito">
                  Completá todos los ejercicios de Core y Fuerza para poder finalizar la sesión. Calentamiento y Estiramiento son opcionales.
                </p>
              )}
              <button
                type="button"
                className="sesion__boton-finalizar"
                disabled={!todosCompletados}
                onClick={handleFinalizar}
              >
                <IconoFinalizar />
                Finalizar
              </button>
              <button
                type="button"
                className="sesion__boton-cancelar"
                onClick={handleVolverADetalle}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de sesion finalizada */}
      {sesionFinalizada && rutina && (
        <ModalSesionFinalizada
          rutinaNumero={rutina.numero}
          totalEjercicios={totalEjercicios}
          onVolver={handleVolver}
        />
      )}
    </main>
  );
}
