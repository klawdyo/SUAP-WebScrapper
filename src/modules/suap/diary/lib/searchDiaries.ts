// Os dados desta página vieram da página de criação de mensagem do comunicador
// https://suap.ifrn.edu.br/edu/enviar_mensagem/

import SUAP from "lib/suap";
import Campus from "models/campus";
import Diary, { autocompleteDiary } from "models/diary";
import Year from "models/year";
import { controlSearchDiaryMessenger } from "../values/control";

type diaryOptions = {
  year: Year;
  semester: number;
  campus: Campus;
};

export default async function searchDiaries(
  term: string,
  cookie: string | string[],
  options: Partial<diaryOptions> = {}
) {
  const result = await SUAP.setCookie(cookie).post("/json/edu/diario/", {
    q: term,
    control: controlSearchDiaryMessenger,
    // Os valores precisam ir como string
    filter_pks: JSON.stringify({
      turma__curso_campus__diretoria__setor__uo__in:
        options.campus?.id.toString(), // campus ip
      turma__curso_campus__diretoria__in: "", // diretoria
      turma__curso_campus__modalidade_id__in: "", // modalidade
      turma__curso_campus__in: "",
      ano_letivo__pk: options.year?.id.toString(), // 2022
      periodo_letivo: "1", // periodo 1
      turma__in: "", // código da turma
    }),
    search_fields:
      "componente_curricular__componente__sigla,id,componente_curricular__componente__descricao",
  });

  // Resultado
  const { items = [] } = JSON.parse(result);

  // Converte o resultado em uma lista de diários do tipo Diary
  const diaryList = items.map((item: autocompleteDiary) =>
    Diary.fromAutocomplete(item)
  );

  return diaryList;
}
