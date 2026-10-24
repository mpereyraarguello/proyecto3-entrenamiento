// src/pages/vista_profesor/components/LibreriaEjerciciosPanel.tsx
import React from 'react';

export function LibreriaEjerciciosPanel() {
  const ejerciciosMock = [
    { 
      id: '1', 
      nombre: 'Sentadilla con barra', 
      tipo: 'fuerza', 
      imagen: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=100&auto=format&fit=crop&q=60' 
    },
    { 
      id: '2', 
      nombre: 'Peso muerto rumano', 
      tipo: 'fuerza', 
      imagen: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=60' 
    },
    { 
      id: '3', 
      nombre: 'Puente bajo TRX', 
      tipo: 'core', 
      imagen: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=60' 
    },
    { 
      id: '4', 
      nombre: 'Press de banca', 
      tipo: 'fuerza', 
      imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&auto=format&fit=crop&q=60' 
    },
  ];

  const handleDragStart = (e: React.DragEvent, ejercicio: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(ejercicio));
  };

  return (
    <aside className="libreria-panel">
      <h2>Librería de Ejercicios</h2>
      
      <input 
        type="text" 
        placeholder="Buscar ejercicio..." 
        className="input-buscar"
      />

      <div className="tipos-iconos-bar">
        <button title="Filtros">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
        </button>
        <button title="Core">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>
        </button>
        <button title="Fuerza">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <button title="Cardio">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
      </div>

      <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ejerciciosMock.map((ej) => (
          <div 
            key={ej.id} 
            draggable 
            onDragStart={(e) => handleDragStart(e, ej)}
            className="ejercicio-card-drag"
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <img 
              src={ej.imagen} 
              alt={ej.nombre} 
              style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} 
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{ej.nombre}</p>
              <span style={{ fontSize: '10px', color: '#6E887E', textTransform: 'uppercase' }}>{ej.tipo}</span>
            </div>
            <svg width="14" height="14" fill="none" stroke="#6E887E" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16"/></svg>
          </div>
        ))}
      </div>
    </aside>
  );
}