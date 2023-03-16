import { load } from "cheerio";
import SUAP from "lib/suap";
import User from "data/models/user";
import Campus from "data/models/campus";

export default function studentProfileParser(content: string): User {
  const $ = load(content);
  const $content = $("#content", content);

  // Nome e matrícula
  const title = $(".title-container h2", $content).text();
  const titleRgx = /(?<name>.*?) \((?<matricula>\d+)\)/;
  const titleMatch = titleRgx.exec(title);

  // E-mail
  const $email = $(
    '.list-item dt:contains("E-mail Acadêmico")',
    $content
  ).siblings("dd");

  // Campus
  const $course = $('.list-item dt:contains("Curso")', $content).siblings("dd");

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
    campus: getCampus($course.text()), // retorna a sigla do campus
  };

  return new User(payload);
}

/**
 * Pega o campus do usuário e retorna
 *
 *
 *  getCampus('05401 - Técnico de Nível Médio em Informática, na Forma Integrado (2012) - Campus Ipanguaçu (CAMPUS IPANGUAÇU)')
 *  getCampus('05401 - Técnico de Nível Médio em Informática, na Forma Integrado (2012) - Campus Ipanguaçu (CAMPUS CURRAIS NOVOS)')
 *
 *
 * @param campus
 * @returns
 */
function getCampus(name: string): string | null {
  const rgx = /\(Campus ([a-z\sá-ù]+)\)/i;
  const match = rgx.exec(name);

  // console.log("campus localizado", match);
  if (match) {
    const found = Campus.list().find(
      (campus) =>
        match[1].toLocaleLowerCase() == campus.name.toLocaleLowerCase()
    );

    return found?.short || null;
  }

  return null;
}
