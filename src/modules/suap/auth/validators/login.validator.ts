import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import Validator from "lib/validator";

async function loginValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //
  // Schema de validação
  //
  Validator.schema({
    matricula: Joi.number().required(),
    password: Joi.string().min(8).required().label("Senha"),
  })

    //
    // Retorna o middleware
    //
    .middleware(request, response, next);
  // return Validator.schema().middleware(request, response, next);
}

export default loginValidator;
