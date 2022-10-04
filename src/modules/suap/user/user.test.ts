import { getAuthorization, truncateTables } from "../../../../tests/hooks";

import app from "../../../app";

describe("module/user", () => {
  // biblioteca que faz os tests usando http
  const request = require("supertest");

  let authorization = {};

  beforeAll(async () => {
    authorization = await getAuthorization();
  });

  afterAll(async () => {
    await truncateTables();
  });

  describe("search", () => {
    //
    it("should list users", async () => {
      const response = await request(app).get("/suap/users").set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("email");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("shortName");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("campus");
      expect(data).toHaveProperty("type");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("occupation");
    });
  });

  describe("create by matricula", () => {
    //
    it("should create an user by matricula", async () => {
      const response = await request(app)
        .post("/suap/users/by_matricula")
        .send({ matricula: "1637341" })
        .set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data;

      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("email");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("shortName");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("campus");
      expect(data).toHaveProperty("type");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("occupation");

      expect(data.matricula).toBe("1637341");
    });

    //
    it("should try create an user with a not existant matricula", async () => {
      const response = await request(app)
        .post("/suap/users/by_matricula")
        .send({ matricula: "8637341" })
        .set(authorization);

      expect(response.status).toBe(404);
    });

    //
    it("should try create an user with a wrong matricula", async () => {
      const response = await request(app)
        .post("/suap/users/by_matricula")
        .send({ matricula: "aaaaaaa" })
        .set(authorization);

      expect(response.status).toBe(400);
    });

    //
    it("should try create an user with a matricula as integer", async () => {
      const response = await request(app)
        .post("/suap/users/by_matricula")
        .send({ matricula: 1673621 })
        .set(authorization);

      expect(response.status).toBe(400);
    });

    //
  });
});
