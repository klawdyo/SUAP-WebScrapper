import moment from "moment";

export default class Student {
  name: string | null = null;
  matricula: string | null = null;
  birth: Date | null = null;
  age: number | null = null;

  constructor(item: Record<string, any>) {
    if (item.name) this.name = item.name;
    if (item.matricula) this.matricula = item.matricula;

    if (item.birth) {
      this.birth = item.birth;
      // Converte o aniversário de uma data br para uma instância de date
      const birth = moment(item.birth, "DD/MM/YYYY");
      this.age = moment().diff(birth, "years");
    }
  }

  /**
   * Converte para json
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name || null,
      matricula: this.matricula || null,
      birth: this.birth || null,
      age: this.age || null,
    };
  }
}
