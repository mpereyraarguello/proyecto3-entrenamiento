import React, { useState, useMemo } from 'react'
import type { Exercise } from '../../../../../types/exercise'
import { EXERCISE_TYPES, MUSCLE_GROUPS } from '../../../../../types/exercise'
import {
  SearchIcon,
  SearchXIcon,
  XIcon,
  TrashIcon,
  EyeIcon,
  DumbbellIcon,
  HeartPulseIcon,
  FlameIcon,
  ShieldZapIcon,
  ActivityIcon,
  PlusIcon,
  MoveIcon,
} from '../../components/Icons'

interface ExerciseSearchProps {
  exercises: Exercise[]
  onDeleteExercise: (id: string) => void
  onSelectForEdit: (exercise: Exercise) => void
  onNavigateToRegister: (initialName?: string) => void
}

export const ExerciseSearch: React.FC<ExerciseSearchProps> = ({
  exercises,
  onDeleteExercise,
  onSelectForEdit,
  onNavigateToRegister,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMuscle, setSelectedMuscle] = useState<string>('todos')
  const [selectedType, setSelectedType] = useState<string>('todos')
  const [activeModalExercise, setActiveModalExercise] = useState<Exercise | null>(null)

  // Tipo de icono según categoría
  const getTypeIcon = (typeId: string) => {
    switch (typeId) {
      case 'fuerza':
        return <DumbbellIcon size={16} />
      case 'cardio':
        return <HeartPulseIcon size={16} />
      case 'calentamiento':
        return <FlameIcon size={16} />
      case 'core':
        return <ShieldZapIcon size={16} />
      case 'estiramiento':
        return <ActivityIcon size={16} />
      default:
        return <DumbbellIcon size={16} />
    }
  }

  // Filtrado reactivo en tiempo real
  const filteredExercises = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()

    return exercises.filter((ex) => {
      // Coincidencia por nombre (o también en observaciones)
      const matchesName =
        !term ||
        ex.nombre.toLowerCase().includes(term) ||
        ex.observacion.toLowerCase().includes(term)

      // Coincidencia por grupo muscular
      const matchesMuscle =
        selectedMuscle === 'todos' || ex.grupoMuscular === selectedMuscle

      // Coincidencia por tipo de ejercicio
      const matchesType =
        selectedType === 'todos' || ex.tipoEjercicio === selectedType

      return matchesName && matchesMuscle && matchesType
    })
  }, [exercises, searchTerm, selectedMuscle, selectedType])

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedMuscle !== 'todos' ||
    selectedType !== 'todos'

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedMuscle('todos')
    setSelectedType('todos')
  }

  const selectedMuscleLabel =
    MUSCLE_GROUPS.find((m) => m.id === selectedMuscle)?.label || selectedMuscle
  const selectedTypeLabel =
    EXERCISE_TYPES.find((t) => t.id === selectedType)?.label || selectedType

  return (
    <div className="search-page-container">
      {/* Panel Superior de Consulta */}
      <div className="search-control-card">
        <div className="search-header-row">
          <div>
            <h2 className="font-colvetica search-title">
              Consultar Ejercicios
            </h2>
            <p className="search-subtitle">
              Busca por nombre, filtra por grupo muscular o tipo de entrenamiento.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={handleClearFilters}
              title="Restablecer todos los filtros"
            >
              <XIcon size={16} />
              Limpiar Filtros
            </button>
          )}
        </div>

        {/* 1. Buscador por Nombre */}
        <div className="search-input-wrapper">
          <div className="search-icon-left">
            <SearchIcon size={20} color="var(--neon-green)" />
          </div>
          <input
            type="text"
            className="search-field-input"
            placeholder="Buscar por nombre (ej: Sentadilla, Press, Plancha...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="Borrar texto"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>

        {/* 2. Filtro por Tipo de Ejercicio */}
        <div className="filter-section">
          <span className="filter-section-title">Tipo de Ejercicio:</span>
          <div className="filter-pills-row">
            <button
              type="button"
              className={`filter-pill ${selectedType === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedType('todos')}
            >
              Todos los tipos
            </button>
            {EXERCISE_TYPES.map((type) => {
              const isActive = selectedType === type.id
              return (
                <button
                  key={type.id}
                  type="button"
                  className={`filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <span className="pill-icon">{getTypeIcon(type.id)}</span>
                  <span>{type.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Filtro por Grupo Muscular */}
        <div className="filter-section" style={{ marginTop: '1rem' }}>
          <span className="filter-section-title">Grupo Muscular:</span>
          <div className="filter-pills-row">
            <button
              type="button"
              className={`filter-pill ${selectedMuscle === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedMuscle('todos')}
            >
              Todos los grupos
            </button>
            {MUSCLE_GROUPS.map((group) => {
              const isActive = selectedMuscle === group.id
              return (
                <button
                  key={group.id}
                  type="button"
                  className={`filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedMuscle(group.id)}
                >
                  <span>{group.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Barra de estado con resumen de búsqueda */}
        <div className="search-status-bar">
          <div className="status-count">
            Mostrando <strong>{filteredExercises.length}</strong> de{' '}
            <strong>{exercises.length}</strong> ejercicios registrados
          </div>

          {hasActiveFilters && (
            <div className="active-tags-list">
              {searchTerm && (
                <span className="active-tag">
                  Texto: "{searchTerm}"
                  <button type="button" onClick={() => setSearchTerm('')}>
                    ×
                  </button>
                </span>
              )}
              {selectedType !== 'todos' && (
                <span className="active-tag">
                  Tipo: {selectedTypeLabel}
                  <button type="button" onClick={() => setSelectedType('todos')}>
                    ×
                  </button>
                </span>
              )}
              {selectedMuscle !== 'todos' && (
                <span className="active-tag">
                  Músculo: {selectedMuscleLabel}
                  <button type="button" onClick={() => setSelectedMuscle('todos')}>
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RESULTADOS O MENSAJE CUANDO NO SE ENCUENTRA */}
      {filteredExercises.length === 0 ? (
        /* MENSAJE CUANDO NO SE ENCUENTRA - Siguiendo paleta de colores y COLVETICA */
        <div className="not-found-card">
          <div className="not-found-icon-badge">
            <SearchXIcon size={48} color="#FFFFFF" />
          </div>

          <h3 className="not-found-title font-colvetica">
            No se encontraron ejercicios
          </h3>

          <p className="not-found-description">
            No encontramos ningún resultado que coincida con tus criterios actuales:
          </p>

          <div className="not-found-details-box">
            {searchTerm && (
              <div className="criteria-item">
                <span className="criteria-label">Nombre buscado:</span>
                <span className="criteria-value">"{searchTerm}"</span>
              </div>
            )}
            {selectedType !== 'todos' && (
              <div className="criteria-item">
                <span className="criteria-label">Tipo de ejercicio:</span>
                <span className="criteria-value">{selectedTypeLabel}</span>
              </div>
            )}
            {selectedMuscle !== 'todos' && (
              <div className="criteria-item">
                <span className="criteria-label">Grupo muscular:</span>
                <span className="criteria-value">{selectedMuscleLabel}</span>
              </div>
            )}
            {!searchTerm && selectedType === 'todos' && selectedMuscle === 'todos' && (
              <div className="criteria-item">
                <span className="criteria-value">Aún no hay ejercicios guardados en el sistema.</span>
              </div>
            )}
          </div>

          <p className="not-found-hint">
            Verifica la ortografía, prueba quitando algunos filtros o registra este nuevo ejercicio en la base de datos.
          </p>

          <div className="not-found-actions">
            {hasActiveFilters && (
              <button
                type="button"
                className="btn-danger-outline"
                onClick={handleClearFilters}
              >
                <XIcon size={18} />
                Limpiar Criterios de Búsqueda
              </button>
            )}

            <button
              type="button"
              className="btn-register-match"
              onClick={() => onNavigateToRegister(searchTerm)}
            >
              <PlusIcon size={18} color="#000000" />
              Registrar {searchTerm ? `"${searchTerm}"` : 'Nuevo Ejercicio'}
            </button>
          </div>
        </div>
      ) : (
        /* GRILLA DE RESULTADOS ENCONTRADOS */
        <div className="results-grid">
          {filteredExercises.map((exercise) => {
            const muscleObj = MUSCLE_GROUPS.find((m) => m.id === exercise.grupoMuscular)
            const typeObj = EXERCISE_TYPES.find((t) => t.id === exercise.tipoEjercicio)

            return (
              <div key={exercise.id} className="result-card">
                {/* Mini Ficha idéntica al diseño del usuario */}
                <div
                  className="result-card-inner"
                  onClick={() => setActiveModalExercise(exercise)}
                  title="Haz clic para ver la ficha detallada"
                >
                  <div className="result-card-white-box">
                    <div className="result-card-icon-top">
                      <MoveIcon size={16} />
                    </div>
                    <img
                      src={exercise.imagenUrl || '/exercise-example.png'}
                      alt={exercise.nombre}
                      className="result-image"
                      onError={(e) => {
                        e.currentTarget.src = '/exercise-example.png'
                      }}
                    />
                    <div className="result-card-name font-colvetica">
                      {exercise.nombre}
                    </div>
                  </div>

                  {/* Metadatos y etiquetas */}
                  <div className="result-meta-area">
                    <div className="result-tags-row">
                      <span className="meta-badge-neon">
                        {typeObj?.label || exercise.tipoEjercicio}
                      </span>
                      <span className="meta-badge-muscle">
                        {muscleObj?.label || exercise.grupoMuscular}
                      </span>
                    </div>

                    {exercise.observacion ? (
                      <p className="result-observation-snippet">
                        {exercise.observacion}
                      </p>
                    ) : (
                      <p className="result-observation-snippet muted">
                        Sin observación técnica registrada.
                      </p>
                    )}
                  </div>
                </div>

                {/* Barra de acciones de cada tarjeta */}
                <div className="result-card-actions">
                  <button
                    type="button"
                    className="action-btn-view"
                    onClick={() => setActiveModalExercise(exercise)}
                    title="Ver ficha completa"
                  >
                    <EyeIcon size={16} />
                    Ver Ficha
                  </button>

                  <button
                    type="button"
                    className="action-btn-edit"
                    onClick={() => onSelectForEdit(exercise)}
                    title="Cargar y editar ejercicio"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="action-btn-delete"
                    onClick={() => onDeleteExercise(exercise.id)}
                    title="Eliminar de la lista"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* MODAL DETALLADO DE FICHA */}
      {activeModalExercise && (
        <div className="modal-overlay" onClick={() => setActiveModalExercise(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="font-colvetica" style={{ color: 'var(--text-primary)', fontSize: '1.4rem' }}>
                Ficha Técnica de Ejercicio
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveModalExercise(null)}
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Tarjeta idéntica al diseño en fondo blanco */}
              <div className="exercise-card-replica" style={{ margin: '0 auto 1.5rem' }}>
                <div className="card-icon-top-right">
                  <MoveIcon size={18} />
                </div>
                <div className="card-image-container">
                  <img
                    src={activeModalExercise.imagenUrl || '/exercise-example.png'}
                    alt={activeModalExercise.nombre}
                    onError={(e) => {
                      e.currentTarget.src = '/exercise-example.png'
                    }}
                  />
                </div>
                <div className="card-title font-colvetica">
                  {activeModalExercise.nombre}
                </div>
              </div>

              {/* Detalles */}
              <div className="preview-card-meta">
                <div className="meta-row">
                  <span className="meta-label">Tipo de Ejercicio</span>
                  <span className="meta-badge-neon">
                    {EXERCISE_TYPES.find((t) => t.id === activeModalExercise.tipoEjercicio)?.label ||
                      activeModalExercise.tipoEjercicio}
                  </span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Grupo Muscular</span>
                  <span className="meta-value">
                    {MUSCLE_GROUPS.find((m) => m.id === activeModalExercise.grupoMuscular)?.label ||
                      activeModalExercise.grupoMuscular}
                  </span>
                </div>
                {activeModalExercise.observacion && (
                  <div>
                    <span className="meta-label" style={{ display: 'block', marginTop: '0.8rem' }}>
                      Observaciones / Técnica:
                    </span>
                    <div className="observation-box" style={{ marginTop: '0.4rem' }}>
                      {activeModalExercise.observacion}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-danger-outline"
                onClick={() => {
                  onDeleteExercise(activeModalExercise.id)
                  setActiveModalExercise(null)
                }}
              >
                <TrashIcon size={16} />
                Eliminar
              </button>

              <button
                type="button"
                className="btn-register-match"
                onClick={() => {
                  onSelectForEdit(activeModalExercise)
                  setActiveModalExercise(null)
                }}
              >
                Editar Ejercicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
