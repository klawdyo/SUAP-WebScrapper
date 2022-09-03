import { PrismaClient } from "@prisma/client";
import Token from "data/models/token";
import User from "data/models/user";
import userRepository from "../user/user.repository";

const prisma = new PrismaClient();
const db = prisma.token;

export default {
  /**
   * Tempo de validade de um token
   * // -> 24 horas
   */
  _tokenTimeout: 24 * 60 * 60,

  /**
   * Salva um token recebido, criando caso não exista e atualizando
   * o token salvo caso já exista um para o mesmo usuário
   *
   * @param cookie
   * @param user
   * @returns
   */
  save: async (cookie: string, user: User): Promise<Token> => {
    try {
      if (!user.id)
        throw {
          code: 403,
          message: "Obrigatório informar o id do usuário",
        };

      const token = await db.upsert({
        create: {
          cookie,
          userId: user.id,
        },
        update: {
          cookie,
        },
        where: {
          userId: user.id,
        },
      });

      return new Token(token);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verifica se o usuário informado possui um cookie salvo
   * e dentro do prazo de validade
   *
   * @param user
   */
  isLogged: async (user: User): Promise<boolean> => {
    try {
      const token = await db.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!token) return false;

      // console.log(token);

      return true;

      //
    } catch (error) {
      throw error;
    }
  },

  /**
   * Pega as informações dos cookies de um usuário
   *
   * @param tokenId ID na tabela de tokens
   * @param matricula Matrícula do servidor
   * @returns Dados salvos no banco
   */
  first: async (
    tokenId: number | null,
    matricula: string | undefined
  ): Promise<Token | null> => {
    if (!tokenId && !matricula)
      throw { code: 500, message: "ID ou Matrícula precisam ser informados" };

    let result = null;

    // Se o id do token foi informado
    if (tokenId) {
      result = await db.findFirst({ where: { id: tokenId } });
    }
    // Se a matrícula foi informada
    else if (matricula !== undefined) {
      const user = await userRepository.first(matricula);
      if (!user) return null;
      result = await db.findFirst({ where: { userId: user?.id } });
    }

    if (!result) return null;

    return new Token(result);
  },

  /**
   * Pega o token do usuário informado
   */
  getCookie: async (user: User): Promise<string | null> => {
    try {
      const result = await db.findFirst({ where: { userId: user.id } });

      if (!result) return null;

      return result.cookie;
    } catch (error) {
      console.log("erro no getcookie", error);

      throw error;
    }
  },

  /**
   * Deleta o usuário informado
   */
  delete: async (
    tokenId?: number | null,
    user?: User | undefined
  ): Promise<boolean> => {
    try {
      if (!tokenId && !user)
        throw { code: 500, message: "tokenId ou user devem ser informados" };

      let result = null;

      if (tokenId) {
        result = await db.delete({ where: { id: tokenId } });
      } else if (user) {
        result = await db.delete({ where: { userId: user.id } });
      }

      if (!result) return false;

      return true;
    } catch (error) {
      console.log("erro no getcookie", error);

      throw error;
    }
  },
};

// export default repository;
