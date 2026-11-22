//ConsultarPlanEntrenamiento.tsx
import { useEffect, useState } from 'react';
import { planEntrenamientoApi } from './services/planEntrenamientoApi';
import type { PlanListado, PlanDetalle } from './types/plan-entrenamiento.types';
import { TablaPlanes } from './components/TablaPlanes';
import { DetallePlan } from './components/DetallePlan';

export const ConsultarPlanEntrenamiento = () => {
  const [planes, setPlanes] = useState<PlanListado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  // Estado para el modal de detalle
  const [planSeleccionado, setPlanSeleccionado] = useState<PlanDetalle | null>(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  // Cargar la lista
    // Cargar la lista
  const cargarPlanes = async () => {
    setCargando(true);
    try {
      // 👇 DATOS FALSOS PARA PROBAR LA TABLA 👇
      const dataMokeada: PlanListado[] = [
        {
          id: '1',
          alumnoId: 'a1',
          alumnoNombre: 'Mateo Zandrino',
          nombrePlan: 'Hipertrofia Nivel 1',
          fechaInicio: new Date().toISOString(),
          fechaFin: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'ACTIVO',
          cantidadRutinas: 3,
        },
        {
          id: '2',
          alumnoId: 'a2',
          alumnoNombre: 'Milagros Pereyra',
          nombrePlan: 'Fuerza y Movilidad',
          fechaInicio: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          fechaFin: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
          estado: 'INACTIVO',
          cantidadRutinas: 3,
        }
      ];
      
      setPlanes(dataMokeada);
      
      // Cuando conectes el backend, borrá lo de arriba y dejá esto:
      // const data = await planEntrenamientoApi.obtenerTodos({ estado: filtroEstado || undefined });
      // setPlanes(data);
      
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPlanes();
  }, [filtroEstado]);

  // Cargar el detalle
  const handleVerDetalle = async (id: string) => {
    setCargandoDetalle(true);
    try {
      const detalle = await planEntrenamientoApi.obtenerPorId(id);
      setPlanSeleccionado(detalle);
    } catch (error) {
      console.error(error);
    } finally {
      setCargandoDetalle(false);
    }
  };

    return (
    // Usamos un max-w-7xl para que en pantallas grandes no se estire de más, y mx-auto para centrarlo
    <div className="max-w-7xl mx-auto px-6 py-8 bg-[#121212] min-h-screen text-white">
      
      {/* Título de la pantalla */}
      <div className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-colvetica font-bold text-white uppercase tracking-wider">
          Consultar <span className="text-[#00FF00]">Planes</span>
        </h1>
        <p className="text-gray-400 mt-2">Revisa el historial y los planes activos de tus alumnos.</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-2">
        <select 
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="bg-[#1E1E1E] border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00FF00] text-sm"
        >
          <option value="">Todos los estados</option>
          <option value="ACTIVO">Solo Activos</option>
          <option value="INACTIVO">Solo Inactivos</option>
        </select>
      </div>

      {/* Tabla */}
      {cargando ? (
        <div className="mt-8 text-[#00FF00] animate-pulse">Cargando planes...</div>
      ) : (
        <TablaPlanes planes={planes} onVerDetalle={handleVerDetalle} />
      )}

      {/* Modal de Detalle (esto ya lo tenías) */}
      {cargandoDetalle && (
        <div className="mt-4 text-[#00FF00] animate-pulse" role="status">
          Cargando detalle...
        </div>
      )}

      {planSeleccionado && (
        <DetallePlan
          plan={planSeleccionado}
          onClose={() => setPlanSeleccionado(null)}
        />
      )}
    </div>
  );
};