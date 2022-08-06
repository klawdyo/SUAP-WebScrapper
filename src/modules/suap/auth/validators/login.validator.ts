import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ValidatorSchema } from "lib/validator/types";
import ValidatorMiddleware from "lib/validator/validator.middleware";

async function loginValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //
  // Schema de validação
  //
  const schema: ValidatorSchema = Joi.object({
    matricula: Joi.number().required(),
    password: Joi.string().min(8).required(),
  });

  //
  // Retorna o middleware
  //
  return new ValidatorMiddleware(schema).middleware(request, response, next);
}

export default loginValidator;
