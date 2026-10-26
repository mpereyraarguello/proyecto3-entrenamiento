import { useState, useEffect } from 'react'
import type { Exercise, ExerciseType, MuscleGroup } from './types/exercise'
import { ExerciseForm } from './pages/vista-profesor/gestionar-ejercicio/crear-ejercicio/components/ExerciseForm'
import { ExerciseEdit } from './pages/vista-profesor/gestionar-ejercicio/editar-ejercicio/components/ExerciseEdit'
import { ExerciseCardPreview } from './pages/vista-profesor/gestionar-ejercicio/crear-ejercicio/components/ExerciseCardPreview'
import { ExerciseList } from './pages/vista-profesor/gestionar-ejercicio/components/ExerciseList'
import { ExerciseSearch } from './pages/vista-profesor/gestionar-ejercicio/consultar-ejercicio/components/ExerciseSearch'
import { DashboardProfesorPage } from './pages/vista-profesor/dashboard/dashboardProfesor'
import { CrearPlanEntrenamientoPage } from './pages/vista-profesor/gestionar-plan-entrenamiento/crear-plan-entrenamiento/CrearPlanEntrenamientoPage'
import { CheckIcon, DumbbellIcon, PlusIcon, SearchIcon, EditIcon } from './pages/vista-profesor/gestionar-ejercicio/components/Icons'
import { INITIAL_EXERCISES } from './data/initialExercises'

