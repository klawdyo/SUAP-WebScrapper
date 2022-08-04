import User from "../../../models/user";
import { Prisma, PrismaClient } from "@prisma/client";
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
  first: async (matricula: number): Promise<User> => {
    const result = await db.findFirst({ where: { matricula } });

    return new User(result);
  },

  all: async (where: Record<string, number | string> = {}): Promise<User[]> => {
    const result = await db.findMany({ where });

    return result.map((user: Record<string, any>) => new User(user));
  },

  delete: async (
    id: number | null | undefined = null,
    matricula?: number
  ): Promise<boolean> => {
    try {
      if (!id && !matricula)
        throw { code: 403, message: "É necessário informar matrícula ou id" };

      const where = id ? { id } : { matricula };

      const user = await db.findFirst({ where });

      if (!user)
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
