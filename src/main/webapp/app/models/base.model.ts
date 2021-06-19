export class BaseModel {
  public constructor(init?: Partial<BaseModel>) {
    Object.assign(this, init);
  }

  /**
   * Remove prefixes for private properties while returning whole object
   * @param init
   */
  static toApiInstance(init?: Partial<BaseModel>) {
    const model = new BaseModel(init);
    const result = {};
    for (const key in model) {
      if (Object.prototype.hasOwnProperty.call(model, key)) {
        result[key.replace('_', '')] = model[key];
      }
    }
    return result;
  }
}
