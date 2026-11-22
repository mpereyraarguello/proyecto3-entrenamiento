//DetallePlan.tsx
import type { PlanDetalle } from '../types/plan-entrenamiento.types';

interface Props {
  plan: PlanDetalle;
  onClose: () => void;
}

export const DetallePlan = ({ plan, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-[#121212] border border-gray-600 rounded-lg p-6 w-full max-w-2xl text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
        
        <h2 className="text-2xl font-bold text-[#00FF00] mb-4">Detalle del Plan #{plan.numeroPlan}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-sm">Nombre del Plan</p>
            <p className="font-semibold">{plan.nombre}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Estado</p>
            <p className="font-semibold">{plan.estado}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Semana Actual</p>
            <p className="font-semibold">Semana {plan.semanaActual} de 4</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Pausas (Micro / Macro)</p>
            <p className="font-semibold">{plan.microPausa} / {plan.macroPausa}</p>
          </div>
        </div>

        <div className="bg-[#1E1E1E] p-4 rounded-md text-center text-gray-400 italic">
          {/* Acá luego irá el map de las rutinas y sus ejercicios */}
          El detalle de las rutinas y ejercicios se mostrará acá.
        </div>
      </div>
    </div>
  );
};