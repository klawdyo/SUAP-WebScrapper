// Lista de ids dos anos retirados da página
// https://suap.ifrn.edu.br/edu/enviar_mensagem/
// no campo "Ano Letivo"

export default class Year {
  id: number;
  year: number;

  static years: Year[] = [
    new Year(68, 2020),
    new Year(69, 2021),
    new Year(70, 2022),
    new Year(71, 2023),
  ];

  constructor(id: number, year: number) {
    this.id = id;
    this.year = year;
  }

  /**
   * Lista os anos
   * @returns
   */
  static list(): Year[] {
    return this.years;
  }

  /**
   * Retorna uma instância de Year a partir do ano
   * @param year
   * @returns
   */
  static get(year: number): Year | undefined {
    const item: any = this.years.find((item: Year) => item.year === year);
    if (item !== undefined) return item;
  }
}
