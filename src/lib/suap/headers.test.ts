import SUAP from ".";

describe("lib/suap/headers", () => {
  //
  it("Should get headers", () => {
    //
    const headers = SUAP.getHeaders();

    expect(headers).toMatchObject({
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      Cookie: "",
      Host: "suap.ifrn.edu.br",
      Origin: "https://suap.ifrn.edu.br",
      Pragma: "no-cache",
      Referer: "https://suap.ifrn.edu.br/",
    });
  });

  //
  it("Should add headers", () => {
    //
    SUAP.addHeaders({ "X-API": "SUAP WebScrapper" });
    const headers = SUAP.getHeaders();

    expect(headers).toMatchObject({
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      Cookie: "",
      Host: "suap.ifrn.edu.br",
      Origin: "https://suap.ifrn.edu.br",
      Pragma: "no-cache",
      Referer: "https://suap.ifrn.edu.br/",
      "X-API": "SUAP WebScrapper",
    });
  });
});
