import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import messages from "./messages";
import { ValidatorSchema, ValidatorData } from "./types";

export default class Validator {
  /**
   * Armazena o construtor
   */
  _schema?: ValidatorSchema;

  /**
   * Armazena os dados que serão validados
   */
  _data?: ValidatorData;

  /**
   * Constructor
   *
   * @param schema
   * @returns
   */
  constructor(schema: Joi.PartialSchemaMap) {
    this._setSchema(schema);
    return this;
  }

  /**
   * Define o schema a ser validado
   *
   * @example
   * Validator.schema((v)=>({
   *    name: v.string().required(),
   * }))
   *
   * @param fn
   * @returns
   */
  static schema(fn: Function) {
    const schema = fn(Joi);

    const obj = new Validator(schema);

    return (request: Request, response: Response, next: NextFunction) =>
      obj.middleware(request, response, next);
  }

  /**
   * Verifica se o schema atual é válido
   *
   * @returns
   */
  async isValid() {
    try {
      await this._schema?.validateAsync(this._data);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Valida o schema atual e retorna os erros caso não seja válido
   * @returns
   */
  async validate() {
    try {
      return await this._schema?.validateAsync(this._data, {
        abortEarly: false,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Aplica um schema de validação no objeto atual
   *
   * @param schema
   * @returns
   */
  _setSchema(schema: Joi.PartialSchemaMap) {
    this._schema = Joi
      // Inclui o objeto do esquema
      .object(schema)
      // Inclui as mensagens padronizadas
      .messages(messages);

    // Retorna o objeto para continuar o encadeamento
    return this;
  }

  /**
   * Aplica um middleware de validação em uma rota
   *
   * @param request
   * @param response
   * @param next
   * @returns
   */
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
