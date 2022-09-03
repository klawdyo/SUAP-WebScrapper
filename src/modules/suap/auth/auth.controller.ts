import { Request, Response } from "express";
import User from "data/models/user";

import userRepository from "../user/user.repository";
import authRepository from "./auth.repository";

import login from "./lib/login";

export default class AuthController {
  /**
   * Realiza login
   *
   * Method: POST
   * URL: /suap/auth/login
   * Body: {
   *  matricula: integer
   * }
   */
  static async login(request: Request, response: Response) {
    try {
      const { matricula, password } = request.body;

      const result = await login(matricula, password);

      //
      return response.success(result, "Login realizado com sucesso");
    } catch (error) {
      return response.exception(error);
    }
  }
  /**
   * Efetua logout
   *
   * Method: POST
   * URL: /suap/auth/logout
   */
  static async logout(request: Request, response: Response) {
    try {
      const result = await authRepository.delete(null, request.user as User);

      //
      return response.success(result, "Logout realizado com sucesso");
    } catch (error) {
      return response.exception(error);
    }
  }

  /**
   * Pega os dados do perfil do usuário
   *
   * Method: GET
   * URL: /suap/auth/profile
   */
  static async profile(request: Request, response: Response) {
    try {
      return response.success(request.user);
    } catch (error) {
      return response.exception(error);
    }
  }

  /**
   * Verifica se o usuário está logado
   *
   * Method: POST
   * URL: /suap/auth/logged
   * Body: {
   *  matricula: integer
   * }
   */
  static async logged(request: Request, response: Response) {
    try {
      // Se a matrícula foi informada
      const matricula = request.body?.matricula;
      if (!matricula)
        throw {
          code: 403,
          message: "Matrícula não informada",
        };

      // Se o usuário foi encontrado no banco de dados
      const user = await userRepository.first(matricula);
      if (!user)
        throw {
          code: 404,
          message: "Matrícula não encontrada",
        };

      // Verifica se o usuário enconrado possui um token salvo e válido
      const isLogged = await authRepository.isLogged(user);

      // Retorna
      return response.success({ is_logged: isLogged });
    } catch (error) {
      return response.exception(error);
    }
  }
}
