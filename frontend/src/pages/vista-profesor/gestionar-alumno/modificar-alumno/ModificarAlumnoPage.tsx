import React, { useState } from 'react'
import { FormularioModificarAlumno } from './components/FormularioModificarAlumno'
import { alumnoApi } from './services/alumnoApi'
import { ALUMNO_MOCK } from '../components-comunes/types'
import type { Alumno } from '../components-comunes/types'
import { CheckIcon } from '../components-comunes/Icons'

export const ModificarAlumnoPage: React.FC = () => {
  const [alumno, setAlumno] = useState<Alumno>(ALUMNO_MOCK)
  const [toast, setToast] = useState<string | null>(null)
  const [guardado, setGuardado] = useState(false)

  const mostrarToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const handleGuardar = async (alumnoActualizado: Alumno) => {
    const actualizado = await alumnoApi.actualizar(alumnoActualizado)
    setAlumno(actualizado)
    setGuardado(true)
    mostrarToast(`¡Datos de "${actualizado.nombre} ${actualizado.apellido}" actualizados correctamente!`)
  }

  const handleCancelar = () => {
    setAlumno(ALUMNO_MOCK)
    setGuardado(false)
  }

  return (
    <main style={{ maxWidth: '720px', margin: '2rem auto', padding: '0 1.5rem', width: '100%' }}>
      <FormularioModificarAlumno
        alumno={alumno}
        onGuardar={handleGuardar}
        onCancelar={handleCancelar}
      />

      {/* Panel de confirmación post-guardado */}
      {guardado && (
        <div
          style={{
            marginTop: '1.5rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid rgba(0,255,0,0.3)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              flexShrink: 0,
              backgroundColor: 'rgba(0,255,0,0.15)',
              border: '1px solid var(--neon-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--neon-green)',
            }}
          >
            <CheckIcon size={20} color="var(--neon-green)" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--neon-green)' }}>
              Cambios guardados
            </div>
            <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              {alumno.apellido}, {alumno.nombre} · DNI: {alumno.dni} · {alumno.correo}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
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
              color: '#000',
              flexShrink: 0,
            }}
          >
            <CheckIcon size={16} color="#000" />
          </div>
          <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{toast}</span>
        </div>
      )}
    </main>
  )
}

export default ModificarAlumnoPage
