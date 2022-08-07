import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export declare type ValidatorSchema = Joi.ObjectSchema<any>;
export declare type ValidatorData = Joi.SchemaLike | Joi.SchemaLike[];
export declare type ValidatorResult = {
  error: boolean;
  data: Record<string, any>;
};
export declare type MiddlewareType = {
  request: Request;
  response: Response;
  next: NextFunction;
};
