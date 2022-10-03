import app from "../../app";
describe("error", () => {
  // biblioteca que faz os tests usando http
  const request = require("supertest");

  // Biblioteca inicial do app. não usa o listen() por isso o listen
  // só foi colocado dentro do server.js e não dentro do app.js. O
  // supertest receberá esta constante app como parâmetro e ele será
  // responsável por criar o seu próprio servidor para rodar os testes
  // const app = require("/app");
  // beforeEach(async () => {
  // await truncateUser()
  // });

  it("should open a not found route", async () => {
    const response = await request(app).get("/error");

    expect(response.status).toBe(404);
  });
});
