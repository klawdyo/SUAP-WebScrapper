import { Request, Response } from "express";
import { toBoolean } from "klawtil";

import User from "models/user";

import authRepository from "../auth/auth.repository";
import searchTravelSchedules from "./lib/searchTravelSchedules";

export default class TravelController {
  /**
   * Pesquisa pessoas do campus do usuário logado
   * Esta busca inclui alunos, servidores e prestadores de serviço
   *
   * URL: /suap/travels
   * Method: GET
   *
   * Query: {
   *    id {integer} - Id da viagem no sistema de frota
   * }
   *
   */
  static async search(request: Request, response: Response) {
    try {
      const cookie = await authRepository.getCookie(request.user as User);
      const { term, only_future = true } = request.query;

      if (!cookie) throw {};

      const travelList = await searchTravelSchedules(
        cookie,
        term?.toString(),
        toBoolean(only_future)
      );

      response.success(travelList);
    } catch (error) {
      response.exception(error);
    }
  }
}
