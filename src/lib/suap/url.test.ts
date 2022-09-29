import SUAP from "./index";

const base = SUAP.baseURL;

describe("lib/url", () => {
  //
  test("Teste de url sem parametro", () => {
    const url = SUAP.url("/account");

    expect(url).toBe(`${base}/account`);
  });

  //
  test("Teste de url com parametro", () => {
    const url = SUAP.url("/account", { next: "/" });

    expect(url).toBe(`${base}/account?next=%2F`);
  });

  //
});
