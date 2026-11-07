export abstract class Entity<TId = number> {
  protected readonly _id: TId;

  constructor(id: TId) {
    this._id = id;
  }

  get id(): TId {
    return this._id;
  }

  equals(other?: Entity<TId>): boolean {
    if (!other || !(other instanceof Entity)) {
      return false;
    }
    return this._id === other._id;
  }
}
