class User {
  id?: number;
  matricula: number = 0;
  name: string = "";
  email: string = "";
  image: string = "";

  constructor(json: Record<string, any> | null) {
    if (!json) return;

    this.id = json.id;
    this.matricula = json.matricula ? +json.matricula : -1;
    this.email = json.email;
    this.name = json.name;
    this.image = json.image;
  }

  toJSON() {
    return {
      email: this.email || "",
      name: this.name || "",
      image: this.image || "",
      matricula: this.matricula,
      id: this.id,
    };

    // return result;
  }
}

export default User;
