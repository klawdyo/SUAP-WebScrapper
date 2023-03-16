import { Request, Response } from "express";
import packageJson from "../../../package.json";

export default class HomeController {
  /**
   * Pesquisa pessoas do campus do usuário logado
   * Esta busca inclui alunos, servidores e prestadores de serviço
   *
   * @param term Termo de busca
   */
  static async start(request: Request, response: Response) {
    try {
      response.success({
        name: process.env.APP_NAME,
        version: packageJson.version,
      });
    } catch (error) {
      response.exception(error);
    }
  }
}
