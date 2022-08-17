import { load } from "cheerio";
import SUAP from "lib/suap";
import User from "models/user";

export default function profileParser(content: string): User {
  const $ = load(content);
  const $content = $("#content", content);

  // Nome e matrícula
  const title = $(".title-container h2", $content).text();
  const titleRgx = /(?<name>.*?) \((?<matricula>\d+)\)/;
  const titleMatch = titleRgx.exec(title);

  // E-mail
  const $email = $(
    '.list-item dt:contains("E-mail Institucional")',
    $content
  ).siblings("dd");

  // Campus
  const $campus = $('.list-item dt:contains("Setor SUAP")', $content).siblings(
    "dd"
  );

  // Nome Curto
  const $shortName = $('.list-item dt:contains("Nome Usual")').siblings("dd");

  // CPF
  const $cpf = $('.list-item dt:contains("CPF")').siblings("dd");

  // Image
  const $image = $(".photo-circle img", $content);

  const payload = {
    matricula: titleMatch?.groups?.matricula,
    name: titleMatch?.groups?.name,
    cpf: $cpf.text(),
    email: $email.text(),
    image: SUAP.baseURL + $image.attr("src"),
    campus: getCampus($campus.text()), // retorna a sigla do campus
    shortName: $shortName.text(),
  };

  // console.log("Resultado do scrapping: ", payload);

  return new User(payload);
}

/**
 * Pega o campus do usuário e retorna
 *
 * getCampus('RE (campus: RE)')
 * getCampus('DG/ZL (campus: DG/ZL)')
 * getCampus('SEAC/IP (campus: DG/IP)')
 *
 * @param campus
 * @returns
 */
function getCampus(campus: string): string | undefined {
  const rgx = /([A-Z]+\/)?([A-Z]+)\)/i;
  const match = rgx.exec(campus);

  if (match) {
    return match[2];
  }
}
