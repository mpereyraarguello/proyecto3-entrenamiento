import { DomainException } from '../domain.exception';

/**
 * Excepción genérica para violaciones de reglas de negocio que
 * no ameritan una excepción con nombre propio.
 *
 * Preferir SIEMPRE una excepción específica cuando el caso tenga
 * un nombre de negocio claro (ej: `PlanConRutinasInvalidasException`).
 * Usar esta solo para validaciones de VO o casos muy locales.
 */
export class ValidacionDeNegocioException extends DomainException {
  constructor(mensaje: string) {
    super(mensaje);
  }
}