import { Request, Response } from "express";
import SUAP from "lib/suap";
import Campus from "models/campus";
import Person, { autocompletePerson } from "models/person";
import User from "models/user";
import Year from "models/year";
import authRepository from "../auth/auth.repository";
import searchStudent, { personFilterOptions } from "./lib/searchStudent";
import { controlSearchPeople, controlSearchStudent } from "./values/control";

export default class PersonController {
  /**
   * Pesquisa pessoas do campus do usuário logado
   * Esta busca inclui alunos, servidores e prestadores de serviço
   *
   * @param term Termo de busca
   */
  static async searchPeople(request: Request, response: Response) {
    try {
      const { term = "" } = request.query;
      const cookie = await authRepository.getCookie(request.user as User);

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
      response.success(result);
    } catch (error) {
      console.log(error);

      response.exception(error);
    }
  }
}
