import moment from "moment";

export default class Travel {
  suapId: number;
  requester: string;
  leavesAt: Date | string;
  arrivesAt: Date | string;
  objective: string = "";
  isAuthorized: boolean | null = null;
  isDeferred: boolean | null = null;

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

    // Os estados de autorização da chefia:
    // Pode ser "sim", "aguardando" ou "fora do prazo". Podem existir outros
    // estados não localizados na listagem. Neste caso, só amarrei o
    // "sim" e o "aguardando". Outros estados serão false
    if (item.isAuthorized && item.isAuthorized === "Sim")
      this.isAuthorized = true;
    else if (item.isAuthorized && item.isAuthorized === "Aguardando")
      this.isAuthorized = null;
    else this.isAuthorized = false;

    // Estados de deferimento pela cosgem
    // Podem ser "Deferido" e "Indeferido". Se não for um desses, ou estará vazio
    // ou estará com um botão de "Avaliar". Este botão não é exibido para todos então
    // irei amarrar somente o "Deferido" e o "Indeferido" como true e false respectivamente
    // Outros casos serão null e representarão o status "Aguardando"
    if (item.isDeferred && item.isDeferred === "Deferido") {
      this.isDeferred = true;
    }
    //
    // Se for indeferido ou fora do prazo retorne false
    //
    else if (
      item.isDeferred &&
      ["Indeferido", "Fora do Prazo", "Não Autorizado"].includes(
        item.isDeferred
      )
    ) {
      this.isDeferred = false;
    } else {
      this.isDeferred = null;
    }
  }

  /**
   * Converte um array de objetos em uma lista de objetos do tipo Travel
   *
   * @param list Array de objetos
   * @returns Travel[]
   */
  static toList(list: Record<string, string>[]): Travel[] {
    return list.map((item) => new Travel(item));
  }
}
