import moment from "moment";

export default class Travel {
  suapId: number;
  requester: string;
  leavesAt: Date | string;
  arrivesAt: Date | string;
  objective: string = "";
  isAuthorized: boolean = false;
  isDeferred: boolean = false;

  constructor(item: Record<string, any>) {
    this.suapId = +item.suapId;
    this.requester = item.requester;
    this.leavesAt = moment(item.leavesAt, "DD/MM/YYYY HH:mm")
      .utcOffset(-3, true)
      .toISOString(true);
    this.arrivesAt = moment(item.arrivesAt, "DD/MM/YYYY HH:mm")
      .utcOffset(-3, true)
      .toISOString(true);
    if (item.objective) this.objective = item.objective;
    if (item.isAuthorized) this.isAuthorized = item.isAuthorized === "Sim";
    if (item.isDeferred) this.isDeferred = item.isDeferred === "Deferido";
  }

  static toList(list: Record<string, string>[]): Travel[] {
    return list.map((item) => new Travel(item));

    return [];
  }

  /**
   * Cria um objeto person a partir de um item retornado por um html
   * de um autocomplete
   *
   */
  // static parser(html:string): Travel[] {
  //   try {
  //     const result: Travel = {
  //       suapId: diary.id,
  //       code: "",
  //       name: "",
  //     };

  //     const $ = load(diary.text);

  //     // Regex: https://regexr.com/6rcqt
  //     const match =
  //       /(?<id>\d+)\s*-\s*(?<code>\w+\.\d+)\s*-\s*(?<name>.*?)\s*-\s*(?<level>M.dio|Gradua..o)\s*\[(?<workload>\d+)\sh\/(?<classes>\d+)\sAulas\]/i.exec(
  //         diary.text
  //       );

  //     if (match?.groups) {
  //       const { id, code, name, level, workload, classes } = match?.groups;
  //       return new Travel({
  //         suapId: id,
  //         code,
  //         name,
  //         workload: +workload,
  //         classes: +classes,
  //         level,
  //       });
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     return null;
  //   }
  // }
}

/**
 * Tipo de dados para informações recebidas via autocomplete
 */
export type autocompleteTravel = {
  id: number;
  html: string;
  text: string;
};
