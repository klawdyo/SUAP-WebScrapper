import { Request, Response } from "express";

import { gotScraping } from "got-scraping";
import { cookieParser, getCSRFMmiddlewareToken } from "./lib/parser";

export default class AuthController {
  /**
   *
   * @param req
   * @param res
   */
  static async login(request: Request, response: Response) {
    const result = await gotScraping.get(
      "https://suap.ifrn.edu.br/accounts/login/?next=/",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
          Host: "suap.ifrn.edu.br",
          Origin: "https://suap.ifrn.edu.br",
          Pragma: "no-cache",
          Referer: "https://suap.ifrn.edu.br/accounts/login/",
        },
      }
    );

    console.log("Headers", result.headers);
    // return;

    const csrfToken = getCSRFMmiddlewareToken(result.body);
    const cookies = cookieParser(result.headers["set-cookie"]);
    console.log("cookies", cookies);

    const payload = {
      csrfmiddlewaretoken: csrfToken ?? "",
      username: process.env.SUAP_USER ?? "",
      password: process.env.SUAP_PASS ?? "",
      this_is_the_login_form: "1",
      next: "/",
      "g-recaptcha-response": "",
    };

    console.log("payload:", payload);

    const login = await gotScraping.post(
      "https://suap.ifrn.edu.br/accounts/login/",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
          Cookie: cookies,
          Host: "suap.ifrn.edu.br",
          Origin: "https://suap.ifrn.edu.br",
          Pragma: "no-cache",
          Referer: "https://suap.ifrn.edu.br/accounts/login/",
        },
        // json: payload,
        // body: JSON.stringify(payload),
        // body: new URLSearchParams(payload).toString(),
        form: payload,
        // maxRedirects: 50,
        followRedirect: false,
      }
    );

    console.log("retorno", login.headers);
    console.log("retorn bo", login.body);
    console.log(cookieParser(login.headers["set-cookie"]));

    const home = await gotScraping.get("https://suap.ifrn.edu.br/", {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        Cookie: cookieParser(login.headers["set-cookie"]),
        Host: "suap.ifrn.edu.br",
        Origin: "https://suap.ifrn.edu.br",
        Pragma: "no-cache",
        Referer: "https://suap.ifrn.edu.br/",
      },
      // json: payload,
      // body: JSON.stringify(payload),
      // body: new URLSearchParams(payload).toString(),
      // form: payload,
      // maxRedirects: 50,
      // followRedirect: false,
    });

    console.log("inicio", home.headers);
    console.log("inicio", home.body);

    //
    return response.json({
      olar: true,
    });
  }
}
