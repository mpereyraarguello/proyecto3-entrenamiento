import React, { useState } from 'react'
import type { Exercise } from '../../../../types/exercise'
import { EXERCISE_TYPES, MUSCLE_GROUPS } from '../../../../types/exercise'
import { TrashIcon, MoveIcon } from './Icons'

interface ExerciseListProps {
  exercises: Exercise[]
  onDeleteExercise: (id: string) => void
  onSelectForEdit?: (exercise: Exercise) => void
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onDeleteExercise,
  onSelectForEdit,
}) => {
  const [filterType, setFilterType] = useState<string>('todos')
  const [filterMuscle, setFilterMuscle] = useState<string>('todos')

  const filteredExercises = exercises.filter((ex) => {
    const matchesType = filterType === 'todos' || ex.tipoEjercicio === filterType
    const matchesMuscle = filterMuscle === 'todos' || ex.grupoMuscular === filterMuscle
    return matchesType && matchesMuscle
  })

  return (
    <section className="catalog-section">
      <div className="catalog-card">
        <div className="catalog-header">
          <div>
            <h3 className="font-colvetica">
              Ejercicios Registrados ({filteredExercises.length})
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
              Base de datos local de movimientos y fichas de entrenamiento
            </p>
          </div>

          {/* Filtros */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              className="field-select"
              style={{ width: 'auto', padding: '0.45rem 0.8rem', fontSize: '0.85rem' }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="todos">Todos los Tipos</option>
              {EXERCISE_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            <select
              className="field-select"
              style={{ width: 'auto', padding: '0.45rem 0.8rem', fontSize: '0.85rem' }}
              value={filterMuscle}
              onChange={(e) => setFilterMuscle(e.target.value)}
            >
              <option value="todos">Todos los Grupos Musculares</option>
              {MUSCLE_GROUPS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredExercises.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-muted)',
              border: '1px dashed var(--border-subtle)',
              borderRadius: '12px',
            }}
          >
            <p style={{ fontSize: '1.1rem' }}>No se encontraron ejercicios con los filtros seleccionados.</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
              Crea uno nuevo completando el formulario superior.
            </p>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredExercises.map((exercise) => {
              const muscleObj = MUSCLE_GROUPS.find((m) => m.id === exercise.grupoMuscular)
              const typeObj = EXERCISE_TYPES.find((t) => t.id === exercise.tipoEjercicio)

              return (
                <div key={exercise.id} className="exercise-item-card">
                  <div className="item-card-top">
                    <img
                      src={exercise.imagenUrl || '/exercise-example.png'}
                      alt={exercise.nombre}
                      className="item-image"
                      onError={(e) => {
                        e.currentTarget.src = '/exercise-example.png'
                      }}
                    />

                    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                      {onSelectForEdit && (
                        <button
                          type="button"
                          className="item-delete-btn"
                          title="Cargar en formulario"
                          style={{ color: 'var(--neon-green)' }}
                          onClick={() => onSelectForEdit(exercise)}
                        >
                          <MoveIcon size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        className="item-delete-btn"
                        title="Eliminar ejercicio"
                        onClick={() => onDeleteExercise(exercise.id)}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4
                      className="font-colvetica"
                      style={{
                        fontSize: '1.05rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {exercise.nombre}
                    </h4>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className="meta-badge-neon" style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}>
                        {typeObj?.label || exercise.tipoEjercicio}
                      </span>
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#e2e8f0',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        }}
                      >
                        {muscleObj?.label || exercise.grupoMuscular}
                      </span>
                    </div>
                  </div>

                  {exercise.observacion && (
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {exercise.observacion}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
