import SUAP from "lib/suap";
import Travel from "data/models/travel";
import parseTripsTable from "./parseTripsTable";
import { searchTravelQueryString } from "data/types/searchTravelQueryString";
import Campus from "data/models/campus";

/**
 * Pesquisa viagens agendadas no SUAP
 *
 * @param cookie O cookie
 * @param term Termo de busca
 * @param onlyFuture Mostrar somente os agendamentos futuros?
 */
export default async function searchTravelSchedules(
  cookie: string | string[],
  term: string = "",
  onlyFuture: boolean = true,
  campus: string | null = null
): Promise<Travel[]> {
  try {
    const suap = new SUAP();
    //
    const url = "/admin/frota/viagemagendamento/";

    // Define a quesystring
    const query: searchTravelQueryString = {};

    // Se for somente os futuros
    if (onlyFuture) query.tab = "tab_agendamentos_futuros";
    else query.tab = "tab_any_data";

    // Se houver pesquisa
    if (term) query.q = term;

    // Se houver campus
    if (campus) query.setor__uo__id__exact = Campus.get(campus)!.id;

    // Recebe os resultados
    const result = await suap.setCookie(cookie).get(url, query);

    //
    return parseTripsTable(result);
  } catch (error) {
    console.log("Catch - searchTravelSchedules", error);
    throw error;
  }
}
