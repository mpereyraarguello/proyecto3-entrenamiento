// SesionEntrenamiento.tsx
// Pantalla de sesión de entrenamiento activa

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotonVolver from "../components-comunes/BotonVolver";
import EncabezadoPantalla from "../components-comunes/EncabezadoPantalla";
import MensajeEstado from "../components-comunes/MensajeEstado";
import type { Ejercicio, RutinaDetalle } from "../types/rutinas.types";
import { obtenerDetalleRutina } from "../detalle-rutina/services/detalleRutinaApi";
import type { EjercicioSesion, RegistroEjercicio, RegistroSerie } from "./types/sesion.types";
import { esSerieCompleta, normalizarPeso } from "./utils/validacionSerie";
import {
  iniciarSesion,
  obtenerSesionEnCurso,
  obtenerPesoPrevio,
  marcarBloqueSesion,
  registrarAvanceSesion,
  finalizarSesion,
  type SesionBackendResponse,
} from "./services/sesionApi";
import SeccionEjerciciosSesion from "./components/SeccionEjerciciosSesion";
import ModalSesionFinalizada from "./components/ModalSesionFinalizada";
import ModalConfirmarFinalizacion from "./components/ModalConfirmarFinalizacion";
import ProgresionSesion from "./components/ProgresionSesion";
import PestanasSesion, { type SeccionSesionTab } from "./components/PestanasSesion";
import SeccionCalentamientoSesion from "./components/SeccionCalentamientoSesion";
import SeccionCardioSesion from "./components/SeccionCardioSesion";
import SeccionEstiramientoSesion from "./components/SeccionEstiramientoSesion";
import "./SesionEntrenamiento.css";

const ALUMNO_ID = "alu-1";
const DEMORA_AUTOGUARDADO_MS = 800;

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

// Solo se envían las series con peso y repeticiones válidos
const construirRegistrosAvance = (registros: Record<number, RegistroEjercicio>) =>
  Object.values(registros).map((registro) => ({
    ejercicioId: String(registro.ejercicioId),
    series: registro.series.filter(esSerieCompleta).map((serie) => ({
      numeroSerie: serie.numeroSerie,
      peso: Number(normalizarPeso(serie.peso)),
      repeticiones: Number(serie.repeticiones.trim()),
    })),
  }));

