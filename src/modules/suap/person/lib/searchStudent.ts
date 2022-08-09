// Os dados desta página vieram da página de criação de mensagem do comunicador
// https://suap.ifrn.edu.br/edu/enviar_mensagem/

import SUAP from "lib/suap";
import Campus from "models/campus";
import Person, { autocompletePerson, personType } from "models/person";
import Year from "models/year";
import { controlSearchStudent } from "../values/control";

export type personFilterOptions = {
  year: Year | undefined;
  campus: Campus | undefined;
  diaryId: string | undefined;
  classId: string | undefined;
  statusId: string | undefined; // Situação da matrícula do aluno no curso
};

export default async function searchStudent(
  term: string,
  cookie: string | string[],
  options: Partial<personFilterOptions> = {}
) {
  // Dados das opções
  const { year, campus, diaryId, classId, statusId = "1" } = options;

  // Pega a sigla do campus e a converte para seu ID
  const campusId = campus?.id.toString();

  // Pega o ano e o converte para seu id
  const yearId = Year.get(year !== undefined ? +year : 0)?.id || "";

  // Executa a busca
  const result = await SUAP.setCookie(cookie).post("/json/edu/aluno/", {
    q: term,
    control: controlSearchStudent,
    // Os valores precisam ir como string
    filter_pks: JSON.stringify({
      curso_campus__diretoria__setor__uo__in: campusId,
      curso_campus__diretoria__in: "",
      curso_campus__in: "",
      matriculaperiodo__matriculadiario__diario__turma__pk__in: classId,
      matriculaperiodo__matriculadiario__diario__pk__in: diaryId,
      situacao__id__in: statusId,
      ano_letivo__pk: yearId,
    }),
    search_fields: "pessoa_fisica__search_fields_optimized,matricula",
  });

  //
  const { items = [] } = JSON.parse(result);

  // Converte o resultado em uma lista de alunos do tipo Person
  // com o tipo padrão aluno
  const list = items.map((item: autocompletePerson) =>
    Person.fromAutocomplete(item, personType.ALUNO)
  );

  return list;
}