/**
 * Base de todas las entidades del dominio.
 *
 * - Una entidad se define por su IDENTIDAD, no por sus atributos:
 *   dos entidades son la misma si tienen el mismo `id`, aunque cambien
 *   todos sus demás valores.
 * - No tiene lógica de negocio propia: cada entidad concreta la agrega.
 * - No conoce NestJS, TypeORM ni HTTP.
 */
export abstract class Entity<TId = string> {
  protected readonly _id: TId;

  protected constructor(id: TId) {
    this._id = id;
  }

  getId(): TId {
    return this._id;
  }

  /**
   * Igualdad por identidad. Compara solo el `id`, no los atributos.
   * Devuelve `false` si el otro valor es `null`, `undefined` o no es Entity.
   */
  equals(otra?: Entity<TId> | null): boolean {
    if (otra === null || otra === undefined) {
      return false;
    }
    if (this === otra) {
      return true;
    }
    if (!(otra instanceof Entity)) {
      return false;
    }
    return this._id === otra._id;
  }
}