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

  // Image
  const $image = $(".photo-circle img", $content);

  return new User({
    matricula: titleMatch?.groups?.matricula,
    name: titleMatch?.groups?.name,
    email: $email.text(),
    image: SUAP.baseURL + $image.attr("src"),
  });
}
