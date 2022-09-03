import { Request, Response } from "express";

import User from "data/models/user";

import authRepository from "../auth/auth.repository";
import userRepository from "./user.repository";

import createByMatricula from "./lib/createByMatricula";

export default class UserController {
  /**
   * Lista todos os usuários salvos no banco de dados
   *
   *
   */
  static async all(request: Request, response: Response) {
    try {
      const user = await userRepository.all();
      return response.success(user);
    } catch (error) {}
  }

  /**
   * Cria um usuário no sistema passando seus dados
   *
   * Method: POST
   * URL: /suap/users
   * Body: {
   *    matricula: number
   *    email:     string
   *    name:      string
   *    image:     string - URL completa da imagem
   * }
   *
   */
  static async create(request: Request, response: Response) {
    try {
      const payload = new User(request.body);

      const user = await userRepository.save(payload);

      return response.success(user);
    } catch (error: Error | any) {
      return response.exception(error);
    }
  }

  /**
   * Cria um usuário passando a matrícula
   *
   * URL: /suap/users/by_matricula
   * Method: POST
   * Body: {
   *    matricula: number
   * }
   *
   *
   */
  static async createByMatricula(request: Request, response: Response) {
    try {
      // Matrícula que será cadastrada
      const matricula = request.body.matricula;

      const userToSave = await createByMatricula(
        matricula,
        request.user as User
      );

      return response.success(userToSave);
    } catch (error: Error | any) {
      console.log("Erro no createbymaricula", error);

      return response.exception(error);
    }
  }

  /**
   * Deleta um usuário do banco de dados
   *
   * URL: /suap/users/:userId
   * Method: DELETE
   *
   */
  static async delete(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const user = await userRepository.first(null, +userId);

      if (!user) throw { code: 404, message: "Usuário não encontrado" };

      // Apaga o token se existir. Não emite erro pois é possível que o usuário
      // não tenha token salvo.
      await authRepository.delete(null, user).catch(() => {});
      // Deleta o usuário. Se não existir, emite erro.
      await userRepository.delete(user);

      return response.success(true);
    } catch (error: Error | any) {
      return response.exception(error);
    }
  }
}
