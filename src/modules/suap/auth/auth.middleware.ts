import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import Output from "lib/output";

import User from "models/user";

import userRepository from "../user/user.repository";

type parsedToken = { matricula: number; iat: number; exp: number };

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const [type = null, token = null] =
      request.header("Authorization")?.split(" ") || [];

    if (!token)
      throw {
        code: 401,
        message: "Token não informado",
      };

    const parsedToken = jwt.verify(
      token,
      process.env.APP_KEY || ""
    ) as parsedToken;

    if (parsedToken) {
      request.user = await userRepository.first(parsedToken.matricula);
      return next();
    }

    throw {
      code: 401,
      message: "Usuário não autenticado",
    };
  } catch (error) {
    return Output.exception(error);
  }
}

export default authMiddleware;
