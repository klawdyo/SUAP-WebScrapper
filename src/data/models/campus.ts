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
    new Campus({ id: 8, short: "AP", name: "Apodi" }),
    new Campus({ id: 7, short: "CA", name: "Caicó" }),
    new Campus({ id: 13, short: "CAL", name: "Cidade Alta" }),
    new Campus({ id: 41, short: "CANG", name: "Canguaretama" }),
    new Campus({ id: 45, short: "CM", name: "Ceará Mirim" }),
    new Campus({ id: 3, short: "CN", name: "Currais Novos" }),
    new Campus({ id: 1, short: "CNAT", name: "Natal Central" }),
    new Campus({ id: 6, short: "IP", name: "Ipanguaçu" }),
    new Campus({ id: 9, short: "JC", name: "João Câmara" }),
    new Campus({ id: 55, short: "JUC", name: "Jucurutu" }),
    new Campus({ id: 47, short: "LAJ", name: "Lajes" }),
    new Campus({ id: 10, short: "MC", name: "Macau" }),
    new Campus({ id: 4, short: "MO", name: "Mossoró" }),
    new Campus({ id: 16, short: "NC", name: "Nova Cruz" }),
    new Campus({ id: 48, short: "PAAS", name: "Parelhas" }),
    new Campus({ id: 15, short: "PAR", name: "Parnamirim" }),
    new Campus({ id: 11, short: "PF", name: "Pau dos Ferros" }),
    new Campus({ id: 12, short: "SC", name: "Santa Cruz" }),
    new Campus({ id: 17, short: "SGA", name: "São Gonçalo" }),
    new Campus({ id: 43, short: "SPP", name: "São Paulo do Potengi" }),
    new Campus({ id: 14, short: "ZL", name: "Zona Leste" }),
    new Campus({ id: 2, short: "ZN", name: "Zona Norte" }),
    new Campus({ id: 18, short: "RE", name: "Reitoria" }),
  ];

  /**
   * Lista os anos
   * @returns
   */
  static list(): Campus[] {
    return this.campi;
  }

  /**
   * Localiza o objeto campus a partir da sigla
   * @param campus
   * @returns
   */
  static get(short: string): Campus | undefined {
    return this.campi.find((item: Campus) => item.short === short);
  }
}
