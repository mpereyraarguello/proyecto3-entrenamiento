import React, { useState, useRef } from 'react'
import type { Exercise, ExerciseType, MuscleGroup } from '../../../../../types/exercise'
import { EXERCISE_TYPES, MUSCLE_GROUPS } from '../../../../../types/exercise'
import {
  DumbbellIcon,
  HeartPulseIcon,
  FlameIcon,
  ShieldZapIcon,
  ActivityIcon,
  UploadIcon,
  ImageIcon,
  AlertCircleIcon,
  CheckIcon,
  ArrowLeftIcon,
  TrashIcon,
} from '../../components/Icons'
import { ExerciseCardPreview } from '../../crear-ejercicio/components/ExerciseCardPreview'

interface ExerciseEditProps {
  exercise: Exercise
  onUpdateExercise: (updated: Exercise) => void
  onCancel: () => void
  onDelete: (id: string) => void
}

export const ExerciseEdit: React.FC<ExerciseEditProps> = ({
  exercise,
  onUpdateExercise,
  onCancel,
  onDelete,
}) => {
  const [nombre, setNombre] = useState(exercise.nombre)
  const [observacion, setObservacion] = useState(exercise.observacion)
  const [imagenUrl, setImagenUrl] = useState(exercise.imagenUrl)
  const [grupoMuscular, setGrupoMuscular] = useState<MuscleGroup>(exercise.grupoMuscular)
  const [tipoEjercicio, setTipoEjercicio] = useState<ExerciseType>(exercise.tipoEjercicio)

  const [errorNombre, setErrorNombre] = useState<string>('')
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getTypeIcon = (typeId: ExerciseType) => {
    switch (typeId) {
      case 'fuerza':
        return <DumbbellIcon size={20} />
      case 'cardio':
        return <HeartPulseIcon size={20} />
      case 'calentamiento':
        return <FlameIcon size={20} />
      case 'core':
        return <ShieldZapIcon size={20} />
      case 'estiramiento':
        return <ActivityIcon size={20} />
      default:
        return <DumbbellIcon size={20} />
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        setImagenUrl(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre.trim()) {
      setErrorNombre('El nombre del ejercicio no puede estar vacío.')
      return
    }
    setErrorNombre('')

    const updated: Exercise = {
      ...exercise,
      nombre: nombre.trim(),
      observacion: observacion.trim(),
      imagenUrl: imagenUrl.trim() || '/exercise-example.png',
      grupoMuscular,
      tipoEjercicio,
    }

    onUpdateExercise(updated)
  }

  return (
    <div className="search-page-container">
      {/* Barra de cabecera con retorno */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <button
          type="button"
          className="btn-danger-outline"
          onClick={onCancel}
          style={{ borderColor: 'var(--border-muted)', color: 'var(--text-muted)' }}
        >
          <ArrowLeftIcon size={18} />
          Volver a Consulta
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span
            style={{
              background: 'rgba(0, 255, 0, 0.12)',
              color: 'var(--neon-green)',
              border: '1px solid var(--neon-green)',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Modo Edición
          </span>
        </div>
      </div>

      {/* Grid: Formulario de Edición a la izquierda + Live Preview a la derecha */}
      <div className="main-layout" style={{ margin: 0, padding: 0 }}>
        {/* Formulario exclusivo de edición */}
        <div className="form-column">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2 className="font-colvetica" style={{ color: 'var(--text-primary)' }}>
                Editar Ejercicio
              </h2>
              <p>Modifica los campos del ejercicio seleccionado y guarda los cambios.</p>
            </div>

            {/* 1. Nombre */}
            <div className="form-group">
              <label className="field-label" htmlFor="edit-nombre">
                <span>Nombre del ejercicio *</span>
                <span className="hint">{nombre.length}/60 car.</span>
              </label>
              <input
                id="edit-nombre"
                type="text"
                className="field-input"
                placeholder="Nombre del ejercicio..."
                value={nombre}
                maxLength={60}
                onChange={(e) => {
                  setNombre(e.target.value)
                  if (errorNombre && e.target.value.trim()) setErrorNombre('')
                }}
                style={errorNombre ? { borderColor: 'var(--wine-red)' } : {}}
              />
              {errorNombre && (
                <div className="field-error">
                  <AlertCircleIcon size={16} color="#ff5252" />
                  <span>{errorNombre}</span>
                </div>
              )}
            </div>

            {/* 2. Tipo de Ejercicio */}
            <div className="form-group">
              <label className="field-label">
                <span>Tipo de Ejercicio *</span>
              </label>
              <div className="type-chips-grid">
                {EXERCISE_TYPES.map((type) => {
                  const isActive = tipoEjercicio === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      className={`type-chip ${isActive ? 'active' : ''}`}
                      onClick={() => setTipoEjercicio(type.id)}
                      title={type.description}
                    >
                      <div className="chip-icon">{getTypeIcon(type.id)}</div>
                      <div className="chip-label">{type.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Grupo Muscular */}
            <div className="form-group">
              <label className="field-label">
                <span>Grupo Muscular *</span>
              </label>
              <div className="muscle-grid">
                {MUSCLE_GROUPS.map((group) => {
                  const isActive = grupoMuscular === group.id
                  return (
                    <button
                      key={group.id}
                      type="button"
                      className={`muscle-chip ${isActive ? 'active' : ''}`}
                      onClick={() => setGrupoMuscular(group.id)}
                    >
                      <span>{group.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. Imagen */}
            <div className="form-group">
              <label className="field-label">
                <span>Imagen Ilustrativa</span>
              </label>

              <div
                className={`image-upload-box ${dragActive ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0])
                    }
                  }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ color: 'var(--text-muted)' }}>
                    <UploadIcon size={26} />
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    Arrastra una nueva imagen o elige una opción
                  </p>
                </div>

                <div className="upload-actions">
                  <button
                    type="button"
                    className="btn-sample-image"
                    onClick={() => setImagenUrl('/exercise-example.png')}
                  >
                    <ImageIcon size={16} />
                    Usar de ejemplo
                  </button>

                  <button
                    type="button"
                    className="btn-upload-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadIcon size={16} />
                    Subir desde PC
                  </button>

                  <button
                    type="button"
                    className="btn-upload-secondary"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                  >
                    {showUrlInput ? 'Ocultar URL' : 'Pegar URL'}
                  </button>
                </div>

                {showUrlInput && (
                  <div style={{ marginTop: '0.85rem' }}>
                    <input
                      type="url"
                      className="field-input"
                      placeholder="https://ejemplo.com/imagen.png"
                      value={imagenUrl}
                      onChange={(e) => setImagenUrl(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 5. Observación */}
            <div className="form-group">
              <label className="field-label" htmlFor="edit-observacion">
                <span>Observación</span>
                <span className="hint">{observacion.length}/300 car.</span>
              </label>
              <textarea
                id="edit-observacion"
                className="field-textarea"
                placeholder="Notas de técnica, respiración o postura..."
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                maxLength={300}
              />
            </div>

            {/* Acciones de Edición */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-danger"
                onClick={onCancel}
                title="Descartar cambios y volver"
              >
                Cancelar Edición
              </button>

              <button type="submit" className="btn-primary">
                <CheckIcon size={20} color="#000000" />
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>

        {/* Vista previa en tiempo real de los cambios del ejercicio */}
        <div className="preview-column">
          <ExerciseCardPreview
            nombre={nombre}
            observacion={observacion}
            imagenUrl={imagenUrl}
            grupoMuscular={grupoMuscular}
            tipoEjercicio={tipoEjercicio}
          />

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Acción Destructiva
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                ¿Deseas eliminar este ejercicio?
              </div>
            </div>

            <button
              type="button"
              className="btn-danger-outline"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
              onClick={() => {
                if (window.confirm(`¿Estás seguro de eliminar "${exercise.nombre}"?`)) {
                  onDelete(exercise.id)
                }
              }}
            >
              <TrashIcon size={16} />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

