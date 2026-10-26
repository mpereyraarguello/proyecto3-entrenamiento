import React, { useState, useEffect } from 'react'
import { DashboardHeader } from './components/dashboardHeader'
import { StatCard } from './components/statCard'
import { QuickActions } from './components/quickActions'
import { StudentSummaryCard, type AlumnoData } from './components/alumnosCard'
import { dashboardApi } from './services/dashboardApi'

interface DashboardProfesorProps {
  onNavigateToRegister: () => void
  onNavigateToCrearPlan: () => void
  onNavigateToConsulta: () => void
}

// --- ÍCONOS SVG ADICIONALES PARA MÁS DETALLE VISUAL ---
const UserCheckIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
)

const TargetIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const SparklesIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'var(--neon-green)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
)

export const DashboardProfesorPage: React.FC<DashboardProfesorProps> = ({
  onNavigateToRegister,
  onNavigateToCrearPlan,
  onNavigateToConsulta,
}) => {
  const [alumnos, setAlumnos] = useState<AlumnoData[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterEstado, setFilterEstado] = useState<'todos' | 'activos' | 'inactivos'>('todos')

  useEffect(() => {
    dashboardApi.getAlumnos().then(setAlumnos)
  }, [])

  const totalAlumnos = alumnos.length
  const planesActivos = alumnos.filter((a) => a.planActivo).length
  const alumnosSinPlan = alumnos.filter((a) => !a.planActivo).length

  const filteredAlumnos = alumnos.filter((alumno) => {
    const fullName = `${alumno.nombre} ${alumno.apellido}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) || alumno.dni.includes(searchTerm)

    if (filterEstado === 'activos') return matchesSearch && alumno.planActivo
    if (filterEstado === 'inactivos') return matchesSearch && !alumno.planActivo
    return matchesSearch
  })

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
      }}
    >
      {/* Encabezado con efecto Glow Neón */}
      <DashboardHeader
        titulo="Panel General de Profesor"
        subtitulo="Gestiona tus alumnos, crea planes de entrenamiento y analiza la evolución física."
      />

      {/* Grid de Tarjetas KPI con bordes resaltados e íconos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <StatCard
          label="TOTAL ALUMNOS"
          value={totalAlumnos}
          sublabel="Registrados en el gimnasio"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
          }
        />
        <StatCard
          label="PLANES ACTIVOS"
          value={planesActivos}
          sublabel="En seguimiento"
          highlight
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        />
        <StatCard
          label="ALUMNOS SIN PLAN"
          value={alumnosSinPlan}
          sublabel="Requiere asignación"
          alert={alumnosSinPlan > 0}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
        />
        <StatCard
          label="DURACIÓN ESTÁNDAR"
          value="4 Semanas"
          sublabel="Ciclo de Macro/Microciclo"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />
      </div>

      {/* Acciones Rápidas asociadas a las Props */}
      <QuickActions
        onRegistrarAlumno={onNavigateToRegister}
        onCrearPlan={onNavigateToCrearPlan}
        onVerEjercicios={onNavigateToConsulta}
      />

      {/* Contenedor Principal elevado con sombra Neón suave */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '16px',
          padding: '1.8rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <SparklesIcon size={22} color="var(--neon-green)" />
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.35rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.5px',
                }}
              >
                Gestión y Seguimiento de Alumnos
              </h2>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Consulta el objetivo, modifica datos o analiza las estadísticas de cada alumno.
              </p>
            </div>
          </div>

          {/* Buscador interactivo con foco Verde Neón */}
          <div style={{ position: 'relative', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.6rem',
                backgroundColor: 'var(--bg-surface-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.88rem',
                transition: 'all 0.25s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--neon-green)'
                e.target.style.boxShadow = '0 0 12px var(--neon-green-glow)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-subtle)'
                e.target.style.boxShadow = 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                display: 'flex',
                pointerEvents: 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filtros tipo Chips con animación Hover */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['todos', 'activos', 'inactivos'] as const).map((est) => {
            const isSelected = filterEstado === est
            return (
              <button
                key={est}
                type="button"
                onClick={() => setFilterEstado(est)}
                style={{
                  backgroundColor: isSelected ? 'var(--neon-green)' : 'var(--bg-surface-elevated)',
                  color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                  border: isSelected ? '1px solid var(--neon-green)' : '1px solid var(--border-subtle)',
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 'bold' : '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 10px var(--neon-green-glow)' : 'none',
                }}
              >
                {est === 'todos' && <UserCheckIcon size={15} />}
                {est === 'activos' && <SparklesIcon size={14} color={isSelected ? '#121212' : 'var(--neon-green)'} />}
                {est === 'inactivos' && <TargetIcon size={15} />}

                {est === 'todos' && `Todos los Alumnos (${alumnos.length})`}
                {est === 'activos' && `Con Plan Activo (${planesActivos})`}
                {est === 'inactivos' && `Sin Plan (${alumnosSinPlan})`}
              </button>
            )
          })}
        </div>

        {/* Lista/Grid de Tarjetas de Alumnos */}
        {filteredAlumnos.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredAlumnos.map((alumno) => (
              <StudentSummaryCard
                key={alumno.id}
                alumno={alumno}
                onVerEstadisticas={(id) => console.log('Ver estadísticas de alumno:', id)}
                onEditar={(id) => console.log('Editar alumno:', id)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '3.5rem 1rem',
              color: 'var(--text-muted)',
              fontSize: '0.92rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: '12px',
              border: '1px dashed var(--border-subtle)',
            }}
          >
            No se encontraron alumnos que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  )
}