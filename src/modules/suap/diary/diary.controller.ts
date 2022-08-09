import { Request, Response } from "express";

import Campus from "models/campus";
import User from "models/user";
import Year from "models/year";

import authRepository from "../auth/auth.repository";
import searchDiaries from "./lib/searchDiaries";

export default class DiaryController {
  /**
   * Pesquisa pessoas do campus do usuário logado
   * Esta busca inclui alunos, servidores e prestadores de serviço
   *
   * @param term Termo de busca
   */
  static async search(request: Request, response: Response) {
    try {
      const {
        term = "",
        campus = "IP",
        year = "2022",
        semester = 1,
      } = request.query;

      const cookie = await authRepository.getCookie(request.user as User);

      if (!cookie) throw {};

      const diaryList = await searchDiaries(term.toString(), cookie, {
        campus: Campus.get(campus.toString()),
        year: Year.get(+year),
        semester: +semester,
      });

      response.success(diaryList);
    } catch (error) {
      response.exception(error);
    }
  }
}