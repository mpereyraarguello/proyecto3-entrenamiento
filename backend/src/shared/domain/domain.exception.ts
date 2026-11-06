/**
 * Base de todas las excepciones de negocio del sistema.
 *
 * - Toda excepción de dominio (por ejemplo: `PlanConRutinasInvalidasException`)
 *   debe heredar de esta clase.
 * - El filtro HTTP (`shared/infrastructure/http/domain-exception.filter.ts`)
 *   la captura y la traduce a 400/404/409 según corresponda.
 * - NO debe extender de `HttpException` de Nest: el dominio no conoce HTTP.
 */
export abstract class DomainException extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = new.target.name;
    // Necesario para que `instanceof DomainException` funcione al transpilar a ES5/ES2015.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}