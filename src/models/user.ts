class User {
  id: number | null = null;
  name: string | null = null;
  image: string | null = null;

  constructor(json: Record<string, any> | null) {
    if (!json) return;

    this.id = json.id;
    this.name = json.name;
    this.image = json.image;
  }
}

export default User;
