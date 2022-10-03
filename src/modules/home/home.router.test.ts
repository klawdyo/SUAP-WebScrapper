describe("home", () => {
  // biblioteca que faz os tests usando http
  const request = require("supertest");

  // Biblioteca inicial do app. não usa o listen() por isso o listen
  // só foi colocado dentro do server.js e não dentro do app.js. O
  // supertest receberá esta constante app como parâmetro e ele será
  // responsável por criar o seu próprio servidor para rodar os testes
  const app = require("/app");
  // beforeEach(async () => {
  // await truncateUser()
  // });

  it("should open root route", async () => {
    // const response = await request(app).post("/users").send({
    //   email: "klawdyo@gmail.com",
    //   password: "1234567890",
    //   password_confirmation: "1234567890",
    //   name: "Claudio Medeiros",
    // });

    // console.log(app);

    const response = await request(app).get("/");

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});
