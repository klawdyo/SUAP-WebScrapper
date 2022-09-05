import { URLSearchParams } from "node:url";
import SUAP from "lib/suap";
import parseTable from "lib/utils/parseTable";

import { load } from "cheerio";

export default async function studentsByDiary(
  diaryId: string,
  cookie: string | string[]
) {
  let params = new URLSearchParams("/edu/relatorio");

  params.append("uo", "6");
  params.append("diario", diaryId);
  params.append("formatacao", "simples");
  params.append("quantidade_itens", "100");
  params.append("ordenacao", "Nome");
  params.append("agrupamento", "Campus");
  params.append("exibicao", "curso_campus.diretoria.setor.uo");
  params.append("exibicao", "pessoa_fisica.nascimento_data");
  params.append("exibicao", "curso_campus.descricao");

  const url = "/edu/relatorio";

  const result = await SUAP.setCookie(cookie).get(
    url + "?" + params.toString()
  );

  const $ = load(result);

  const headers: string[] = [
    "seq",
    "suapId",
    "matricula",
    "name",
    "campus",
    "birth",
    "course",
  ];

  return parseTable($("table.mb-2").parent().html(), headers);
}
