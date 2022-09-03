import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import Validator from "lib/validator";

async function createValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //
  // Schema de validação
  //
  Validator.schema({
    matricula: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    cpf: Joi.string().required(),
  })

    //
    // Retorna o middleware
    //
    .middleware(request, response, next);
  // return Validator.schema().middleware(request, response, next);
}

export default createValidator;
