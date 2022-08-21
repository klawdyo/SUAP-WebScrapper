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

      if (!cookie) throw { code: 401, message: "Não autenticado" };

      const travelList = await searchTravelSchedules(
        cookie,
        term?.toString(),
        toBoolean(only_future)
      );

      return response.success(travelList);
    } catch (error) {
      return response.exception(error);
    }
  }

  /**
   * Pega os dados de uma viagem
   *
   * URL: /suap/travels/:id
   * Method: GET
   *
   * Params: {
   *    id {integer} - Id da viagem no sistema de frota
   * }
   */
  static async first(request: Request, response: Response) {
    try {
      const cookie = await authRepository.getCookie(request.user as User);
      const { id } = request.params;
      if (!cookie) throw {};

      // const travelList = await getTravelById(cookie, +id);
      const travelList = await searchTravelSchedules(cookie, id, false);

      if (!travelList.length)
        throw {
          code: 404,
          message: "Viagem não encontrada",
        };

      return response.success(travelList[0]);
    } catch (error) {
      response.exception(error);
    }
  }
}
