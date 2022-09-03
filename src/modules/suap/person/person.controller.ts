import { Request, Response } from "express";
import Campus from "data/models/campus";
import User from "data/models/user";
import Year from "data/models/year";
import authRepository from "../auth/auth.repository";
import searchPerson from "./lib/searchPerson";
import searchStudent, { personFilterOptions } from "./lib/searchStudent";

export default class PersonController {
  /**
   * Pesquisa pessoas do campus do usuário logado
   * Esta busca inclui alunos, servidores e prestadores de serviço
   *
   * URL: /suap/people
   * Method: GET
   * Query: {
   *    term: string - texto para busca
   * }
   */
  static async searchPeople(request: Request, response: Response) {
    try {
      const { term = "" } = request.query;
      const cookie = await authRepository.getCookie(request.user as User);

      if (!cookie) throw null;

      const list = await searchPerson(term.toString(), cookie);

      return response.success(list);
    } catch (error) {
      return response.exception(error);
    }
  }
  /**
   * Pesquisa alunos
   * https://github.com/klawdyo/SUAP-WebScrapper/wiki#alunos-por-di%C3%A1rio
   *
   * URL: /suap/people/student
   * Method: GET
   * Query: {
   *    term   : string - texto para busca
   *    page   : number -
   *    diaryId: number - "id do diário",
   *    classId: number - "id da turma",
   *    year   : number - "ano",
   *    campus : string - "IP"
   * }
   *
   *
   */
  static async searchStudent(request: Request, response: Response) {
    try {
      const {
        term = "",
        diaryId = "", // id do diário
        classId = "", // id da turma
        year = "",
        campus = "IP", // padrão campus ipanguacu
      } = request.query;

      //
      const options: Partial<personFilterOptions> = {
        diaryId: diaryId.toString(),
        classId: classId.toString(),
        year: Year.get(+year),
        campus: Campus.get(campus.toString()),
        statusId: "1", // matriculado no curso
      };

      // console.log("options", options);

      //
      const cookie = await authRepository.getCookie(request.user as User);

      //
      if (!cookie) throw {};

      //
      const result = await searchStudent(term.toString(), cookie, options);

      //
      return response.success(result);
    } catch (error) {
      console.log(error);

      return response.exception(error);
    }
  }
}
