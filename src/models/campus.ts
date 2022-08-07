// export enum Campus {
//   IP = 6,
// }

export default class Campus {
  id: number;
  short: string;
  name: string;

  constructor(data: Campus) {
    this.id = data.id;
    this.short = data.short;
    this.name = data.name;
  }

  static campi: Campus[] = [
    new Campus({ id: 6, short: "IP", name: "Ipanguaçu" }),
  ];

  /**
   * Lista os anos
   * @returns
   */
  static list(): Campus[] {
    return this.campi;
  }

  /**
   * Localiza o id a partir do ano
   * @param campus
   * @returns
   */
  static get(short: string): Campus | undefined {
    return this.campi.find((item: Campus) => item.short === short);
  }
}
