// src/pages/vista-profesor/gestionar-rutinas/services/planEntrenamientoApi.ts

export const planEntrenamientoApi = {
  async crearPlan(dto: any): Promise<any> {
    console.log('Simulando creación de plan con datos:', dto);
    // Mock exitoso para el prototipo
    return Promise.resolve({ success: true, message: 'Plan creado con éxito (Mock)' });
  },

  async obtenerPlanActivo(alumnoId: string): Promise<any> {
    console.log('Simulando consulta de plan activo para alumno:', alumnoId);
    return Promise.resolve({
      id: 'plan-01',
      nombre: 'Plan de Fuerza e Hipertrofia',
      rutinas: [1, 2, 3],
    });
  }
};