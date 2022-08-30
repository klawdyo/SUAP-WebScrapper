import SUAP from "lib/suap";
import Travel from "models/travel";
import parseTripsTable from "./parseTripsTable";

/**
 * Tipo de dados para a querystring
 */
type queryString = {
  tab?: string;
  q?: string;
};

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
  onlyFuture: boolean = true
): Promise<Travel[]> {
  try {
    //
    const url = "/admin/frota/viagemagendamento/";

    // Define a quesystring
    const query: queryString = {};

    // Se for somente os futuros
    if (onlyFuture) query.tab = "tab_agendamentos_futuros";
    else query.tab = "tab_any_data";
    // Se houver pesquisa
    if (term) query.q = term;

    // Recebe os resultados
    const result = await SUAP.setCookie(cookie).get(url, query);

    //
    return parseTripsTable(result);
  } catch (error) {
    console.log("Catch - searchTravelSchedules", error);
    throw error;
  }
}
