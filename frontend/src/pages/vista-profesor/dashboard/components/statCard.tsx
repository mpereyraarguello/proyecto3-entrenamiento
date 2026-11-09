import React, { useState } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  sublabel: string
  icon: React.ReactNode
  highlight?: boolean
  alert?: boolean
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sublabel,
  icon,
  highlight = false,
  alert = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  let valueColor = 'var(--text-primary)'
  let borderColor = 'var(--border-subtle)'
  let glowColor = 'transparent'
  let badgeBg = 'rgba(255, 255, 255, 0.05)'
  let badgeColor = 'var(--text-muted)'

  if (highlight) {
    valueColor = 'var(--neon-green)'
    badgeBg = 'var(--neon-green-subtle)'
    badgeColor = 'var(--neon-green)'
    if (isHovered) {
      borderColor = 'var(--neon-green)'
      glowColor = 'var(--neon-green-glow)'
    }
  } else if (alert) {
    valueColor = '#ff6b6b'
    badgeBg = 'var(--wine-red-light)'
    badgeColor = '#ff6b6b'
    if (isHovered) {
      borderColor = 'var(--wine-red-hover)'
      glowColor = 'var(--wine-red-glow)'
    }
  } else if (isHovered) {
    borderColor = 'var(--border-focus)'
    glowColor = 'rgba(255, 255, 255, 0.05)'
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: `1px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 8px 24px ${glowColor}` : 'none',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-body)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: valueColor,
            fontSize: '2rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.2',
          }}
        >
          {value}
        </span>
        <div style={{ marginTop: '0.4rem' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 500,
              backgroundColor: badgeBg,
              color: badgeColor,
            }}
          >
            {sublabel}
          </span>
        </div>
      </div>

      {/* Contenedor cuadrado para el icono a la derecha */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: highlight ? 'var(--neon-green)' : alert ? '#ff6b6b' : 'var(--text-muted)',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    </div>
  )
}