export default function SesionEntrenamiento() {
  const navigate = useNavigate();
  const { id: planId, idRutina } = useParams<{
    id: string;
    idRutina: string;
  }>();

  const [rutina, setRutina] = useState<RutinaDetalle | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [rutinaEnCurso, setRutinaEnCurso] = useState<string | null>(null);
  const [registros, setRegistros] = useState<Record<number, RegistroEjercicio>>(
    {}
  );
  const [sesionFinalizada, setSesionFinalizada] = useState<boolean>(false);
  const [finalizando, setFinalizando] = useState<boolean>(false);
  const [confirmandoFinalizar, setConfirmandoFinalizar] = useState<boolean>(false);
  const [sesionId, setSesionId] = useState<string | null>(null);
  const [tabActiva, setTabActiva] = useState<SeccionSesionTab>("calentamiento");
  const [estadoGuardado, setEstadoGuardado] = useState<
    "inactivo" | "guardando" | "guardado" | "error"
  >("inactivo");

  // Estado de la última sesión
  const [ultimaSesionMap, setUltimaSesionMap] = useState<
    Record<number, { peso: string; repeticiones: string }>
  >({});

  // Bloques marcados sin registrar pesos ni repeticiones (HU 4A)
  const [calentamientoCompletado, setCalentamientoCompletado] =
    useState<boolean>(false);
  const [cardioCompletado, setCardioCompletado] = useState<boolean>(false);
  const [tieneCardio, setTieneCardio] = useState<boolean>(false);
  const [estiramientoCompletado, setEstiramientoCompletado] =
    useState<boolean>(false);

  const cargaSesion = useRef<Promise<SesionBackendResponse> | null>(null);
  const ultimoEnviado = useRef<string>("");
  const temporizadorGuardado = useRef<number | null>(null);
  const colaGuardado = useRef<Promise<void>>(Promise.resolve());

  // Cargar rutina y sesión backend
  useEffect(() => {
    if (!idRutina) return;

    const rutinaIdStr = String(idRutina);
    setCargando(true);
    setError(false);
    setMensajeError(null);
    setRutinaEnCurso(null);

    const cargarSesion = async () => {
      const rutinaData = await obtenerDetalleRutina(idRutina);
      if (!rutinaData) {
        setError(true);
        return;
      }
      setRutina(rutinaData);

      // 1. Recuperar la sesión en curso o iniciar una nueva (HU 1A)
      // La petición se comparte para no crear dos sesiones si el efecto corre dos veces
      if (!cargaSesion.current) {
        cargaSesion.current = obtenerSesionEnCurso(ALUMNO_ID)
          .then((enCurso) => enCurso ?? iniciarSesion(ALUMNO_ID, rutinaIdStr))
          .finally(() => {
            cargaSesion.current = null;
          });
      }
      const sesionBackend = await cargaSesion.current;

      if (String(sesionBackend.rutinaId) !== rutinaIdStr) {
        setRutinaEnCurso(String(sesionBackend.rutinaId));
        setMensajeError(
          `Ya tenés una sesión en curso de la Rutina N° ${sesionBackend.rutinaNumero}. Terminala antes de iniciar otra.`
        );
        setError(true);
        return;
      }

      setSesionId(sesionBackend.id);
      setCalentamientoCompletado(sesionBackend.bloqueCalentamientoCompletado);
      setTieneCardio(sesionBackend.bloqueCardioCompletado !== null);
      setCardioCompletado(sesionBackend.bloqueCardioCompletado === true);
      setEstiramientoCompletado(sesionBackend.bloqueEstiramientoCompletado);

      const ejerciciosRegistrables = [...rutinaData.core, ...rutinaData.fuerza];

      // 2. Consultar pesos previos: si no hay registro no se muestra nada (CP-1A-04)
      const mapPrevios: Record<number, { peso: string; repeticiones: string }> = {};
      await Promise.all(
        ejerciciosRegistrables.map(async (ej) => {
          const previo = await obtenerPesoPrevio(ALUMNO_ID, ej.id);
          if (previo && previo.peso !== null) {
            mapPrevios[ej.id] = {
              peso: `${previo.peso} kg`,
              repeticiones:
                previo.repeticiones !== null ? String(previo.repeticiones) : "-",
            };
          }
        })
      );
      setUltimaSesionMap(mapPrevios);

      // 3. Restaurar lo guardado, con una fila por cada serie planificada (CP-1A-01, CP-1A-05)
      const registrosIniciales: Record<number, RegistroEjercicio> = {};
      ejerciciosRegistrables.forEach((ej) => {
        const ejGuardado = sesionBackend.ejercicios.find(
          (item) => String(item.ejercicioId) === String(ej.id)
        );
        const cantidadSeries = ejGuardado?.seriesPlanificadas ?? 1;
        const series: RegistroSerie[] = Array.from(
          { length: cantidadSeries },
          (_, indice) => {
            const numeroSerie = indice + 1;
            const guardada = ejGuardado?.series.find(
              (serie) => serie.numeroSerie === numeroSerie
            );
            return {
              numeroSerie,
              peso: guardada ? String(guardada.peso) : "",
              repeticiones: guardada ? String(guardada.repeticiones) : "",
            };
          }
        );

        registrosIniciales[ej.id] = {
          ejercicioId: ej.id,
          series,
          completado: series.every(esSerieCompleta),
        };
      });
      ultimoEnviado.current = JSON.stringify(
        construirRegistrosAvance(registrosIniciales)
      );
      setRegistros(registrosIniciales);
    };

    cargarSesion()
      .catch((err: unknown) => {
        setMensajeError(err instanceof Error ? err.message : null);
        setError(true);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [idRutina]);

  const combinarConRegistros = useCallback(
    (ejercicios: Ejercicio[]): EjercicioSesion[] =>
      ejercicios.map((ej) => ({
        ...ej,
        ultimaSesion: ultimaSesionMap[ej.id]
          ? { ejercicioId: ej.id, ...ultimaSesionMap[ej.id] }
          : undefined,
        registro: registros[ej.id] ?? {
          ejercicioId: ej.id,
          series: [],
          completado: false,
        },
      })),
    [registros, ultimaSesionMap]
  );

  const ejerciciosCore = useMemo(
    () => combinarConRegistros(rutina?.core ?? []),
    [rutina, combinarConRegistros]
  );

  const ejerciciosFuerza = useMemo(
    () => combinarConRegistros(rutina?.fuerza ?? []),
    [rutina, combinarConRegistros]
  );

  // Calentamiento (obligatorio, un solo tilde para todo el bloque)
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

  const guardarAvance = useCallback(
    (datos: Record<number, RegistroEjercicio>): Promise<void> => {
      if (!sesionId) return Promise.resolve();
      const registrosAvance = construirRegistrosAvance(datos);
      const serializado = JSON.stringify(registrosAvance);
      if (serializado === ultimoEnviado.current) return colaGuardado.current;

      ultimoEnviado.current = serializado;
      setEstadoGuardado("guardando");
      colaGuardado.current = colaGuardado.current
        .then(() => registrarAvanceSesion(sesionId, ALUMNO_ID, registrosAvance))
        .then(() => setEstadoGuardado("guardado"))
        .catch(() => {
          ultimoEnviado.current = "";
          setEstadoGuardado("error");
        });
      return colaGuardado.current;
    },
    [sesionId]
  );

  const cancelarAutoguardado = () => {
    if (temporizadorGuardado.current !== null) {
      window.clearTimeout(temporizadorGuardado.current);
      temporizadorGuardado.current = null;
    }
  };

  // Autoguardado para no perder datos al salir de la pantalla (CP-1A-05)
  useEffect(() => {
    if (!sesionId || sesionFinalizada) return;
    temporizadorGuardado.current = window.setTimeout(() => {
      void guardarAvance(registros);
    }, DEMORA_AUTOGUARDADO_MS);
    return cancelarAutoguardado;
  }, [registros, sesionId, sesionFinalizada, guardarAvance]);

  const alternarBloque = useCallback(
    (
      bloque: "CALENTAMIENTO" | "CARDIO" | "ESTIRAMIENTO",
      actual: boolean,
      actualizar: (valor: boolean) => void
    ) => {
      if (!sesionId) return;
      const nuevo = !actual;
      actualizar(nuevo);
      marcarBloqueSesion(sesionId, ALUMNO_ID, bloque, nuevo).catch(() => {
        actualizar(actual);
        setEstadoGuardado("error");
      });
    },
    [sesionId]
  );

  const handleToggleCalentamiento = () =>
    alternarBloque("CALENTAMIENTO", calentamientoCompletado, setCalentamientoCompletado);
  const handleToggleCardio = () =>
    alternarBloque("CARDIO", cardioCompletado, setCardioCompletado);
  const handleToggleEstiramiento = () =>
    alternarBloque("ESTIRAMIENTO", estiramientoCompletado, setEstiramientoCompletado);

  const coreCompletados = ejerciciosCore.filter((ej) => ej.registro.completado).length;
  const fuerzaCompletados = ejerciciosFuerza.filter((ej) => ej.registro.completado).length;

  // Obligatorios: calentamiento y todas las series de core y fuerza
  const pendientes = [
    ...(calentamientoCompletado ? [] : ["Calentamiento"]),
    ...[...ejerciciosCore, ...ejerciciosFuerza]
      .filter((ej) => !ej.registro.completado)
      .map((ej) => ej.nombre),
  ];
  const todosCompletados = pendientes.length === 0;

  // Progreso general considerando los bloques obligatorios: 1 (calentamiento) + N (core) + M (fuerza)
  const totalObligatorios =
    1 + ejerciciosCore.length + ejerciciosFuerza.length;
  const completadosObligatorios =
    (calentamientoCompletado ? 1 : 0) + coreCompletados + fuerzaCompletados;
  const porcentaje =
    totalObligatorios > 0
      ? Math.round((completadosObligatorios / totalObligatorios) * 100)
      : 0;

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
        setViewportHeight(Math.ceil(altura) + 16);
      }
    };

    actualizarAltura();

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
    calentamientoCompletado,
    cardioCompletado,
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

  const handleCambiarSerie = useCallback(
    (
      ejercicioId: number,
      numeroSerie: number,
      campo: "peso" | "repeticiones",
      valor: string
    ) => {
      setRegistros((prev) => {
        const actual = prev[ejercicioId];
        if (!actual) return prev;
        const series = actual.series.map((serie) =>
          serie.numeroSerie === numeroSerie ? { ...serie, [campo]: valor } : serie
        );
        return {
          ...prev,
          [ejercicioId]: {
            ...actual,
            series,
            completado: series.every(esSerieCompleta),
          },
        };
      });
    },
    []
  );

  const handleGuardarAvance = async () => {
    cancelarAutoguardado();
    await guardarAvance(registros);
    setEstadoGuardado((actual) => (actual === "error" ? actual : "guardado"));
  };

  const handleFinalizar = async () => {
    if (!todosCompletados || !sesionId || finalizando) return;
    setConfirmandoFinalizar(false);
    setFinalizando(true);
    cancelarAutoguardado();

    try {
      await colaGuardado.current;
      await registrarAvanceSesion(
        sesionId,
        ALUMNO_ID,
        construirRegistrosAvance(registros),
        { calentamientoCompletado, cardioCompletado, estiramientoCompletado }
      );
      await finalizarSesion(sesionId, ALUMNO_ID);
      setSesionFinalizada(true);
    } catch (err) {
      console.error("Error al finalizar sesión:", err);
      alert(
        err instanceof Error
          ? err.message
          : "No se pudo finalizar la sesión. Verificá que todos los ejercicios obligatorios estén completos."
      );
    } finally {
      setFinalizando(false);
    }
  };

  const handleVolver = () => {
    navigate(`/planes/${planId || 1}/rutinas`);
  };

  const handleVolverADetalle = async () => {
    cancelarAutoguardado();
    await guardarAvance(registros);
    navigate(`/planes/${planId || 1}/rutinas/${idRutina}`);
  };

  const handleContinuarSesionEnCurso = () => {
    navigate(`/planes/${planId || 1}/rutinas/${rutinaEnCurso}/sesion`);
  };

  const textoGuardado = {
    inactivo: "",
    guardando: "Guardando avance...",
    guardado: "Avance guardado",
    error: "No se pudo guardar el último cambio. Intentá de nuevo.",
  }[estadoGuardado];

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
            subtitulo={`Rutina N° ${rutina.numero} — Completá el calentamiento y registrá los pesos y repeticiones de core y fuerza.`}
            icono={<IconoSesion />}
            badge={`${ejerciciosCore.length + ejerciciosFuerza.length} ejercicios de fuerza/core`}
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
            mensaje={
              mensajeError ?? "No se pudo cargar la rutina para iniciar la sesion."
            }
            onAccion={rutinaEnCurso ? handleContinuarSesionEnCurso : handleVolver}
            textoAccion={rutinaEnCurso ? "Continuar sesión en curso" : "Volver"}
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
                  calentamientoCompletado={calentamientoCompletado}
                  coreCompletados={coreCompletados}
                  coreTotal={ejerciciosCore.length}
                  fuerzaCompletados={fuerzaCompletados}
                  fuerzaTotal={ejerciciosFuerza.length}
                  cardioCompletado={cardioCompletado}
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
                  {/* Slide 0: Calentamiento (obligatorio, tilde único para todo el bloque) */}
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
                        completado={calentamientoCompletado}
                        onToggleCompletado={handleToggleCalentamiento}
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

                  {/* Slide 1: Core (obligatorio, completado automático al registrar peso y reps) */}
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
                        onCambiarSerie={handleCambiarSerie}
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

                  {/* Slide 2: Fuerza (obligatorio, completado automático al registrar peso y reps) */}
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
                        onCambiarSerie={handleCambiarSerie}
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

                  {/* Slide 3: Cardio (opcional, tilde por sección) */}
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
                      <SeccionCardioSesion
                        cardio={tieneCardio ? rutina.cardio : ""}
                        completado={cardioCompletado}
                        onToggleCompletado={handleToggleCardio}
                      />
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

                  {/* Slide 4: Estiramiento (opcional, tilde por sección) */}
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
                <span className="sesion__progreso-label">Progreso general obligatorio</span>
                <span className="sesion__progreso-porcentaje">
                  {porcentaje}% ({completadosObligatorios}/{totalObligatorios})
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
                  Para finalizar falta completar: {pendientes.join(", ")}. Cardio y Estiramiento son opcionales.
                </p>
              )}
              <button
                type="button"
                className="sesion__boton-finalizar"
                disabled={!todosCompletados || finalizando}
                onClick={() => setConfirmandoFinalizar(true)}
              >
                <IconoFinalizar />
                {finalizando ? "Finalizando..." : "Finalizar"}
              </button>
              <button
                type="button"
                className="sesion__boton-cancelar"
                onClick={handleGuardarAvance}
              >
                Guardar avance
              </button>
              <button
                type="button"
                className="sesion__boton-cancelar"
                onClick={handleVolverADetalle}
              >
                Cancelar
              </button>
              {textoGuardado && (
                <p className="sesion__estado-guardado" role="status">
                  {textoGuardado}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {confirmandoFinalizar && (
        <ModalConfirmarFinalizacion
          onConfirmar={handleFinalizar}
          onCancelar={() => setConfirmandoFinalizar(false)}
        />
      )}

      {/* Modal de sesion finalizada */}
      {sesionFinalizada && rutina && (
        <ModalSesionFinalizada
          rutinaNumero={rutina.numero}
          onVolver={handleVolver}
        />
      )}
    </main>
  );
}
