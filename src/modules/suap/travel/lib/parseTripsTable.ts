import Travel from "models/travel";
import { load } from "cheerio";

export default function parseTripsTable(html: string): Travel[] {
  const $ = load(html);

  const parsed = $("tbody tr", html)
    .map((i, el) => {
      const $row = $(el);

      return {
        suapId: $(".field-id", $row).text(),
        requester: $(".field-get_responsavel", $row).text(),
        leavesAt: $(".field-data_saida", $row).text(),
        arrivesAt: $(".field-data_chegada", $row).text(),
        objective: $(".field-objetivo", $row).text(),
        isAuthorized: $(".field-get_autorizado", $row).text(),
        isDeferred: $(".field-get_situacao", $row).text(),
      };

      // return new Travel(travel);
    })
    .toArray();

  return Travel.toList(parsed);
}
