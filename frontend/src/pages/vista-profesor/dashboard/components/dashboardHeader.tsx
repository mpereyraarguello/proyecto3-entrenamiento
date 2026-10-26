import React from 'react'

interface DashboardHeaderProps {
  titulo: string
  subtitulo: string
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ titulo, subtitulo }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '0.85rem',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--neon-green)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <polyline points="17 11 19 13 23 9" />
        </svg>
      </div>

      <div>
        <h1
          style={{
            margin: 0,
            fontSize: '1.8rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
          }}
        >
          {titulo}
        </h1>
        <p
          style={{
            margin: '0.25rem 0 0 0',
            color: 'var(--text-muted)',
            fontSize: '0.92rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          {subtitulo}
        </p>
      </div>
    </div>
  )
}