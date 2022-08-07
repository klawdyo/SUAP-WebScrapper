import { load } from "cheerio";
import SUAP from "lib/suap";

export default class Person {
  suapId: number = -1;
  name: string = "";
  image: string = "";
  matricula?: number;
  cpf?: string;
  sector?: string;
  course?: string;
  occupation?: string;
  type?: personType;

  constructor(item: Record<string, any>) {
    if (item.suapId) this.suapId = +item.suapId;
    if (item.name) this.name = item.name;
    if (item.image) this.image = item.image;
    if (item.matricula) this.matricula = +item.matricula;
    if (item.cpf) this.cpf = item.cpf;
    if (item.sector) this.sector = item.sector;
    if (item.course) this.course = item.course;
    if (item.occupation) this.occupation = item.occupation;
    if (item.type) this.type = item.type;
  }

  /**
   * Cria um objeto person a partir de um item retornado por um html
   * de um autocomplete
   *
   */
  static fromAutocomplete(person: autocompletePerson): Person | null {
    try {
      const result: Person = {
        suapId: person.id,
        name: "",
        image: "",
      };

      const $ = load(person.html);

      // Imagem
      result.image = SUAP.baseURL + $("img").attr("src") || "";

      // Setor - Para terceirizados e servidores
      result.sector = $("dt:contains(Setor)").next("dd").text();

      // Curso - Para alunos
      result.course = $("dt:contains(Curso)").next("dd").text();

      // Cargo - Para servidores
      result.occupation = $("dt:contains(Cargo)").next("dd").text();

      // Parse da chave text
      const nameRgx =
        /(?<name>.*?) \((?<identification>.*?)\) \((?<type>.*?)\)/i;
      const nameMatch = nameRgx.exec(person.text);
      if (!nameMatch) return null;
      const {
        type = "",
        identification = "",
        name = "",
      } = nameMatch?.groups || {};

      result.name = name;

      switch (type.substring(0, 5)) {
        case "Aluno":
          result.matricula = +identification;
          result.type = personType.ALUNO;
          break;
        case "Servi":
          result.matricula = +identification;
          result.type = personType.SERVIDOR;
          break;
        case "Prest":
          result.cpf = identification;
          result.type = personType.TERCEIRIZADO;
          break;
      }

      return new Person(result);
    } catch (error) {
      return null;
    }
  }
}

/**
 * Tipo de dados para informações recebidas via autocomplete
 */
export type autocompletePerson = {
  id: number;
  html: string;
  text: string;
};

export enum personType {
  ALUNO = "student",
  SERVIDOR = "government_employee",
  TERCEIRIZADO = "outsourced",
}
