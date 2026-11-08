import React, { useState, useRef } from 'react'
import type {
  Exercise,
  ExerciseType,
  MuscleGroup,
} from '../../../../../types/exercise'
import {
  EXERCISE_TYPES,
  MUSCLE_GROUPS,
} from '../../../../../types/exercise'
import {
  DumbbellIcon,
  HeartPulseIcon,
  FlameIcon,
  ShieldZapIcon,
  ActivityIcon,
  UploadIcon,
  ImageIcon,
  PlusIcon,
  AlertCircleIcon,
  TrashIcon,
} from '../../components/Icons'

interface ExerciseFormProps {
  onSaveExercise: (exercise: Exercise) => void
  currentValues: {
    nombre: string
    observacion: string
    imagenUrl: string
    grupoMuscular: MuscleGroup
    tipoEjercicio: ExerciseType
  }
  onFormChange: (field: string, value: string) => void
  onReset: () => void
}

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
  onSaveExercise,
  currentValues,
  onFormChange,
  onReset,
}) => {
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
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG, WebP).')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        onFormChange('imagenUrl', result)
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

    if (!currentValues.nombre.trim()) {
      setErrorNombre('El nombre del ejercicio es obligatorio')
      return
    }
    setErrorNombre('')

    const newExercise: Exercise = {
      id: Date.now().toString(),
      nombre: currentValues.nombre.trim(),
      observacion: currentValues.observacion.trim(),
      imagenUrl: currentValues.imagenUrl.trim() || '/exercise-example.png',
      grupoMuscular: currentValues.grupoMuscular,
      tipoEjercicio: currentValues.tipoEjercicio,
      createdAt: new Date().toISOString(),
    }

    onSaveExercise(newExercise)
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="font-colvetica">Registrar Ejercicio</h2>
        <p>Completa la información técnica, categoriza y carga una imagen del ejercicio.</p>
      </div>

      {/* 1. Nombre del Ejercicio */}
      <div className="form-group">
        <label className="field-label" htmlFor="nombre">
          <span>Nombre del ejercicio *</span>
        </label>
        <input
          id="nombre"
          type="text"
          className="field-input"
          placeholder="Ej: Sentadilla con barra, Dominadas, Press militar..."
          value={currentValues.nombre}
          maxLength={60}
          onChange={(e) => {
            onFormChange('nombre', e.target.value)
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

      {/* 2. Tipo de Ejercicio (Core, Fuerza, Cardio, Calentamiento, Estiramiento) */}
      <div className="form-group">
        <label className="field-label">
          <span>Tipo de Ejercicio *</span>
        </label>
        <div className="type-chips-grid">
          {EXERCISE_TYPES.map((type) => {
            const isActive = currentValues.tipoEjercicio === type.id
            return (
              <button
                key={type.id}
                type="button"
                className={`type-chip ${isActive ? 'active' : ''}`}
                onClick={() => onFormChange('tipoEjercicio', type.id)}
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
            const isActive = currentValues.grupoMuscular === group.id
            return (
              <button
                key={group.id}
                type="button"
                className={`muscle-chip ${isActive ? 'active' : ''}`}
                onClick={() => onFormChange('grupoMuscular', group.id)}
              >
                <span>{group.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Carga de Imagen con opción de usar la de ejemplo */}
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
              <UploadIcon size={28} />
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
              Arrastra una imagen aquí o elija una opción abajo
            </p>
          </div>

          <div className="upload-actions">
            {/* Botón para usar la imagen de ejemplo subida por el usuario */}
            <button
              type="button"
              className="btn-sample-image"
              onClick={() => onFormChange('imagenUrl', '/exercise-example.png')}
              title="Cargar la imagen de sentadilla de ejemplo"
            >
              <ImageIcon size={16} />
              Usar imagen de ejemplo
            </button>

            {/* Subir desde computadora */}
            <button
              type="button"
              className="btn-upload-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon size={16} />
              Subir desde PC
            </button>

            {/* Alternar URL manual */}
            <button
              type="button"
              className="btn-upload-secondary"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              {showUrlInput ? 'Ocultar URL' : 'Pegar enlace URL'}
            </button>

            {/* Limpiar imagen */}
            {currentValues.imagenUrl && (
              <button
                type="button"
                className="btn-upload-secondary"
                style={{ color: '#ff6b6b', borderColor: 'var(--wine-red)' }}
                onClick={() => onFormChange('imagenUrl', '')}
              >
                <TrashIcon size={16} />
                Quitar
              </button>
            )}
          </div>

          {showUrlInput && (
            <div style={{ marginTop: '0.85rem' }}>
              <input
                type="url"
                className="field-input"
                placeholder="https://ejemplo.com/imagen.png"
                value={currentValues.imagenUrl}
                onChange={(e) => onFormChange('imagenUrl', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 5. Observación */}
      <div className="form-group">
        <label className="field-label" htmlFor="observacion">
          <span>Observación</span>
        </label>
        <textarea
          id="observacion"
          className="field-textarea"
          placeholder="Ej: Mantener el pecho alto, mirada al frente y descender flexionando caderas y rodillas. Espirar al subir."
          value={currentValues.observacion}
          onChange={(e) => onFormChange('observacion', e.target.value)}
          maxLength={300}
        />
      </div>

      {/* Botones de Acción */}
      <div className="form-actions">
        <button type="button" className="btn-danger" onClick={onReset}>
          Cancelar / Limpiar
        </button>
        <button type="submit" className="btn-primary">
          <PlusIcon size={20} color="#000000" />
          Registrar Ejercicio
        </button>
      </div>
    </form>
  )
}
