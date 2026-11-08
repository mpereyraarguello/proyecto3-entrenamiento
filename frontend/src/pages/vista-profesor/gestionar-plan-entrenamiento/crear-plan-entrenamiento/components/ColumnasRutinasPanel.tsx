// src/pages/vista_profesor/components/ColumnasRutinasPanel.tsx
import React, { useState } from 'react';

interface EjercicioRutina {
  id: string;
  nombre: string;
  tipo: string;
  imagen: string;
}

export function ColumnasRutinasPanel() {
  const [rutinas, setRutinas] = useState<{ [key: number]: EjercicioRutina[] }>({
    1: [],
    2: [],
    3: []
  });

  // Estado para el nivel de progresión por rutina ('principiante' o 'avanzado')
  const [nivelesProgresion, setNivelesProgresion] = useState<{ [key: number]: string }>({
    1: 'principiante',
    2: 'principiante',
    3: 'principiante'
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, numeroRutina: number) => {
    e.preventDefault();
    const ejercicioData = e.dataTransfer.getData('text/plain');
    if (ejercicioData) {
      const ejercicio = JSON.parse(ejercicioData);
      setRutinas(prev => ({
        ...prev,
        [numeroRutina]: [...prev[numeroRutina], ejercicio]
      }));
    }
  };

  const cambiarNivel = (numeroRutina: number, nivel: string) => {
    setNivelesProgresion(prev => ({ ...prev, [numeroRutina]: nivel }));
  };

  return (
    <div className="rutinas-columnas-container">
      {[1, 2, 3].map((numRutina) => {
        const nivelActual = nivelesProgresion[numRutina];
        // Definimos la progresión según el nivel seleccionado
        const progresionTexto = nivelActual === 'principiante' 
          ? 'Semana 1: 3x12 RIR 3 (Tranqui)' 
          : 'Semana 1: 4x10 RIR 1 (Pesado/Avanzado)';

        return (
          <div 
            key={numRutina} 
            className="rutina-columna-card"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, numRutina)}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div className="rutina-columna-header">
                <h3>Rutina N° {numRutina}</h3>
                <span className="badge-activa">Activa</span>
              </div>

              {/* Selector de Nivel de Progresión */}
              <div style={{ marginBottom: '12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#6E887E' }}>Nivel:</span>
                <button 
                  onClick={() => cambiarNivel(numRutina, 'principiante')}
                  style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: nivelActual === 'principiante' ? '#00FF00' : 'transparent',
                    color: nivelActual === 'principiante' ? '#121212' : '#6E887E',
                    border: '1px solid #6E887E',
                    fontWeight: 'bold'
                  }}
                >
                  Principiante
                </button>
                <button 
                  onClick={() => cambiarNivel(numRutina, 'avanzado')}
                  style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: nivelActual === 'avanzado' ? '#00FF00' : 'transparent',
                    color: nivelActual === 'avanzado' ? '#121212' : '#6E887E',
                    border: '1px solid #6E887E',
                    fontWeight: 'bold'
                  }}
                >
                  Avanzado
                </button>
              </div>
              
              {/* Contenedor de ejercicios arrastrados con diseño bonito */}
              {rutinas[numRutina].length === 0 ? (
                <div className="dropzone-area">
                  Arrastre ejercicios aquí (Mín. 2 Core, 5 Fuerza)[cite: 161]
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto', marginBottom: '12px' }}>
                  {rutinas[numRutina].map((ej, index) => (
                    <div 
                      key={index} 
                      style={{
                        backgroundColor: '#121212',
                        border: '1px solid rgba(110, 136, 126, 0.4)',
                        borderRadius: '8px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <img 
                        src={ej.imagen} 
                        alt={ej.nombre} 
                        style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} 
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 2px 0', fontSize: '12px', fontWeight: 'bold', color: '#FFFFFF' }}>{ej.nombre}</p>
                        <span style={{ fontSize: '9px', color: '#00FF00', textTransform: 'uppercase', fontWeight: 'bold' }}>
                          {nivelActual === 'avanzado' ? '4x10 - Carga Alta' : '3x12 - Carga Moderada'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rutina-footer-info" style={{ borderTop: '1px solid rgba(110, 136, 126, 0.2)', paddingTop: '8px' }}>
              <span style={{ color: '#00FF00', fontWeight: 'bold' }}>{progresionTexto}</span>
              <span>Pausa: 1'30''</span>[cite: 161]
            </div>
          </div>
        );
      })}
    </div>
  );
}