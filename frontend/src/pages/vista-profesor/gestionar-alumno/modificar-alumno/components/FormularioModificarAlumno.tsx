import React, { useState } from 'react'
import { OBJETIVOS_ALUMNO } from '../../components-comunes/types'
import type { ObjetivoAlumno, Alumno } from '../../components-comunes/types'
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  TargetIcon,
  CheckIcon,
  SaveIcon,
  RefreshIcon,
} from '../../components-comunes/Icons'

interface FormularioModificarAlumnoProps {
  alumno: Alumno
  onGuardar: (alumnoActualizado: Alumno) => void
  onCancelar: () => void
}

interface Errores {
  nombre?: string
  apellido?: string
  dni?: string
  telefono?: string
  correo?: string
  contrasenia?: string
  objetivos?: string
}

export const FormularioModificarAlumno: React.FC<FormularioModificarAlumnoProps> = ({
  alumno,
  onGuardar,
  onCancelar,
}) => {
  const [nombre, setNombre] = useState(alumno.nombre)
  const [apellido, setApellido] = useState(alumno.apellido)
  const [dni, setDni] = useState(alumno.dni)
  const [telefono, setTelefono] = useState(alumno.telefono)
  const [correo, setCorreo] = useState(alumno.correo)
  const [contrasenia, setContrasenia] = useState(alumno.contrasenia)
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false)
  const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<ObjetivoAlumno[]>(alumno.objetivos)
  const [errores, setErrores] = useState<Errores>({})

  const hayCambios =
    nombre !== alumno.nombre ||
    apellido !== alumno.apellido ||
    dni !== alumno.dni ||
    telefono !== alumno.telefono ||
    correo !== alumno.correo ||
    contrasenia !== alumno.contrasenia ||
    JSON.stringify([...objetivosSeleccionados].sort()) !== JSON.stringify([...alumno.objetivos].sort())

  const toggleObjetivo = (objetivo: ObjetivoAlumno) => {
    setObjetivosSeleccionados((prev) =>
      prev.includes(objetivo) ? prev.filter((o) => o !== objetivo) : [...prev, objetivo]
    )
    if (errores.objetivos) setErrores((p) => ({ ...p, objetivos: undefined }))
  }

  const validar = (): boolean => {
    const nuevosErrores: Errores = {}

    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio'
    if (!apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio'

    if (!dni.trim()) {
      nuevosErrores.dni = 'El DNI es obligatorio'
    } else if (!/^\d{7,8}$/.test(dni.trim())) {
      nuevosErrores.dni = 'El DNI debe tener 7 u 8 dígitos numéricos'
    }

    if (!telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio'
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(telefono.trim())) {
      nuevosErrores.telefono = 'Ingresá un número de teléfono válido'
    }

    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      nuevosErrores.correo = 'Ingresá un correo electrónico válido'
    }

    if (!contrasenia) {
      nuevosErrores.contrasenia = 'La contraseña es obligatoria'
    } else if (contrasenia.length < 6) {
      nuevosErrores.contrasenia = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (objetivosSeleccionados.length === 0) {
      nuevosErrores.objetivos = 'Seleccioná al menos un objetivo'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return

    onGuardar({
      ...alumno,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
      contrasenia,
      objetivos: objetivosSeleccionados,
    })
  }

  const handleRestaurar = () => {
    setNombre(alumno.nombre)
    setApellido(alumno.apellido)
    setDni(alumno.dni)
    setTelefono(alumno.telefono)
    setCorreo(alumno.correo)
    setContrasenia(alumno.contrasenia)
    setObjetivosSeleccionados(alumno.objetivos)
    setErrores({})
  }

  const fieldHasError = (campo: keyof Errores) => !!errores[campo]

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2 className="font-colvetica">Modificar Alumno</h2>
        <p>
          Editá los datos del alumno y guardá los cambios.{' '}
          {hayCambios && (
            <span style={{ color: 'var(--neon-green)', fontWeight: 600 }}>
              · Hay cambios sin guardar
            </span>
          )}
        </p>
      </div>

      {/* Badge identificador */}
      <div className="modificar-alumno-id-badge">
        <span className="modificar-alumno-id-label">ID de alumno</span>
        <span className="modificar-alumno-id-value">#{alumno.id}</span>
        <span className="modificar-alumno-id-fecha">
          Registrado el{' '}
          {new Date(alumno.creadoEn).toLocaleDateString('es-AR', {
            day: '2-digit', month: 'long', year: 'numeric',
          })}
        </span>
      </div>

      {/* ── Datos Personales ── */}
      <div className="registrar-alumno-section-title">Datos Personales</div>

      <div className="registrar-alumno-row">
        <div className="form-group">
          <label className="field-label" htmlFor="ma-nombre"><span>Nombre *</span></label>
          <input id="ma-nombre" type="text" className="field-input" placeholder="Ej: Juan"
            value={nombre} maxLength={50}
            onChange={(e) => { setNombre(e.target.value); if (errores.nombre && e.target.value.trim()) setErrores((p) => ({ ...p, nombre: undefined })) }}
            style={fieldHasError('nombre') ? { borderColor: 'var(--wine-red)' } : {}}
          />
          {errores.nombre && <div className="field-error"><AlertCircleIcon size={15} color="#ff5252" /><span>{errores.nombre}</span></div>}
        </div>

        <div className="form-group">
          <label className="field-label" htmlFor="ma-apellido"><span>Apellido *</span></label>
          <input id="ma-apellido" type="text" className="field-input" placeholder="Ej: Pérez"
            value={apellido} maxLength={50}
            onChange={(e) => { setApellido(e.target.value); if (errores.apellido && e.target.value.trim()) setErrores((p) => ({ ...p, apellido: undefined })) }}
            style={fieldHasError('apellido') ? { borderColor: 'var(--wine-red)' } : {}}
          />
          {errores.apellido && <div className="field-error"><AlertCircleIcon size={15} color="#ff5252" /><span>{errores.apellido}</span></div>}
        </div>
      </div>

      <div className="registrar-alumno-row">
        <div className="form-group">
          <label className="field-label" htmlFor="ma-dni"><span>DNI *</span></label>
          <input id="ma-dni" type="text" inputMode="numeric" className="field-input"
            placeholder="Ej: 40123456" value={dni} maxLength={8}
            onChange={(e) => { setDni(e.target.value.replace(/\D/g, '')); if (errores.dni) setErrores((p) => ({ ...p, dni: undefined })) }}
            style={fieldHasError('dni') ? { borderColor: 'var(--wine-red)' } : {}}
          />
          {errores.dni && <div className="field-error"><AlertCircleIcon size={15} color="#ff5252" /><span>{errores.dni}</span></div>}
        </div>

        <div className="form-group">
          <label className="field-label" htmlFor="ma-telefono"><span>Teléfono *</span></label>
          <input id="ma-telefono" type="tel" className="field-input"
            placeholder="Ej: +54 9 11 1234-5678" value={telefono} maxLength={20}
            onChange={(e) => { setTelefono(e.target.value); if (errores.telefono) setErrores((p) => ({ ...p, telefono: undefined })) }}
            style={fieldHasError('telefono') ? { borderColor: 'var(--wine-red)' } : {}}
          />
          {errores.telefono && <div className="field-error"><AlertCircleIcon size={15} color="#ff5252" /><span>{errores.telefono}</span></div>}
        </div>
      </div>

      {/* ── Credenciales ── */}
      <div className="registrar-alumno-section-title">Credenciales de Acceso</div>

      <div className="form-group">
        <label className="field-label" htmlFor="ma-correo"><span>Correo Electrónico *</span></label>
        <input id="ma-correo" type="email" className="field-input"
          placeholder="Ej: juan.perez@email.com" value={correo} maxLength={100}
          onChange={(e) => { setCorreo(e.target.value); if (errores.correo) setErrores((p) => ({ ...p, correo: undefined })) }}
          style={fieldHasError('correo') ? { borderColor: 'var(--wine-red)' } : {}}
        />
        {errores.correo && <div className="field-error"><AlertCircleIcon size={15} color="#ff5252" /><span>{errores.correo}</span></div>}
      </div>

      <div className="form-group">
        <label className="field-label" htmlFor="ma-contrasenia">
          <span>Contraseña de Acceso *</span>
          <span className="hint">Mínimo 6 caracteres</span>
        </label>
        <div className="registrar-alumno-password-wrapper">
          <input id="ma-contrasenia"
            type={mostrarContrasenia ? 'text' : 'password'}
            className="field-input" placeholder="Contraseña para el alumno"
            value={contrasenia} maxLength={64}
            onChange={(e) => { setContrasenia(e.target.value); if (errores.contrasenia) setErrores((p) => ({ ...p, contrasenia: undefined })) }}
            style={fieldHasError('contrasenia') ? { borderColor: 'var(--wine-red)' } : {}}
          />
          <button type="button" className="registrar-alumno-toggle-pass"
            onClick={() => setMostrarContrasenia((v) => !v)}
            title={mostrarContrasenia ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {mostrarContrasenia ? <EyeOffIcon size={18} color="var(--text-muted)" /> : <EyeIcon size={18} color="var(--text-muted)" />}
          </button>
        </div>
        {errores.contrasenia && <div className="field-error"><AlertCircleIcon size={15} color="#ff5252" /><span>{errores.contrasenia}</span></div>}
      </div>

      {/* ── Objetivos ── */}
      <div className="registrar-alumno-section-title">
        <TargetIcon size={16} color="var(--neon-green)" />
        Objetivos del Alumno *
      </div>
      <p className="registrar-alumno-section-hint">Modificá los objetivos según la evolución del alumno.</p>

      <div className="form-group">
        <div className="registrar-alumno-objetivos-grid">
          {OBJETIVOS_ALUMNO.map((objetivo) => {
            const activo = objetivosSeleccionados.includes(objetivo)
            return (
              <button key={objetivo} type="button"
                className={`registrar-alumno-objetivo-chip ${activo ? 'active' : ''}`}
                onClick={() => toggleObjetivo(objetivo)}
              >
                <span className="registrar-alumno-objetivo-check">
                  {activo && <CheckIcon size={12} color="#000" />}
                </span>
                <span>{objetivo}</span>
              </button>
            )
          })}
        </div>
        {errores.objetivos && (
          <div className="field-error" style={{ marginTop: '0.5rem' }}>
            <AlertCircleIcon size={15} color="#ff5252" /><span>{errores.objetivos}</span>
          </div>
        )}
        {objetivosSeleccionados.length > 0 && (
          <p className="registrar-alumno-objetivos-counter">
            {objetivosSeleccionados.length} objetivo{objetivosSeleccionados.length > 1 ? 's' : ''} seleccionado{objetivosSeleccionados.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-danger" onClick={onCancelar}>Cancelar</button>
        <button type="button" className="btn-secondary" onClick={handleRestaurar} disabled={!hayCambios} title="Restaurar valores originales">
          <RefreshIcon size={17} />Restaurar
        </button>
        <button type="submit" className="btn-primary" disabled={!hayCambios}>
          <SaveIcon size={18} color="#000000" />Guardar Cambios
        </button>
      </div>
    </form>
  )
}
