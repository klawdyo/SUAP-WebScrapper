class Token {
  id?: number;
  userId: number = -1;
  cookie: string = "";
  createdAt?: string;
  updatedAt?: string;

  constructor(json: Record<string, any> | null) {
    if (!json) return;

    this.id = json.id;
    this.userId = json.userId ? +json.userId : -1;
    this.cookie = json.cookie ? json.cookie : "";
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
  }

  toJSON() {
    return {
      id: this.id || null,
      userId: this.userId || null,
      cookie: this.cookie || null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    // return result;
  }
}

export default Token;
