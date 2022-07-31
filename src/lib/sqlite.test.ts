import { sqlDelete, sqlInsert, sqlSelect, sqlUpdate } from "./sqlite";
import User from "../models/user";

describe("Database", () => {
  test("Should generate update SQL", () => {
    const user: User = {
      id: 1673621,
      name: "Cláudio Medeiros",
      image: "foto.jpeg",
    };

    const [sql, values] = sqlUpdate("users", user, 1);

    expect(sql).toBe(`UPDATE users SET id=?,name=?,image=? WHERE id=?`);
    expect(values).toStrictEqual([1673621, "Cláudio Medeiros", "foto.jpeg", 1]);
  });

  test("Should generate insert SQL", () => {
    const user: User = {
      id: 1673621,
      name: "Cláudio Medeiros",
      image: "foto.jpeg",
    };

    const [sql, values] = sqlInsert("users", user);

    expect(sql).toBe(`INSERT INTO users (id,name,image) VALUES(?,?,?)`);
    expect(values).toStrictEqual([1673621, "Cláudio Medeiros", "foto.jpeg"]);
  });

  test("Should generate delete SQL", () => {
    const [sql, values] = sqlDelete("users", 1673621);

    expect(sql).toBe(`DELETE FROM users WHERE id=?`);
    expect(values).toStrictEqual([1673621]);
  });

  test("Should generate select SQL", () => {
    const [sql, values] = sqlSelect("users");

    expect(sql).toBe(`SELECT * FROM users`);
    expect(values).toStrictEqual([]);
  });

  test("Should generate select SQL with params", () => {
    const [sql, values] = sqlSelect("users", { id: 1673621, name: "claudio" });

    expect(sql).toBe(`SELECT * FROM users WHERE id=? AND name=?`);
    expect(values).toStrictEqual([1673621, "claudio"]);
  });

  //
});
