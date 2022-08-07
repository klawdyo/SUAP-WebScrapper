import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import messages from "./messages";
import { ValidatorSchema, ValidatorData } from "./types";

export default class Validator {
  static _schema?: ValidatorSchema;
  static data?: ValidatorData;

  static setSchema(schema: ValidatorSchema) {
    this._schema = schema;
    return this;
  }

  static setData(data: ValidatorData) {
    this.data = data;
    return this;
  }

  static async isValid() {
    try {
      await this._schema?.validateAsync(this.data);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async validate() {
    try {
      return await this._schema?.validateAsync(this.data, {
        abortEarly: false,
      });
    } catch (error) {
      throw error;
    }
  }

  // static _schema?: ValidatorSchema;

  // constructor(schema: ValidatorSchema) {
  //   this._schema = schema;
  // }

  static meupau(schema: Joi.PartialSchemaMap) {
    Joi.preferences({
      messages: {
        "number.required": "preeencha",
        number: "recea",
        "number.base": "recebaa",
      },
    });

    return Joi.object(schema);
  }

  static schema(schema: Joi.PartialSchemaMap) {
    this._schema = Joi
      // Inclui o objeto do esquema
      .object(schema)
      // Inclui as mensagens padronizadas
      .messages(messages);

    // Retorna o objeto para continuar o encadeamento
    return this;
  }

  static async middleware(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      Validator.setData(request.body);

      if (!this._schema)
        throw { code: 500, message: "Esquema de validação não definido" };

      Validator.setSchema(this._schema);

      const body = await Validator.validate();
      request.body = body;

      return next();
    } catch (error) {
      console.log("erro no middleware", error);
      return response.exception(error);
    }
  }
}
