import SUAP from "./index";

const base = SUAP.baseURL;

describe("Tests de URL", () => {
  //
  test("Teste de url sem parametro", () => {
    const url = SUAP.url("/account");
    console.log("url", url);

    expect(url).toBe(`${base}/account`);
  });

  //
  test("Teste de url com parametro", () => {
    const url = SUAP.url("/account", { next: "/" });
    console.log("url", url);

    expect(url).toBe(`${base}/account?next=%2F`);
  });

  //
});
