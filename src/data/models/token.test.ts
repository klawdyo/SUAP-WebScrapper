import Token from "./token";

const data = (merge = {}) => ({
  id: "7",
  userId: 40443,
  cookie: "asdoiuas",
  createdAt: "2022-09-28 10:00:00",
  updatedAt: "2022-09-28 10:00:00",

  //
  ...merge,
});

describe("models/token", () => {
  test("Should be successfully instanced", () => {
    const token = new Token(data());

    expect(token).toBeInstanceOf(Token);
    expect(token.id).toBe("7");
    expect(token.userId).toBe(40443);
    expect(token.cookie).toBe("asdoiuas");
    expect(token.createdAt).toBe("2022-09-28 10:00:00");
    expect(token.updatedAt).toBe("2022-09-28 10:00:00");
  });

  test("Should be undefined if json is null", () => {
    const token = new Token(null);
    console.log(token);

    expect(token).toBeDefined();
    expect(token.id).toBeUndefined();
    expect(token.userId).toBe(-1);
    expect(token.cookie).toBe("");
  });

  test("Should be successfully converted to JSON", () => {
    const token = new Token(data());
    const json = token.toJSON();

    expect(json).toBeDefined();
    expect(json.id).toBe("7");
    expect(json.userId).toBe(40443);
    expect(json.cookie).toBe("asdoiuas");
    expect(json.createdAt).toBe("2022-09-28 10:00:00");
    expect(json.updatedAt).toBe("2022-09-28 10:00:00");
  });

  test("Should be successfully converted to empty JSON", () => {
    const token = new Token(null);
    const json = token.toJSON();
    console.log(json);

    expect(json).toBeDefined();
    expect(json.id).toBeNull();
    expect(json.userId).toBe(-1);
    expect(json.cookie).toBeNull();
    expect(json.createdAt).toBeUndefined();
    expect(json.updatedAt).toBeUndefined();
  });
});
