import { load } from "cheerio";

/**
 * Retorna os cookies em formato de string para enviar no form de login.
 * - Se os cookies forem uma string, transforme para array
 * - Com o array, filtre os cookies para remover cookies fora do padrão:
 *    - __Host-csrftoken=
 *    - __Host-suap-control=
 *    - __Host-sessionid=
 *  - Com os dados filtrados, junte-os novamente em uma string
 *
 *
 * @param cookies
 * @returns
 */
export function cookieParser(
  cookies: string | string[] | undefined = []
): string {
  if (!cookies) {
    return "";
  }

  if (typeof cookies === "string") {
    cookies = cookies.split(";");
  }

  const rgx = /(__Host-(?:[a-z-]+)\=[\=\"\\A-Za-z0-9_-]+)/i;

  return (cookies as string[])
    .map((item: string) => {
      const match = item.match(rgx);

      if (match) {
        return match[0];
      }
    })
    .filter((item: string | undefined) => item)
    .join("; ")
    .replace(/\\/g, "");
}

/**
 * Retorna o token encontrado dentro do html fornecido
 * @param html O html onde será feita a busca
 * @returns Retorna o valor do token
 */
export function getCSRFMmiddlewareToken(html: string): string {
  const $ = load(html);

  return $("input[name=csrfmiddlewaretoken]:first").attr("value") || "";
}
