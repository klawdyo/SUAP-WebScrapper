import { ValidatorSchema, ValidatorData } from "./types";

export default class Validator {
  static schema?: ValidatorSchema;
  static data?: ValidatorData;

  static setSchema(schema: ValidatorSchema) {
    this.schema = schema;
    return this;
  }

  static setData(data: ValidatorData) {
    this.data = data;
    return this;
  }

  static async isValid() {
    try {
      await this.schema?.validateAsync(this.data);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async validate() {
    try {
      return await this.schema?.validateAsync(this.data, {
        abortEarly: false,
      });
    } catch (error) {
      throw error;
    }
  }
}
