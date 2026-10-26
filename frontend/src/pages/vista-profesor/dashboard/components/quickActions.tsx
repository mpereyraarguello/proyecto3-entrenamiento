import React, { useState } from 'react'

interface QuickActionsProps {
  onRegistrarAlumno: () => void
  onCrearPlan: () => void
  onVerEjercicios: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onRegistrarAlumno,
  onCrearPlan,
  onVerEjercicios,
}) => {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)

  const getPrimaryBtnStyle = (btnKey: string): React.CSSProperties => {
    const isHovered = hoveredBtn === btnKey
    return {
      backgroundColor: isHovered ? 'var(--neon-green-hover)' : 'var(--neon-green)',
      color: 'var(--bg-primary)',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1.25rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontFamily: 'var(--font-body)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 0 16px var(--neon-green-glow)' : 'none',
    }
  }

  const getSecondaryBtnStyle = (btnKey: string): React.CSSProperties => {
    const isHovered = hoveredBtn === btnKey
    return {
      backgroundColor: isHovered ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
      color: 'var(--text-primary)',
      border: `1px solid ${isHovered ? 'var(--border-focus)' : 'var(--border-muted)'}`,
      borderRadius: '8px',
      padding: '0.75rem 1.25rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          fontWeight: 600,
        }}
      >
        {/* Icono de flama/fuego para acciones rápidas */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="2.5">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 2 2 3 3.5 3 6a6 6 0 1 1-12 0c0-1.05.3-2.1.85-3.05Z" />
        </svg>
        <span>Acciones Rápidas del Profesor:</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={onRegistrarAlumno}
          onMouseEnter={() => setHoveredBtn('registrar')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={getPrimaryBtnStyle('registrar')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <span>+ Registrar Alumno</span>
        </button>

        <button
          type="button"
          onClick={onCrearPlan}
          onMouseEnter={() => setHoveredBtn('crearPlan')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={getPrimaryBtnStyle('crearPlan')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="12" x2="12" y2="18" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <span>+ Crear Plan de Entrenamiento</span>
        </button>

        <button
          type="button"
          onClick={onVerEjercicios}
          onMouseEnter={() => setHoveredBtn('ejercicios')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={getSecondaryBtnStyle('ejercicios')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="2">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span>Librería de Ejercicios</span>
        </button>
      </div>
    </div>
  )
}