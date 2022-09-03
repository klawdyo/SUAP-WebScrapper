import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import Output from "lib/output";

import userRepository from "../user/user.repository";
import authRepository from "../auth/auth.repository";
import { parsedToken } from "data/types/parsedToken";

/**
 * authMiddleware
 * Função usada para verificar se a autenticação jwt é válida
 * - Verifica se existe o cabeçalho Authorization na requisição
 * - Verifica se há um token no cabeçalho
 * - Verifica se a matrícula existente no token possui um cookie válido
 *   salvo no banco de dados
 * - Descriptografa o token jwt e verifica se está expirado ou criptografado
 *   erroneamente, o que pode significar que foi fraudado
 *
 *
 */
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

    const _parsedToken = jwt.verify(
      token,
      process.env.APP_KEY || ""
    ) as parsedToken;

    // Se existir token
    const savedToken = await authRepository.first(null, _parsedToken.matricula);

    // Se não tem token salvo no banco de dados
    if (!savedToken)
      throw {
        code: 401,
        message: "Usuário não autenticado",
      };

    //
    const user = await userRepository.first(_parsedToken.matricula);

    if (_parsedToken) {
      request.user = user;
      return next();
    }

    // Se o token não foi corretamente descriptografado é possível que
    // esteja fraudado
    throw {
      code: 401,
      message: "Usuário não autenticado",
    };
  } catch (error) {
    console.log("Catch authMiddleware", error);

    const out = new Output(response);
    return out.exception(error);
  }
}

export default authMiddleware;
