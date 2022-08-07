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
   *
   */
  static _additionalHeaders: Record<string, any> = {};

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
      const result = await gotScraping.post(this.url(path), {
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
      // Requisita a página inicial
      const result = await gotScraping.get(
        "https://suap.ifrn.edu.br/accounts/login/?next=/",
        {
          headers: this.getHeaders(),
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded",
          //   "user-agent":
          //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
          //   Host: "suap.ifrn.edu.br",
          //   Origin: "https://suap.ifrn.edu.br",
          //   Pragma: "no-cache",
          //   Referer: "https://suap.ifrn.edu.br/accounts/login/",
          // },
        }
      );

      // Pega o CSRF token de dentro do html da página
      const csrfToken = getCSRFMmiddlewareToken(result.body);

      // Pega os cookies iniciais ao acessar a página
      const initialCookies = cookieParser(result.headers["set-cookie"]);

      // Cria o payload inicial para fazer o login
      const payload = {
        csrfmiddlewaretoken: csrfToken ?? "",
        username: matricula,
        password: password,
        this_is_the_login_form: "1",
        next: "/",
        "g-recaptcha-response": "",
      };

      // Efetua o login
      const login = await gotScraping.post(
        "https://suap.ifrn.edu.br/accounts/login/",
        {
          headers: this.addHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
          }).getHeaders(initialCookies),
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded",
          //   "user-agent":
          //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
          //   Cookie: initialCookies,
          //   Host: "suap.ifrn.edu.br",
          //   Origin: "https://suap.ifrn.edu.br",
          //   Pragma: "no-cache",
          //   Referer: "https://suap.ifrn.edu.br/accounts/login/",
          // },
          form: payload,
          followRedirect: false,
        }
      );

      // Os cookies retornados após o login
      const loggedCookies = login.headers["set-cookie"];

      // Se existem cookies retornados
      if (!loggedCookies)
        throw {
          code: 403,
          message: "Erro ao realizar login",
        };

      // O SUAP inicialmente retorna 2 cookies: sessionid e csrftoken
      // Estes 2 são retornados em todas as requisições, independente
      // de estar ou não estar logado
      // Já o cookie 'suap-control' só é retornado com o usuário logado
      // Dessa forma, se ele for encontrado nos cookies retornados o
      // login aconteceu com sucesso
      const hasSuapControl = loggedCookies?.some((cookie) =>
        cookie.startsWith("__Host-suap-control")
      );

      // Verifica se contém o cookie específico de logado do SUAP
      if (hasSuapControl) {
        return JSON.stringify(login.headers["set-cookie"]);
      }
      // Não foi encontrado o cookie suap-control nos cookies retornados
      else {
        throw {
          code: 403,
          message: "Usuário ou senha inválidos",
        };
      }

      // S
    } catch (error) {
      throw error;
    }
  }

  /**
   * Insere o cookie na requisição
   *
   * @param cookies
   * @returns
   */
  static setCookie(cookies?: string | string[] | undefined | null) {
    // Se for string
    if (
      cookies !== null &&
      cookies !== undefined &&
      typeof cookies === "string"
    ) {
      cookies = cookies?.split(";");
    }

    this.cookies = cookies ? cookies : [];
    return this;
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
  static getHeaders(cookies?: string | string[] | undefined): Headers {
    let headers = {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      Cookie: "",

      Host: "suap.ifrn.edu.br",
      Origin: "https://suap.ifrn.edu.br",
      Pragma: "no-cache",
      Referer: "https://suap.ifrn.edu.br/",
    };

    // Adiciona os cookies caso haja algum
    if (cookies !== undefined) headers.Cookie = cookieParser(cookies);
    else if (this.cookies) headers.Cookie = cookieParser(this.cookies);

    // Se existirem cabeçalhos adicionais
    if (this._additionalHeaders) {
      headers = { ...headers, ...this._additionalHeaders };
    }

    return headers;
  }

  static addHeaders(headers: Record<string, any>) {
    this._additionalHeaders = headers;

    return this;
  }
}

export default SUAP;
