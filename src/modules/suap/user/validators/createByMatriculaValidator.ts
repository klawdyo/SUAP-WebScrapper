import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import Validator from "lib/validator";

async function createByMatriculaValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  Validator.schema({
    matricula: Joi.string().required(),
  }).middleware(request, response, next);
}

export default createByMatriculaValidator;
