import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { JsonWebTokenError } from "jsonwebtoken";

export default class Output {
  /**
   *
   */
  _response: Response | null = null;

  /**
   * Inclui o objeto de resposta nas propriedades da classe
   *
   * @param response
   * @returns
   */
  constructor(response: Response) {
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
  success(
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
  error(
    status: number = 500,
    data: any = null,
    message: string | null = "Erro ao realizar a operação"
  ) {
    try {
      return this._response?.status(status).json({
        error: true,
        message,
        status,
        data,
      });
    } catch (error) {
      console.log("Catch - Output.error: ", error);
    }
  }

  /**
   * Requisição não encontrada
   *
   * @param data
   * @param message
   * @returns
   */
  notFound = (data: any, message: string | null) =>
    this.error(404, data, message || "Página não encontrada");

  /**
   * Requisição proibida
   *
   * @param data
   * @param message
   * @returns
   */
  forbidden = (data: any, message: string | null) =>
    this.error(403, data, message || "Requisição não permitida");

  /**
   * Requisição mal formada
   *
   * @param data
   * @param message
   * @returns
   */
  badRequest = (data: any, message: string | null) =>
    this.error(400, data, message || "Esta requisição está mal formatada");

  /**
   * Requisição não autorizada
   *
   * @param data
   * @param message
   * @returns
   */
  unauthorized = (data: any, message: string | null) =>
    this.error(401, data, message || "Acesso não autorizado");

  /**
   * Trata uma exceção recebida e retorna uma mensagem padronizada
   *
   * @param e Objeto de exceção do erro
   * @param message Mensagem a ser exibida
   * @returns Response
   */
  exception(e: any, message: string | null = null) {
    try {
      // Código padrão das exceções
      const code = 500;

      //
      // PrismaClientKnownRequestError
      // Prisma Client throws a PrismaClientKnownRequestError exception if
      // the query engine returns a known error related to the request -
      // for example, a unique constraint violation.
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        //
        return this.error(code, null, message || e.message);
      }

      //
      // Prisma.PrismaClientUnknownRequestError
      // Prisma Client throws a PrismaClientUnknownRequestError exception if the
      // query engine returns an error related to a request that does not have an error code.
      else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        //
        // return this.error(code, null, message || e.message);
        return this.error(
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
        return this.error(
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
        return this.error(
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
        return this.error(
          code,
          null,
          message || "Erro de validação nos campos do banco de dados"
        );
      }

      //
      // JsonWebTokenError
      //
      //
      else if (e instanceof JsonWebTokenError) {
        const messages: Record<string, string> = {
          "jwt malformed": "Token de autenticação inválido", // token não tá no padrão separado por pontos
          "invalid token": "Token de autenticação inválido", // token não está válido
          "jwt expired": "Token de autenticação expirado", // token expirado
          "invalid signature": "Token de autenticação inválido", // token com assinatura errada
        };

        return this.error(
          401,
          null,
          message || messages[e.message] || "Token de autenticação inválido"
        );
      }

      //
      // ValidationError
      //
      //
      else if (e instanceof Joi.ValidationError) {
        return this.error(400, e.details, message || "Erro de validação");
      }

      //
      // SyntaxError
      //
      //
      else if (e instanceof SyntaxError) {
        return this.error(500, { name: e.name, message: e.message });
      }

      //
      //
      //
      else if (typeof e.code === "string") {
        return this.error(500, null, "Erro desconhecido");
      }

      //
      //
      // Padrão
      //
      //
      else {
        return this.error(e.code, null, e.message);
      }
    } catch (error) {
      console.log("Catch - Output.exception", error);
      // return Output.error(500, null, "Erro desconhecido");
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
    const out = new Output(response);

    response.success = (data: any, message: string | null) =>
      out.success(data, message);

    response.error = (status: number, data: any, message: string | null) =>
      out.error(status, data, message);

    response.exception = (e: any, message: string | null) =>
      out.exception(e, message);

    response.notFound = (data: any, message: string | null) =>
      out.notFound(data, message);

    response.forbidden = (data: any, message: string | null) =>
      out.forbidden(data, message);

    response.badRequest = (data: any, message: string | null) =>
      out.badRequest(data, message);

    response.unauthorized = (data: any, message: string | null) =>
      out.unauthorized(data, message);

    next();
  }
}

// Inclui o valor de usuário logado na interface do Response
declare global {
  namespace Express {
    interface Response {
      success: any;
      error: any;
      exception: any;
      notFound: any;
      forbidden: any;
      badRequest: any;
      unauthorized: any;
    }
  }
}
