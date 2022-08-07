import { Request, Response } from "express";

import User from "models/user";

import authRepository from "../auth/auth.repository";
import getTravelSchedules from "./lib/getTravelSchedules";

export default class TravelController {
  /**
   * Pesquisa pessoas do campus do usuário logado
   * Esta busca inclui alunos, servidores e prestadores de serviço
   *
   * @param term Termo de busca
   */
  static async search(request: Request, response: Response) {
    try {
      const cookie = await authRepository.getCookie(request.user as User);

      if (!cookie) throw {};

      const travelList = await getTravelSchedules(cookie);

      response.success(travelList);
    } catch (error) {
      response.exception(error);
    }
  }
}
