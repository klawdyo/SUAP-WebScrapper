import { Got, gotScraping, Headers } from "got-scraping";
import cheerio from "cheerio";
import User from "models/user";
import { cookieParser, getCSRFMmiddlewareToken } from "./utils";
import { URLSearchParams } from "url";

class SUAP {
  /**
   *
   */
  static cookies?: string[] | undefined;

  /**
   * URL de base
   */
  static baseURL = "https://suap.ifrn.edu.br";

  /**
   * Realiza uma requisição do tipo GET
   *
   * @param path Parte da URL
   * @param params Parâmetros da url em formato de objeto
   * @returns html da página
   */
  static async get(
    path: string,
    params?: any,
    cookies?: string[] | undefined
  ): Promise<string> {
    try {
      const result = await gotScraping.get(this.url(path, params), {
        headers: this.getHeaders(cookies),
      });

      return result.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Realiza uma requisição do tipo POST
   *
   * @param path Parte da URL
   * @param params Parâmetros da url em formato de objeto
   * @returns html da página
   */
  static async post(
    path: string,
    data: Record<string, any> | undefined,
    cookies?: string[] | undefined
  ): Promise<string> {
    try {
      const result = await gotScraping.get(this.url(path), {
        headers: this.getHeaders(cookies),
        form: data,
      });

      return result.body;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os cookies
   */
  static async getCookie(matricula: String, password: String): Promise<string> {
    try {
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

      // console.log("Headers", result.headers);
      // return;

      const csrfToken = getCSRFMmiddlewareToken(result.body);
      const cookies = cookieParser(result.headers["set-cookie"]);
      // console.log("cookies", cookies);

      const payload = {
        csrfmiddlewaretoken: csrfToken ?? "",
        username: process.env.SUAP_USER ?? "",
        password: process.env.SUAP_PASS ?? "",
        this_is_the_login_form: "1",
        next: "/",
        "g-recaptcha-response": "",
      };

      // console.log("payload:", payload);

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

      // console.log("retorno", login.headers);
      // console.log("retorn bo", login.body);
      // console.log(cookieParser(login.headers["set-cookie"]));

      const cookie = login.headers["set-cookie"];

      if (!cookie)
        throw {
          code: 401,
          message: "Erro ao realizar login",
        };

      return JSON.stringify(login.headers["set-cookie"]);
    } catch (error) {
      throw error;
    }
  }

  // ///////////////////////////////////////////////
  //
  //
  //
  // ///////////////////////////////////////////////

  /**
   * Gera uma URL no padrão
   *
   * @param path
   * @param params
   * @returns
   */
  static url(path: string, params?: any) {
    const url = `${this.baseURL}${path}`;

    if (params) {
      return `${url}?${new URLSearchParams(params)}`;
    }

    return url;
  }

  /**
   * Pega os cabeçalhos no padrão
   *
   * @param cookies
   * @returns
   */
  static getHeaders(cookies?: string[] | undefined): Headers {
    const headers = {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      Cookie: "",
      Host: "suap.ifrn.edu.br",
      Origin: "https://suap.ifrn.edu.br",
      Pragma: "no-cache",
      Referer: "https://suap.ifrn.edu.br/",
    };

    if (cookies) headers.Cookie = cookieParser(cookies);
    else if (this.cookies) headers.Cookie = cookieParser(this.cookies);

    return headers;
  }

  /**
   * Insere o cookie na requisição
   *
   * @param cookies
   * @returns
   */
  static setCookie(cookies?: string | string[] | undefined | null) {
    this.cookies = Array.isArray(cookies) ? cookies : cookies?.split(";");
    return this;
  }
}

export default SUAP;
