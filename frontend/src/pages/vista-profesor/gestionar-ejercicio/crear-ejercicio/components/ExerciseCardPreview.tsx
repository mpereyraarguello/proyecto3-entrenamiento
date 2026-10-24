import React from 'react'
import { MoveIcon, SparklesIcon } from '../../components/Icons'
import type { ExerciseType, MuscleGroup } from '../../../../../types/exercise'
import { EXERCISE_TYPES, MUSCLE_GROUPS } from '../../../../../types/exercise'

interface ExerciseCardPreviewProps {
  nombre: string
  observacion: string
  imagenUrl: string
  grupoMuscular: MuscleGroup
  tipoEjercicio: ExerciseType
}

export const ExerciseCardPreview: React.FC<ExerciseCardPreviewProps> = ({
  nombre,
  observacion,
  imagenUrl,
  grupoMuscular,
  tipoEjercicio,
}) => {
  const cardTheme: 'light' | 'dark' = 'light'

  const typeObj = EXERCISE_TYPES.find((t) => t.id === tipoEjercicio)
  const muscleObj = MUSCLE_GROUPS.find((m) => m.id === grupoMuscular)

  const displayName = nombre.trim() ? nombre : 'Sentadilla con barra'
  const displayImage = imagenUrl.trim() ? imagenUrl : '/exercise-example.png'

  return (
    <div className="preview-wrapper">
      <div className="preview-header">
        <h3>
          <SparklesIcon size={20} color="var(--neon-green)" />
          Vista Previa de la Ficha
        </h3>
      </div>

      {/* Tarjeta tipo Ficha idéntica a la imagen de ejemplo subida por el usuario */}
      <div
        className="exercise-card-replica"
        style={{
          backgroundColor: cardTheme === 'light' ? '#FFFFFF' : '#171717',
          color: cardTheme === 'light' ? '#111111' : '#FFFFFF',
          borderColor: cardTheme === 'light' ? '#e2e8f0' : 'rgba(110, 139, 126, 0.4)',
        }}
      >
        {/* Icono de 4 flechas de movimiento superior derecho como en el ejemplo */}
        <div
          className="card-icon-top-right"
          title="Mover o reordenar ejercicio"
          style={{ color: cardTheme === 'light' ? '#64748b' : '#6E8B7E' }}
        >
          <MoveIcon size={18} />
        </div>

        {/* Imagen central */}
        <div className="card-image-container">
          <img
            src={displayImage}
            alt={displayName}
            onError={(e) => {
              // Fallback to sample image if broken
              const target = e.currentTarget
              if (target.src !== window.location.origin + '/exercise-example.png') {
                target.src = '/exercise-example.png'
              }
            }}
          />
        </div>

        {/* Nombre del ejercicio */}
        <div
          className="card-title font-colvetica"
          style={{ color: cardTheme === 'light' ? '#1a1a1a' : '#FFFFFF' }}
        >
          {displayName}
        </div>
      </div>

      {/* Metadatos y detalles complementarios */}
      <div className="preview-card-meta">
        <div className="meta-row">
          <span className="meta-label">Tipo de Ejercicio</span>
          <span className="meta-badge-neon">{typeObj?.label || tipoEjercicio}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Grupo Muscular</span>
          <span className="meta-value">
            {muscleObj?.label || grupoMuscular}
          </span>
        </div>

        {observacion.trim() ? (
          <div>
            <span className="meta-label" style={{ display: 'block', marginTop: '0.6rem' }}>
              Observación / Técnica:
            </span>
            <div className="observation-box">{observacion}</div>
          </div>
        ) : (
          <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Sin observaciones técnicas aún.
          </div>
        )}
      </div>
    </div>
  )
}
