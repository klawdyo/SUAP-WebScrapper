import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import messages from "./messages";
import { ValidatorSchema, ValidatorData } from "./types";

export default class Validator {
  _schema?: ValidatorSchema;
  _data?: ValidatorData;

  constructor(schema: Joi.PartialSchemaMap) {
    this.setSchema(schema);
    return this;
  }

  static schema(fn: Function) {
    const schema = fn(Joi);

    const obj = new Validator(schema);

    return (request: Request, response: Response, next: NextFunction) =>
      obj.middleware(request, response, next);
  }

  async isValid() {
    try {
      await this._schema?.validateAsync(this._data);
      return true;
    } catch (error) {
      return false;
    }
  }

  async validate() {
    try {
      return await this._schema?.validateAsync(this._data, {
        abortEarly: false,
      });
    } catch (error) {
      throw error;
    }
  }

  setSchema(schema: Joi.PartialSchemaMap) {
    this._schema = Joi
      // Inclui o objeto do esquema
      .object(schema)
      // Inclui as mensagens padronizadas
      .messages(messages);

    // Retorna o objeto para continuar o encadeamento
    return this;
  }

  async middleware(request: Request, response: Response, next: NextFunction) {
    try {
      this._data = request.body;

      //
      if (!this._schema)
        throw { code: 500, message: "Esquema de validação não definido" };

      const body = await this.validate();
      request.body = body;
      return next();
    } catch (error) {
      console.log("erro no middleware", error);
      return response.exception(error);
    }
  }
}