export function App() {
  // Pestaña activa: 'consulta' | 'registro' | 'edicion'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'consulta' | 'registro' | 'edicion'| 'crear-plan'>('dashboard')
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)

  // Estado de ejercicios persistido en localStorage con iniciales ricos para consultas
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    try {
      const saved = localStorage.getItem('gym_exercises_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_EXERCISES
  })

  // Estado del formulario de registro nuevo (separado completamente de la edición)
  const [formData, setFormData] = useState({
    nombre: '',
    observacion: '',
    imagenUrl: '/exercise-example.png',
    grupoMuscular: 'Tren Inferior' as MuscleGroup,
    tipoEjercicio: 'fuerza' as ExerciseType,
  })

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem('gym_exercises_data', JSON.stringify(exercises))
    } catch (e) {
      console.error('Error saving exercises:', e)
    }
  }, [exercises])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Guardar un NUEVO ejercicio
  const handleSaveExercise = (newExercise: Exercise) => {
    setExercises((prev) => [newExercise, ...prev])
    showToast(`¡Ejercicio "${newExercise.nombre}" registrado exitosamente!`)
    handleResetRegisterForm()
    setActiveTab('consulta')
  }

  // Actualizar un ejercicio EXISTENTE (Separado de registrar)
  const handleUpdateExercise = (updatedExercise: Exercise) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === updatedExercise.id ? updatedExercise : ex))
    )
    showToast(`¡Ejercicio "${updatedExercise.nombre}" actualizado con éxito!`)
    setEditingExercise(null)
    setActiveTab('consulta')
  }

  // Iniciar flujo de edición separado
  const handleStartEdit = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setActiveTab('edicion')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cancelar flujo de edición
  const handleCancelEdit = () => {
    setEditingExercise(null)
    setActiveTab('consulta')
  }

  const handleDeleteExercise = (id: string) => {
    const toDelete = exercises.find((e) => e.id === id)
    setExercises((prev) => prev.filter((e) => e.id !== id))
    if (editingExercise?.id === id) {
      setEditingExercise(null)
      setActiveTab('consulta')
    }
    if (toDelete) {
      showToast(`Ejercicio "${toDelete.nombre}" eliminado.`)
    }
  }

  const handleResetRegisterForm = () => {
    setFormData({
      nombre: '',
      observacion: '',
      imagenUrl: '/exercise-example.png',
      grupoMuscular: 'Tren Inferior',
      tipoEjercicio: 'fuerza',
    })
  }

  const handleNavigateToRegister = (initialName?: string) => {
    if (initialName && initialName.trim()) {
      setFormData((prev) => ({
        ...prev,
        nombre: initialName.trim(),
      }))
    }
    setEditingExercise(null)
    setActiveTab('registro')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Paleta oficial de colores para mostrar en la barra superior
  const colorPalette = [
    { hex: '#121212', label: 'Fondo' },
    { hex: '#1E1E1E', label: 'Gris Oscuro' },
    { hex: '#00FF00', label: 'Verde Neón' },
    { hex: '#FFFFFF', label: 'Blanco' },
    { hex: '#6E8B7E', label: 'Gris Verdoso' },
    { hex: '#8B0000', label: 'Rojo Bordó' },
  ]

  return (
    <div className="app-container">
      {/* Barra de Navegación / Encabezado */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <span className="brand-badge">Grupo 12</span>
            <h1 className="brand-title font-colvetica">
              Tejo <span>gym</span>
            </h1>
          </div>

          {/* Pestañas de navegación entre Registro, Consulta y Edición */}
          <nav className="header-nav">
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>

            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'consulta' ? 'active' : ''}`}
              onClick={() => setActiveTab('consulta')}
            >
              <SearchIcon size={18} />
              Consultar Ejercicios
            </button>

            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'registro' ? 'active' : ''}`}
              onClick={() => {
                setEditingExercise(null)
                setActiveTab('registro')
              }}
            >
              <PlusIcon size={18} />
              Registrar Ejercicio
            </button>

            {editingExercise && (
              <button
                type="button"
                className={`nav-tab-btn ${activeTab === 'edicion' ? 'active' : ''}`}
                onClick={() => setActiveTab('edicion')}
                style={{
                  borderColor: 'var(--neon-green)',
                }}
              >
                <EditIcon size={16} />
                Editar ({editingExercise.nombre.slice(0, 15)}...)
              </button>
            )}
          </nav>
        </div>
      </header>

      {activeTab === 'dashboard' && (
        <DashboardProfesorPage
          onNavigateToRegister={() => handleNavigateToRegister()}
          onNavigateToConsulta={() => setActiveTab('consulta')}
          onNavigateToCrearPlan={() => setActiveTab('crear-plan')}
        />
      )}
      {activeTab === 'crear-plan' && (
        <CrearPlanEntrenamientoPage />
      )}

      {/* VISTA 1: CONSULTA Y BÚSQUEDA DE EJERCICIOS */}
      {activeTab === 'consulta' && (
        <ExerciseSearch
          exercises={exercises}
          onDeleteExercise={handleDeleteExercise}
          onSelectForEdit={handleStartEdit}
          onNavigateToRegister={handleNavigateToRegister}
        />
      )}

      {/* VISTA 2: PANTALLA EXCLUSIVA DE EDICIÓN (SEPARADA DE REGISTRAR) */}
      {activeTab === 'edicion' && editingExercise && (
        <ExerciseEdit
          exercise={editingExercise}
          onUpdateExercise={handleUpdateExercise}
          onCancel={handleCancelEdit}
          onDelete={handleDeleteExercise}
        />
      )}

      {/* VISTA 3: REGISTRO DE NUEVOS EJERCICIOS */}
      {activeTab === 'registro' && (
        <>
          <main className="main-layout">
            <div className="form-column">
              <ExerciseForm
                currentValues={formData}
                onFormChange={handleFormChange}
                onSaveExercise={handleSaveExercise}
                onReset={handleResetRegisterForm}
              />
            </div>

            <div className="preview-column">
              <ExerciseCardPreview
                nombre={formData.nombre}
                observacion={formData.observacion}
                imagenUrl={formData.imagenUrl}
                grupoMuscular={formData.grupoMuscular}
                tipoEjercicio={formData.tipoEjercicio}
              />

              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '10px',
                    background: 'rgba(0, 255, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--neon-green)',
                    flexShrink: 0,
                  }}
                >
                  <DumbbellIcon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Total de Ejercicios
                  </div>
                  <div className="font-colvetica" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                    {exercises.length} <span style={{ fontSize: '0.9rem', color: 'var(--neon-green)' }}>registrados</span>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Catálogo rápido de ejercicios en la vista de registro */}
          <ExerciseList
            exercises={exercises}
            onDeleteExercise={handleDeleteExercise}
            onSelectForEdit={handleStartEdit}
          />
        </>
      )}

      {/* Notificación Toast Flotante */}
      {toastMessage && (
        <div className="toast-notification">
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--neon-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
            }}
          >
            <CheckIcon size={16} />
          </div>
          <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default App
