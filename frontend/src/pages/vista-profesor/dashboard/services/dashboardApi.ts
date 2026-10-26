import type { AlumnoData } from '../components/alumnosCard'

export const dashboardApi = {
  getAlumnos: async (): Promise<AlumnoData[]> => {
    // Simulación de llamada al endpoint NestJS GET /alumnos
    return [
      {
        id: '1',
        nombre: 'Mateo',
        apellido: 'Zandrino',
        dni: '40123456',
        objetivo: 'Mejorar composición corporal',
        planActivo: true,
        nombrePlan: 'Plan N° 1',
        fechaFinPlan: '07/11/2026',
      },
      {
        id: '2',
        nombre: 'Lucía',
        apellido: 'Fernández',
        dni: '38987654',
        objetivo: 'Aumento de fuerza',
        planActivo: false,
      },
      {
        id: '3',
        nombre: 'Tomas',
        apellido: 'Mura',
        dni: '41223344',
        objetivo: 'Mejora de condición física',
        planActivo: true,
        nombrePlan: 'Plan N° 3',
        fechaFinPlan: '15/11/2026',
      },
    ]
  },
}