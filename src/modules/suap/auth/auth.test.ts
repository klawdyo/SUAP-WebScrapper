// import request from 'supertest/lib/';
import { truncateTables } from "../../../../tests/hooks";
import app from "../../../app";

console.log("env: ", process.env.NODE_ENV);

describe("module/auth", () => {
  // biblioteca que faz os tests usando http
  const request = require("supertest");

  // Biblioteca inicial do app. não usa o listen() por isso o listen
  // só foi colocado dentro do server.js e não dentro do app.js. O
  // supertest receberá esta constante app como parâmetro e ele será
  // responsável por criar o seu próprio servidor para rodar os testes
  // const app = require("/app");
  // import app from "/app";
  beforeEach(async () => {
    console.log("antes de cada");

    await truncateTables();
  });

  describe("login", () => {
    //
    it("should successfully login", async () => {
      const response = await request(app).post("/suap/auth/login").send({
        matricula: process.env.SUAP_USER,
        password: process.env.SUAP_PASS,
      });

      // console.log(response.body);

      expect(response.status).toBe(200);
    });

    //
    it("should try login without a valid matricula", async () => {
      const response = await request(app).post("/suap/auth/login").send({
        matricula: "matricula",
        password: process.env.SUAP_PASS,
      });

      // console.log(response.body);

      expect(response.status).toBe(400);
    });

    //
    it("should try login without send a password", async () => {
      const response = await request(app).post("/suap/auth/login").send({
        matricula: process.env.SUAP_USER,
        // password: process.env.SUAP_PASS,
      });

      // console.log(response.body);

      expect(response.status).toBe(400);
    });

    //
    it("should try login with invalid password", async () => {
      const response = await request(app).post("/suap/auth/login").send({
        matricula: process.env.SUAP_USER,
        password: "senha12345",
      });

      console.log(response.body);

      expect(response.status).toBe(403);
    });
  });
});
