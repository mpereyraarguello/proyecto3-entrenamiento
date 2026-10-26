import { useEffect, useRef } from "react";

export type SeccionSesionTab =
  | "calentamiento"
  | "core"
  | "fuerza"
  | "cardio"
  | "estiramiento";

interface PestanasSesionProps {
  tabActiva: SeccionSesionTab;
  onCambiarTab: (tab: SeccionSesionTab) => void;
  calentamientoCompletados?: number;
  calentamientoTotal?: number;
  coreCompletados: number;
  coreTotal: number;
  fuerzaCompletados: number;
  fuerzaTotal: number;
  estiramientoCompletado?: boolean;
}

export default function PestanasSesion({
  tabActiva,
  onCambiarTab,
  calentamientoCompletados = 0,
  calentamientoTotal = 0,
  coreCompletados,
  coreTotal,
  fuerzaCompletados,
  fuerzaTotal,
  estiramientoCompletado = false,
}: PestanasSesionProps) {
  const activeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [tabActiva]);

  const tabs: {
    id: SeccionSesionTab;
    label: string;
    conteo?: { completados: number; total: number };
  }[] = [
    {
      id: "calentamiento",
      label: "Calentamiento",
      conteo:
        calentamientoTotal > 0
          ? {
              completados: calentamientoCompletados,
              total: calentamientoTotal,
            }
          : undefined,
    },
    {
      id: "core",
      label: "Core",
      conteo: { completados: coreCompletados, total: coreTotal },
    },
    {
      id: "fuerza",
      label: "Fuerza",
      conteo: { completados: fuerzaCompletados, total: fuerzaTotal },
    },
    { id: "cardio", label: "Cardio" },
    {
      id: "estiramiento",
      label: "Estiramiento",
      conteo: {
        completados: estiramientoCompletado ? 1 : 0,
        total: 1,
      },
    },
  ];

  return (
    <nav className="sesion__tabs-nav" aria-label="Secciones del entrenamiento">
      <div className="sesion__tabs-scroll">
        {tabs.map((tab, index) => {
          const esActiva = tabActiva === tab.id;
          const estaCompleto =
            tab.conteo &&
            tab.conteo.total > 0 &&
            tab.conteo.completados === tab.conteo.total;

          return (
            <div key={tab.id} className="sesion__tab-item-wrapper">
              <button
                ref={esActiva ? activeBtnRef : null}
                type="button"
                className={`sesion__tab-btn ${
                  esActiva ? "sesion__tab-btn--activa" : ""
                } ${estaCompleto ? "sesion__tab-btn--completo" : ""}`}
                onClick={() => onCambiarTab(tab.id)}
                role="tab"
                aria-selected={esActiva}
              >
                <span className="sesion__tab-label">{tab.label}</span>
                {tab.conteo && tab.conteo.total > 0 && (
                  <span
                    className={`sesion__tab-badge ${
                      estaCompleto ? "sesion__tab-badge--completo" : ""
                    }`}
                  >
                    {tab.conteo.completados}/{tab.conteo.total}
                  </span>
                )}
              </button>
              {index < tabs.length - 1 && (
                <span className="sesion__tab-separador" aria-hidden="true">
                  |
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
