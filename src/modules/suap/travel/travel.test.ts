import { getAuthorization } from "../../../../tests/hooks";

import app from "../../../app";

describe("module/travel", () => {
  // biblioteca que faz os tests usando http
  const request = require("supertest");

  let authorization = {};

  beforeAll(async () => {
    authorization = await getAuthorization();
  });

  describe("search", () => {
    //
    it("should list scheduled travels", async () => {
      const response = await request(app)
        .get("/suap/travels")
        .set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("objective");
      expect(data).toHaveProperty("isAuthorized");
      expect(data).toHaveProperty("isDeferred");
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("requester");
      expect(data).toHaveProperty("leavesAt");
      expect(data).toHaveProperty("arrivesAt");
    });

    //
    it("should list scheduled travels by campus", async () => {
      const response = await request(app)
        .get("/suap/travels")
        .query({ campus: "IP", only_future: false })
        .set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("objective");
      expect(data).toHaveProperty("isAuthorized");
      expect(data).toHaveProperty("isDeferred");
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("requester");
      expect(data).toHaveProperty("leavesAt");
      expect(data).toHaveProperty("arrivesAt");
    });

    //
    it("should list scheduled travels by term", async () => {
      const response = await request(app)
        .get("/suap/travels")
        .query({ term: "Visita", only_future: false })
        .set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data[0];

      expect(data).toHaveProperty("objective");
      expect(data).toHaveProperty("isAuthorized");
      expect(data).toHaveProperty("isDeferred");
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("requester");
      expect(data).toHaveProperty("leavesAt");
      expect(data).toHaveProperty("arrivesAt");

      expect(data.objective).toContain("Visita");
    });

    //
    it("should show travel by id", async () => {
      const response = await request(app)
        .get("/suap/travels/109488")
        .set(authorization);

      expect(response.status).toBe(200);

      const data = response.body.data;

      expect(data).toHaveProperty("objective");
      expect(data).toHaveProperty("isAuthorized");
      expect(data).toHaveProperty("isDeferred");
      expect(data).toHaveProperty("suapId");
      expect(data).toHaveProperty("requester");
      expect(data).toHaveProperty("leavesAt");
      expect(data).toHaveProperty("arrivesAt");
    });

    //
  });
});
