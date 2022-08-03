import User from "../../../models/user";
// import DB from "../../../lib/database";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  /**
   * Salvar ou editar um item.
   * Se informar o id, edita
   *
   * @param payload
   * @param id
   */
  save: async (payload: User, id: number | null = null): Promise<User> => {
    const result = await prisma.user.create({
      data: payload.toJSON(),
    });

    return new User(result);
  },

  /**
   *
   * @param id
   * @returns
   */
  first: async (id: number): Promise<User> => {
    const result = await prisma.user.findFirst({ where: { matricula: id } });

    return new User(result);
  },

  all: async (
    where: Record<string, number | string> | null = null
  ): Promise<User[]> => {
    const result = await prisma.user.findMany();

    return result.map((user: Record<string, any>) => new User(user));
  },
};
