import { Request, Response } from "express";
import SUAP from "lib/suap";
import Person, { autocompletePerson } from "models/person";
import User from "models/user";
import authRepository from "../auth/auth.repository";
import { controlSearchPeople } from "./values/control";

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

      const result = await SUAP.setCookie(cookie)
        .addHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
          charset: "UTF-8",
        })
        .post("/json/comum/vinculo/", {
          q: term,
          control: controlSearchPeople,
          search_fields: "search",
        });

      // console.log("result", result);

      const { items = [] } = JSON.parse(result);

      // return items.map((person as Record<string, any>) => new Person(person) )
      const peopleList = items.map((item: autocompletePerson) =>
        Person.fromAutocomplete(item)
      );

      response.success(peopleList);
    } catch (error) {
      response.exception(error);
    }
  }
}
