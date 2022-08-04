import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response, Send } from "express";

export default class Output {
  /**
   *
   */
  static _response: Response | null = null;

  /**
   * Inclui o objeto de resposta nas propriedades da classe
   *
   * @param response
   * @returns
   */
  static response(response: Response) {
    this._response = response;
    return this;
  }

  /**
   * Requisição concluída com sucesso
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
   * Erro básico
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
   * Requisição não encontrada
   *
   * @param data
   * @param message
   * @returns
   */
  static notFound = (data: any, message: string | null) =>
    Output.error(404, data, message);

  /**
   * Requisição proibida
   *
   * @param data
   * @param message
   * @returns
   */
  static forbidden = (data: any, message: string | null) =>
    Output.error(403, data, message);

  /**
   * Requisição mal formada
   *
   * @param data
   * @param message
   * @returns
   */
  static badRequest = (data: any, message: string | null) =>
    Output.error(400, data, message);

  /**
   * Requisição não autorizada
   *
   * @param data
   * @param message
   * @returns
   */
  static unauthorized = (data: any, message: string | null) =>
    Output.error(401, data, message);

  /**
   * Trata uma exceção recebida e retorna uma mensagem padronizada
   *
   * @param e Objeto de exceção do erro
   * @param message Mensagem a ser exibida
   * @returns Response
   */
  static exception(e: any, message: string | null = null) {
    // Código padrão das exceções
    const code = 500;

    //
    // PrismaClientKnownRequestError
    // Prisma Client throws a PrismaClientKnownRequestError exception if
    // the query engine returns a known error related to the request -
    // for example, a unique constraint violation.
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //
      return Output.error(code, null, message || e.message);
    }

    //
    // Prisma.PrismaClientUnknownRequestError
    // Prisma Client throws a PrismaClientUnknownRequestError exception if the
    // query engine returns an error related to a request that does not have an error code.
    else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      //
      // return Output.error(code, null, message || e.message);
      return Output.error(
        code,
        null,
        message || "Erro desconhecido no acesso ao banco de dados"
      );
    }

    //
    // Prisma.PrismaClientRustPanicError
    // Prisma Client throws a PrismaClientRustPanicError exception if the underlying
    // engine crashes and exits with a non-zero exit code. In this case, the Prisma
    // Client or the whole Node process must be restarted.
    else if (e instanceof Prisma.PrismaClientRustPanicError) {
      //
      return Output.error(
        code,
        null,
        message || "Erro no mecanismo de acesso ao banco de dados"
      );
    }

    //
    // Prisma.PrismaClientInitializationError
    // Prisma Client throws a PrismaClientInitializationError exception if
    // something goes wrong when the query engine is started and the connection
    // to the database is created. This happens either:
    else if (e instanceof Prisma.PrismaClientInitializationError) {
      //
      return Output.error(
        code,
        null,
        message || "Erro de conexão ao banco de dados"
      );
    }

    //
    // Prisma.PrismaClientValidationError
    // Prisma Client throws a PrismaClientValidationError exception if validation fails - for example:
    // Missing field - for example, an empty data: {} property when creating a new record
    // Incorrect field type provided (for example, setting a Boolean field
    // to "Hello, I like cheese and gold!")
    else if (e instanceof Prisma.PrismaClientValidationError) {
      //
      return Output.error(
        code,
        null,
        message || "Erro de validação nos campos do banco de dados"
      );
    }

    //
    //
    // Padrão
    //
    //
    else {
      return Output.error(e.code, null, e.message);
    }
  }

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
