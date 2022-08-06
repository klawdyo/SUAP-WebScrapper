import { NextFunction, Request, Response } from "express";
import Validator from ".";
import { ValidatorSchema } from "./types";

export default class ValidatorMiddleware {
  schema?: ValidatorSchema;

  constructor(schema: ValidatorSchema) {
    this.schema = schema;
  }

  async middleware(request: Request, response: Response, next: NextFunction) {
    try {
      Validator.setData(request.body);

      if (!this.schema)
        throw { code: 500, message: "Esquema de validação não definido" };

      Validator.setSchema(this.schema);

      const body = await Validator.validate();
      request.body = body;

      return next();
    } catch (error) {
      console.log("erro no middleware", error);
      return response.exception(error);
    }
  }
}
