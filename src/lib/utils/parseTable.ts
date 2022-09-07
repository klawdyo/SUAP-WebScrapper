import { load } from "cheerio";

/**
 * Transforma uma tabela em um array de objetos
 */
export default function parseTable(
  html: string | null,
  defaultHeaders: string[] = []
) {
  if (!html) return [];

  const $ = load(html);

  let headers: string[] = [];

  headers = defaultHeaders.length
    ? defaultHeaders
    : $("thead tr th")
        .map((i, el) => {
          if (isCheckbox(el)) return "id";

          return $(el).text();
        })
        .toArray();

  const rows: Record<string, any>[] = [];

  $("tbody tr").each((i, row) => {
    const cells = $("td", row)
      .map((j, cell) => {
        if (isCheckbox(cell)) return $("input", cell).attr("value");

        return $(cell).text();
      })
      .toArray();

    rows.push(cells);
  });

  // console.log(rows);

  const list = rows.map((item, key) => {
    const output: Record<string, any> = {};

    headers.forEach((header: string, k: number) => {
      output[header] = item[k];
    });

    return output;
  });

  return list;
}

function isCheckbox(el: any) {
  const $ = load(el);
  return $('input[type="checkbox"]').length >= 1;
}
