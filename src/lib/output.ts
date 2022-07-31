import { NextFunction, Request, Response, Send } from "express";

export default class Output {
  /**
   *
   */
  static _response: Response | null = null;

  /**
   *
   * @param response
   * @returns
   */
  static response(response: Response) {
    this._response = response;
    return this;
  }

  /**
   *
   * @param data
   * @param message
   * @returns
   */
  static success(
    data: any,
    message: string | null = "Transação realizada com sucesso"
  ) {
    return this._response?.status(200).json({
      error: false,
      message,
      status: 200,
      data,
    });
  }

  /**
   *
   * @param status
   * @param data
   * @param message
   * @returns
   */
  static error(
    status: number,
    data: any,
    message: string | null = "Erro ao realizar a operação"
  ) {
    return this._response?.status(status).json({
      error: true,
      message,
      status,
      data,
    });
  }

  /**
   *
   * @param data
   * @param message
   * @returns
   */
  static notFound = (data: any, message: string | null) =>
    Output.error(404, data, message);

  /**
   *
   * @param data
   * @param message
   * @returns
   */
  static forbidden = (data: any, message: string | null) =>
    Output.error(403, data, message);

  /**
   *
   * @param data
   * @param message
   * @returns
   */
  static badRequest = (data: any, message: string | null) =>
    Output.error(400, data, message);

  /**
   *
   * @param data
   * @param message
   * @returns
   */
  static unauthorized = (data: any, message: string | null) =>
    Output.error(401, data, message);

  /**
   * Middleware que ativa o Output padronizado nas respostas
   *
   *
   * @param request
   * @param response
   * @param next
   */
  static middleware(request: Request, response: Response, next: NextFunction) {
    Output.response(response);
    next();
  }
}
