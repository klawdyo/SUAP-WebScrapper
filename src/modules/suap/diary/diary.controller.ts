import { Request, Response } from "express";

import Campus from "data/models/campus";
import User from "data/models/user";
import Year from "data/models/year";

import authRepository from "../auth/auth.repository";
import searchDiaries from "./lib/searchDiaries";
import { searchAutocompleteStudent } from "../person/lib/searchStudent";
import getDiaryById from "./lib/getDiaryById";

export default class DiaryController {
  /**
   * Pesquisa um diário pelo seu id e retorna as informações completas,
   * inclusive a lista de alunos
   *
   */
  static async searchById(request: Request, response: Response) {
    try {
      const { diaryId } = request.params;

      const cookie = await authRepository.getCookie(request.user as User);

      if (!cookie) throw {};

      const result = await getDiaryById(diaryId, cookie);

      return response.success(result);
    } catch (error) {
      return response.exception(error);
    }
  }

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
        semester = 2,
      } = request.query;

      const cookie = await authRepository.getCookie(request.user as User);

      if (!cookie) throw {};

      const diaryList = await searchDiaries(term.toString(), cookie, {
        campus: Campus.get(campus.toString()),
        year: Year.get(+year),
        semester: +semester,
      });

      return response.success(diaryList);
    } catch (error) {
      return response.exception(error);
    }
  }
}
