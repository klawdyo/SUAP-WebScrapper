import User from "data/models/user";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient().user;

export default {
  /**
   * Salva um usuário usando a matrícula como índice. Se a matrícula informada
   * já existir, altera as informações. Se a matrícula não existir, então é
   * um usuário novo e deve ser cadastrado.
   *
   * @param payload
   * @param id
   */
  save: async (payload: User): Promise<User> => {
    try {
      const user = await db.findFirst({
        where: {
          OR: [{ matricula: payload.matricula }, { email: payload.email }],
        },
      });

      let result = {};

      if (user) {
        result = await db.update({
          where: { matricula: payload.matricula },
          data: payload.toJSON(),
        });
      } else {
        result = await db.create({
          data: payload.toJSON(),
        });
      }

      return new User(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  /**
   *
   * @param id
   * @returns
   */
  first: async (
    matricula: string | null,
    id?: number | undefined
  ): Promise<User | null> => {
    //
    if (!id && !matricula)
      throw {
        code: 500,
        message: "Informe pelo menos um id ou a matrícula do servidor",
      };

    let result = null;

    if (id) {
      result = await db.findFirst({ where: { id } });
    } else if (matricula) {
      result = await db.findFirst({
        where: { matricula: matricula.toString() },
      });
    }

    if (!result) return null;

    return new User(result);
  },

  all: async (where: Record<string, number | string> = {}): Promise<User[]> => {
    const result = await db.findMany({ where });

    return result.map((user: Record<string, any>) => new User(user));
  },

  delete: async (user: User): Promise<boolean> => {
    try {
      if (!user)
        throw { code: 403, message: "É necessário informar matrícula ou id" };

      const where = user.id ? { id: user.id } : { matricula: user.matricula };

      const result = await db.findFirst({ where });

      if (!result)
        throw {
          code: 404,
          message: "Usuário não encontrado",
        };

      await db.delete({
        where,
      });

      return true;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
};
