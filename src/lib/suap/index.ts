import { gotScraping, Headers } from "got-scraping";
import { cookieParser, getCSRFMmiddlewareToken } from "./utils";
import { URLSearchParams } from "url";

class SUAP {
  /**
   *
   */
  cookies?: string[] | undefined;

  /**
   *
   */
  _additionalHeaders: Record<string, any> = {};

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
  async get(
    path: string,
    params?: any,
    cookies?: string[] | undefined
  ): Promise<string> {
    try {
      const result = await gotScraping.get(SUAP.url(path, params), {
        headers: this.getHeaders(cookies),
      });

      if (result.statusCode === 200) return result.body;
      else throw { code: result.statusCode };
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
  async post(
    path: string,
    data: Record<string, any> | undefined,
    cookies?: string[] | undefined
  ): Promise<string> {
    try {
      const result = await gotScraping.post(SUAP.url(path), {
        headers: this.getHeaders(cookies),
        form: data,
      });

      console.log("POST", path, "->", result.statusCode, result.statusMessage);

      if (result.statusCode === 200) return result.body;
      else throw { code: result.statusCode };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna os cookies
   */
  async getCookie(matricula: string, password: string): Promise<string> {
    try {
      // Requisita a página inicial
      const result = await gotScraping.get(
        "https://suap.ifrn.edu.br/accounts/login/?next=/",
        {
          headers: this.getHeaders(),
        }
      );

      // Pega o CSRF token de dentro do html da página
      const csrfToken = getCSRFMmiddlewareToken(result.body);

      // Pega os cookies iniciais ao acessar a página
      const initialCookies = cookieParser(result.headers["set-cookie"]);

      // Cria o payload inicial para fazer o login
      const payload = {
        csrfmiddlewaretoken: csrfToken,
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
          form: payload,
          followRedirect: false,
        }
      );

      // Avalia se o usuário está logado apenas verificando os cookies
      return this.checkHasLoggedCookies(login.headers["set-cookie"]);

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
  setCookie(cookies?: string | string[] | undefined | null) {
    // Se for string
    if (
      cookies !== null &&
      cookies !== undefined &&
      typeof cookies === "string"
    ) {
      cookies = cookies.split(";").map((item) => item.trim());
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
    const url = `${SUAP.baseURL}${path}`;

    if (params) {
      return `${url}?${new URLSearchParams(params)}`;
    }

    return url;
  }

  /**
   * Verifica se o usuário está logado apenas avaliando os cookies
   */
  checkHasLoggedCookies(cookies: string[] | undefined) {
    try {
      // Os cookies retornados após o login
      // const loggedCookies = login.headers["set-cookie"];

      // O SUAP inicialmente retorna 2 cookies: sessionid e csrftoken
      // Estes 2 são retornados em todas as requisições, independente
      // de estar ou não estar logado
      // Já o cookie 'suap-control' só é retornado com o usuário logado
      // Dessa forma, se ele for encontrado nos cookies retornados o
      // login aconteceu com sucesso
      const hasSuapControl = cookies!.some((cookie: string) =>
        cookie.startsWith("__Host-suap-control")
      );

      // Verifica se contém o cookie específico de logado do SUAP
      if (hasSuapControl) {
        return JSON.stringify(cookies);
      }
      // Não foi encontrado o cookie suap-control nos cookies retornados
      else {
        throw {
          code: 403,
          message: "Usuário ou senha inválidos",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Pega os cabeçalhos no padrão
   *
   * @param cookies
   * @returns
   */
  getHeaders(cookies?: string | string[] | undefined): Headers {
    let headers = {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
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

  /**
   * Acrescenta cabeçalhos aos que já estão incluídos na biblioteca
   *
   * @param headers Cabeçalhos a serem adicionados
   * @returns
   */
  addHeaders(headers: Record<string, any>) {
    this._additionalHeaders = headers;

    return this;
  }
}

export default SUAP;
