import React, { useState } from 'react'

export interface AlumnoData {
  id: string
  nombre: string
  apellido: string
  dni: string
  objetivo: string
  planActivo: boolean
  nombrePlan?: string
  fechaFinPlan?: string
}

interface StudentSummaryCardProps {
  alumno: AlumnoData
  onVerEstadisticas: (id: string) => void
  onEditar: (id: string) => void
}

export const StudentSummaryCard: React.FC<StudentSummaryCardProps> = ({
  alumno,
  onVerEstadisticas,
  onEditar,
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<'stats' | 'edit' | null>(null)

  return (
    <div
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: `1px solid ${isCardHovered ? 'var(--neon-green)' : 'var(--border-subtle)'}`,
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isCardHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isCardHovered ? '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px var(--neon-green-subtle)' : 'none',
      }}
    >
      <div>
        {/* Cabecera de la Tarjeta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.85rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.75rem',
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '1.15rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
              }}
            >
              {alumno.nombre} {alumno.apellido}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              DNI: {alumno.dni}
            </span>
          </div>

          <span
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 'bold',
              letterSpacing: '0.04em',
              backgroundColor: alumno.planActivo
                ? 'var(--neon-green-subtle)'
                : 'var(--wine-red-light)',
              color: alumno.planActivo ? 'var(--neon-green)' : '#ff6b6b',
              border: `1px solid ${
                alumno.planActivo ? 'var(--neon-green)' : 'var(--wine-red-border)'
              }`,
              boxShadow: alumno.planActivo ? '0 0 8px var(--neon-green-subtle)' : 'none',
            }}
          >
            {alumno.planActivo ? 'PLAN ACTIVO' : 'SIN PLAN'}
          </span>
        </div>

        {/* Detalles con iconos alusivos */}
        <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
          
          {/* Objetivo */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: 'var(--neon-green)', marginTop: '2px', display: 'flex' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Objetivo:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{alumno.objetivo}</span>
            </div>
          </div>

          {/* Plan Actual */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)', marginTop: '2px', display: 'flex' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Plan Actual:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                {alumno.planActivo ? alumno.nombrePlan : 'Sin Plan Asignado'}
              </span>
            </div>
          </div>

          {/* Vencimiento (si tiene plan activo) */}
          {alumno.planActivo && alumno.fechaFinPlan && (
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.45rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.2rem',
              }}
            >
              <span style={{ color: 'var(--neon-green)', display: 'flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vencimiento:</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                {alumno.fechaFinPlan}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Botones inferiores con sus respectivos iconos */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          paddingTop: '0.8rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <button
          type="button"
          onClick={() => onVerEstadisticas(alumno.id)}
          onMouseEnter={() => setHoveredBtn('stats')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            flex: 1,
            backgroundColor: hoveredBtn === 'stats' ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: `1px solid ${hoveredBtn === 'stats' ? 'var(--neon-green)' : 'var(--border-muted)'}`,
            borderRadius: '8px',
            padding: '0.6rem 0.8rem',
            fontSize: '0.82rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Icono de estadísticas/gráfico de barras */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="2.5">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>Estadísticas</span>
        </button>

        <button
          type="button"
          onClick={() => onEditar(alumno.id)}
          onMouseEnter={() => setHoveredBtn('edit')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            flex: 1,
            backgroundColor: hoveredBtn === 'edit' ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: `1px solid ${hoveredBtn === 'edit' ? 'var(--border-focus)' : 'var(--border-muted)'}`,
            borderRadius: '8px',
            padding: '0.6rem 0.8rem',
            fontSize: '0.82rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Icono de lápiz/editar */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Editar</span>
        </button>
      </div>
    </div>
  )
}