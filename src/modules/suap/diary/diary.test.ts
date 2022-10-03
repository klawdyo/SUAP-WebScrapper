import { getAuthorization } from "../../../../tests/hooks";

import app from "../../../app";

describe("diary", () => {
  // biblioteca que faz os tests usando http
  const request = require("supertest");

  let authorization = {};

  beforeAll(async () => {
    authorization = await getAuthorization();
  });

  describe("search", () => {
    //
    it("should get diary by id", async () => {
      const response = await request(app)
        .get("/suap/diaries/99310")
        .set(authorization);

      // console.log(response.body);

      expect(response.status).toBe(200);

      const data = response.body.data;

      expect(data).toMatchObject({
        suapId: 99310,
        code: "EJA.0014",
        name: "Máquinas e Mecanização Agrícola",
        workload: 45,
        classes: 60,
        level: "Médio",
      });

      expect(data.students.length).toBeGreaterThan(1);
    });

    //
    it("should search diaries by name", async () => {
      const response = await request(app)
        .get("/suap/diaries")
        .query({ term: "TIN.0021" })
        .set(authorization);

      // console.log(response.body);

      expect(response.status).toBe(200);

      const data = response.body.data;
      expect(Array.isArray(data)).toBeTruthy();
      expect(data[0]).toHaveProperty("suapId");
      expect(data[0]).toHaveProperty("code");
      expect(data[0]).toHaveProperty("name");
      expect(data[0]).toHaveProperty("workload");
      expect(data[0]).toHaveProperty("classes");
      expect(data[0]).toHaveProperty("level");
      expect(data[0]).toHaveProperty("students");
    });

    //
    it("should list students by diary id", async () => {
      const response = await request(app)
        .get("/suap/people/student_by_diary/99310")
        .set(authorization);

      // console.log(response.body);

      expect(response.status).toBe(200);

      const data = response.body.data;

      expect(Array.isArray(data)).toBeTruthy();

      expect(data[0]).toHaveProperty("name");
      expect(data[0]).toHaveProperty("matricula");
      expect(data[0]).toHaveProperty("birth");
      expect(data[0]).toHaveProperty("age");
    });
  });
});
