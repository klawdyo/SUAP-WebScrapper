import { getAuthorization } from "../../../../tests/hooks";

import app from "../../../app";

describe("module/person", () => {
  // biblioteca que faz os tests usando http
  const request = require("supertest");

  let authorization = {};

  beforeAll(async () => {
    authorization = await getAuthorization();
  });

  describe("search", () => {
    //
    it("should search people by name", async () => {
      const response = await request(app)
        .get("/suap/people")
        .query({ term: "jose claudio medeiros de lima" })
        .set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data[0];
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("course");
      expect(data).toHaveProperty("occupation");
      expect(data).toHaveProperty("type");

      expect(data.suapId).toBe(40058);
      expect(data.matricula).toBe("1673621");
    });

    //
    it("should search people by matricula", async () => {
      const response = await request(app)
        .get("/suap/people")
        .query({ term: "1673621" })
        .set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data[0];
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("course");
      expect(data).toHaveProperty("occupation");
      expect(data).toHaveProperty("type");

      expect(data.suapId).toBe(40058);
      expect(data.matricula).toBe("1673621");
    });

    //
    it("should search students by name", async () => {
      const response = await request(app)
        .get("/suap/people/student")
        .query({ term: "naciso" })
        .set(authorization);

      // console.log(response.body);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("course");
      expect(data).toHaveProperty("occupation");
      expect(data).toHaveProperty("type");
    });

    //
    it("should search students by campus", async () => {
      const response = await request(app)
        .get("/suap/people/student")
        .query({ campus: "MO" })
        .set(authorization);

      // console.log(response.body);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("course");
      expect(data).toHaveProperty("occupation");
      expect(data).toHaveProperty("type");

      expect(data.course).toContain("Campus Mossoró (CAMPUS MOSSORÓ)");
    });

    //
    it("should search students by campus", async () => {
      const response = await request(app)
        .get("/suap/people/student")
        .query({ campus: "IP" })
        .set(authorization);

      // console.log(response.body);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("course");
      expect(data).toHaveProperty("occupation");
      expect(data).toHaveProperty("type");

      expect(data.course).toContain("Campus Ipanguaçu (CAMPUS IPANGUAÇU)");
    });

    //
    it("should search students by diary id", async () => {
      const response = await request(app)
        .get("/suap/people/student")
        .query({ diaryId: "99259" })
        .set(authorization);

      // console.log(response.body);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("image");
      expect(data).toHaveProperty("matricula");
      expect(data).toHaveProperty("cpf");
      expect(data).toHaveProperty("sector");
      expect(data).toHaveProperty("course");
      expect(data).toHaveProperty("occupation");
      expect(data).toHaveProperty("type");

      expect(data.course).toContain(
        "05306 - Técnico de Nível Médio em Agroecologia"
      );
    });
  });
});
