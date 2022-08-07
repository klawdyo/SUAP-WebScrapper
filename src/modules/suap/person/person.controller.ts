import { Request, Response } from "express";
import User from "models/user";
import authRepository from "../auth/auth.repository";

export default class PersonController {
  /**
   * Pesquisa pessoas do campus do usuário logado
   * Esta busca inclui alunos, servidores e prestadores de serviço
   *
   * @param term Termo de busca
   */
  static async searchPeople(request: Request, response: Response) {
    try {
      console.log("entrou");

      const { term: string = "" } = request.query;
      const cookie = await authRepository.getCookie(request.user as User);

      console.log("cookinho", cookie);

      response.success({});
    } catch (error) {
      response.exception(error);
    }
  }

  /**
   * Pesquisa alunos
   *
   * @param term Termo de busca
   */
  static async searchStudents(request: Request, response: Response) {
    try {
      const { term: string = "" } = request.query;

      response.success({});
    } catch (error) {
      response.exception(error);
    }
  }

  /**
   * Pesquisa servidores
   *
   * @param term Termo de busca
   */
  static async searchEmployees(request: Request, response: Response) {
    try {
      const { term: string = "" } = request.query;

      response.success({});
    } catch (error) {
      response.exception(error);
    }
  }
}
