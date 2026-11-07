import React, { useState } from 'react'
import { FormularioCrearAlumno } from './components/FormularioCrearAlumno'
import { alumnoApi } from './services/alumnoApi'
import type { Alumno } from '../components-comunes/types'
import { CheckIcon } from '../components-comunes/Icons'

export const CrearAlumnoPage: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const mostrarToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const handleRegistrar = async (datos: Omit<Alumno, 'id' | 'creadoEn'>) => {
    const nuevoAlumno = await alumnoApi.crear(datos)
    setAlumnos((prev) => [nuevoAlumno, ...prev])
    mostrarToast(`¡Alumno "${datos.nombre} ${datos.apellido}" registrado exitosamente!`)
  }

  const handleCancelar = () => setAlumnos([])

  return (
    <main style={{ maxWidth: '720px', margin: '2rem auto', padding: '0 1.5rem', width: '100%' }}>
      <FormularioCrearAlumno onRegistrar={handleRegistrar} onCancelar={handleCancelar} />

      {/* Lista de alumnos registrados en esta sesión */}
      {alumnos.length > 0 && (
        <div style={{
          marginTop: '2rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '1.5rem',
        }}>
          <h3 className="font-colvetica" style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Alumnos Registrados{' '}
            <span style={{ fontSize: '0.9rem', color: 'var(--neon-green)', background: 'rgba(0,255,0,0.1)', padding: '0.1rem 0.5rem', borderRadius: '6px' }}>
              {alumnos.length}
            </span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alumnos.map((a) => (
              <div key={a.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: 'var(--bg-surface-input)', border: '1px solid var(--border-subtle)',
                borderRadius: '10px', padding: '0.85rem 1rem', flexWrap: 'wrap', gap: '0.5rem',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.98rem' }}>{a.apellido}, {a.nombre}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>DNI: {a.dni} · {a.correo}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {a.objetivos.map((obj) => (
                    <span key={obj} style={{
                      fontSize: '0.74rem', background: 'rgba(0,255,0,0.1)', color: 'var(--neon-green)',
                      border: '1px solid rgba(0,255,0,0.3)', borderRadius: '6px',
                      padding: '0.15rem 0.5rem', fontWeight: 600,
                    }}>
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="toast-notification">
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%',
            backgroundColor: 'var(--neon-green)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#000', flexShrink: 0,
          }}>
            <CheckIcon size={16} color="#000" />
          </div>
          <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{toast}</span>
        </div>
      )}
    </main>
  )
}

export default CrearAlumnoPage

