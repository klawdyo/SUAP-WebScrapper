import { load } from "cheerio";
import { autocompletePerson } from "data/types/autocompletePerson";
import { personType } from "../enums/personType";
import SUAP from "../../lib/suap";

export default class Person {
  suapId: number = -1;
  name: string = "";
  image: string = "";
  matricula?: string;
  cpf?: string;
  sector?: string;
  course?: string;
  occupation?: string;
  type?: personType;

  constructor(item: Record<string, any>) {
    if (item.suapId) this.suapId = +item.suapId;
    if (item.name) this.name = item.name;
    if (item.image) this.image = item.image;
    if (item.matricula) this.matricula = item.matricula;
    if (item.cpf) this.cpf = item.cpf;
    if (item.sector) this.sector = item.sector;
    if (item.course) this.course = item.course;
    if (item.occupation) this.occupation = item.occupation;
    if (item.type) this.type = item.type;
  }

  /**
   * Converte para json
   */
  toJSON(): Record<string, any> {
    return {
      suapId: this.suapId || null,
      name: this.name || null,
      image: this.image || null,
      matricula: this.matricula || null,
      cpf: this.cpf || null,
      sector: this.sector || null,
      course: this.course || null,
      occupation: this.occupation || null,
      type: this.type || null,
    };
  }

  /**
   * Cria um objeto person a partir de um item retornado por um html
   * de um autocomplete
   *
   */
  static fromAutocomplete(
    person: autocompletePerson,
    defaultType: personType | undefined = undefined
  ): Person | null {
    try {
      const result: Person = new Person({
        suapId: person.id,
        name: "",
        image: "",
      });

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
        /(?<name>.*?) \((?<identification>.*?)\)( \((?<type>.*?)\))?/i;
      const nameMatch = nameRgx.exec(person.text);

      // Se não encontrou um nome, encerre
      if (!nameMatch) return null;

      // Dados iniciais
      const {
        type = "",
        identification = "",
        name = "",
      } = nameMatch?.groups || {};

      result.name = name;

      // Se encontrou um tipo no resultado
      switch (type.substring(0, 5)) {
        case "Aluno":
          result.type = personType.ALUNO;
          break;
        case "Servi":
          result.type = personType.SERVIDOR;
          break;
        case "Prest":
          result.type = personType.TERCEIRIZADO;
          break;
      }

      // Se não encontrou um tipo no resultado E possui um tipo padrão
      if (!result.type && defaultType) result.type = defaultType;

      // Se for aluno ou servidor, use matrícula
      if (
        [personType.ALUNO, personType.SERVIDOR].includes(
          result.type as personType
        )
      ) {
        result.matricula = identification;
      }
      // Se encontrou um terceirizado, use o CPF
      else if ([personType.TERCEIRIZADO].includes(result.type as personType)) {
        result.cpf = identification;
      }

      return new Person(result);
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
