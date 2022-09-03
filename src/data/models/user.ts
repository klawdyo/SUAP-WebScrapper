import { personType } from "data/enums/personType";
import Campus from "./campus";

class User {
  id?: number;
  suapId?: number | null;
  matricula: string = "";
  cpf: string = "";
  email: string = "";
  name: string = "";
  shortName: string = "";
  image: string = "";
  campus?: Campus;
  type?: personType;
  sector?: string;
  occupation?: string;

  constructor(json: Record<string, any> | null) {
    if (!json) return;

    this.id = json.id;
    this.suapId = json.suapId ? +json.suapId : null;
    this.matricula = json.matricula;
    this.cpf = json.cpf;
    this.email = json.email;
    this.name = json.name;
    this.shortName = json.shortName;
    this.image = json.image;
    this.campus = Campus.get(json.campus);
    this.type = json.type;
    this.sector = json.sector;
    this.occupation = json.occupation;
  }

  toJSON() {
    return {
      id: this.id,
      suapId: this.suapId,
      matricula: this.matricula,
      cpf: this.cpf || "",
      email: this.email || "",
      name: this.name || "",
      shortName: this.shortName || "",
      image: this.image || "",
      campus: this.campus?.short,
      type: this.type || "",
      sector: this.sector || "",
      occupation: this.occupation || "",
    };
  }

  isEmpty() {
    return !this.matricula && !this.id;
  }

  isNotEmpty() {
    return !this.isEmpty();
  }
}

export default User;
