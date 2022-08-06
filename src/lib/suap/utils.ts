import cheerio from "cheerio";

/**
 * Retorna os cookies em formato de string para enviar noform de login
 * @param cookies
 * @returns
 */
export function cookieParser(cookies: string[] | undefined = []): string {
  if (cookies === undefined || cookies === null || !Array.isArray(cookies)) {
    return "";
  }

  const rgx = /(__Host-(?:[a-z-]+)\=[\=\"A-Za-z0-9_-]+)/i;

  return (cookies as string[])
    .map((item: string) => {
      const match = item.match(rgx);

      if (match) {
        return match[0];
      }
    })
    .filter((item: string | undefined) => item)
    .join("; ");
}

/**
 * Retorna o token encontrado dentro do html fornecido
 * @param html O html onde será feita a busca
 * @returns Retorna o valor do token
 */
export function getCSRFMmiddlewareToken(html: string) {
  const $ = cheerio.load(html);
  return $("input[name=csrfmiddlewaretoken]:first").attr("value");
}
