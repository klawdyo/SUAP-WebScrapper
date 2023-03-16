import SUAP from ".";
import { cookieParser } from "./utils";

describe("lib/suap/get_cookie", () => {
  //
  test("Should log in successfully", async () => {
    const suap = new SUAP();

    const result = await suap.getCookie(
      process.env.SUAP_USER!.toString(),
      process.env.SUAP_PASS!.toString()
    );

    const cookies = cookieParser(result);

    expect(cookies).toContain("__Host-csrftoken");
    expect(cookies).toContain("__Host-suap-control");
    expect(cookies).toContain("__Host-sessionid");
  });

  //
  test("Should log in unsuccessful - Wrong password", async () => {
    const suap = new SUAP();
    const fn = () =>
      suap.getCookie(process.env.SUAP_USER!.toString(), "123456");

    await expect(fn).rejects.toMatchObject({
      code: 403,
      message: "Usuário ou senha inválidos",
    });
  });
});
