// src/pages/vista_profesor/CrearPlanEntrenamientoPage.tsx
import React from 'react';
import { LibreriaEjerciciosPanel } from './components/LibreriaEjerciosPanel';
import { ColumnasRutinasPanel } from './components/ColumnasRutinasPanel';
import './crear-plan.css';

export function CrearPlanEntrenamientoPage() {
  return (
    <div className="crear-plan-container">
      
      {/* Encabezado obligatorio */}
      <header className="plan-header">
        <div className="plan-header-icon">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h1>Diseñador de Plan de Entrenamiento</h1>
          <p>Cree y asigne las tres rutinas personalizadas para el alumno seleccionando los ejercicios de la librería.</p>[cite: 161]
        </div>
      </header>

      {/* Cuerpo principal */}
      <main className="plan-body">
        <LibreriaEjerciciosPanel />
        <ColumnasRutinasPanel />
      </main>

      {/* Botonera inferior */}
      <footer className="plan-footer">
        <button className="btn-secundario">Cancelar</button>
        <button className="btn-primario">Guardar Plan</button>
      </footer>

    </div>
  );
}