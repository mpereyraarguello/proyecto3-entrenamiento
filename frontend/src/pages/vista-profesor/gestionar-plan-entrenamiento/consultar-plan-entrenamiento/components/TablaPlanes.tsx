//TablaPlanes.tsx
import type { PlanListado } from '../types/plan-entrenamiento.types';

interface Props {
  planes: PlanListado[];
  onVerDetalle: (id: string) => void;
}

export const TablaPlanes = ({ planes, onVerDetalle }: Props) => {
  if (planes.length === 0) {
    return (
      <div className="mt-8 p-8 text-center bg-[#1E1E1E] border border-gray-700 rounded-lg">
        <p className="text-gray-400">No se encontraron planes de entrenamiento.</p>
      </div>
    );
  }

  return (
    // Contenedor con fondo de tarjeta y bordes redondeados
    <div className="mt-6 bg-[#1E1E1E] border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="text-xs uppercase bg-[#121212] text-gray-400 border-b border-gray-700">
          <tr>
            <th className="px-6 py-4 font-semibold">Alumno</th>
            <th className="px-6 py-4 font-semibold">Plan</th>
            <th className="px-6 py-4 font-semibold">Fechas</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
            <th className="px-6 py-4 font-semibold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {planes.map((plan) => (
            <tr key={plan.id} className="border-b border-gray-700 hover:bg-[#2A2A2A] transition-colors last:border-0">
              <td className="px-6 py-4 font-medium text-white">{plan.alumnoNombre}</td>
              <td className="px-6 py-4">{plan.nombrePlan}</td>
              <td className="px-6 py-4 text-gray-400">
                {new Date(plan.fechaInicio).toLocaleDateString('es-AR')} al {new Date(plan.fechaFin).toLocaleDateString('es-AR')}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  plan.estado === 'ACTIVO' 
                    ? 'bg-green-900 bg-opacity-30 text-[#00FF00] border border-[#00FF00]' 
                    : 'bg-gray-800 text-gray-400 border border-gray-600'
                }`}>
                  {plan.estado}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onVerDetalle(plan.id)}
                  className="bg-[#00FF00] text-black font-bold py-2 px-4 rounded hover:bg-green-400 transition-colors text-xs uppercase tracking-wide"
                >
                  Ver Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};