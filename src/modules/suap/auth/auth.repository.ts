import Auth from "../../../models/auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient().user;

export default {
  // 1) adicione o token. se tiver, atualiza. se não tiver, cria um novo
  // 2) verifica se um token válido existe. se existir e estiver dentro da validade,
  //    retorna. Se não existir ou não estiver válido, retorna null

  /**
   * Salvar ou editar um item.
   * Se informar o id, edita
   *
   * @param payload
   * @param id
   */
  save: async (payload: User, id: number | null = null) => {
    DB.setTable("users");
    return await DB.save(payload, id);
  },

  /**
   *
   * @param id
   * @returns
   */
  first: async (id: number): Promise<User> => {
    DB.setTable("users");
    const user = await DB.find(id);

    return new User(user);
  },

  all: async (
    where: Record<string, number | string> | null = null
  ): Promise<User[]> => {
    DB.setTable("users");
    const result = await DB.search(where);

    return result.map((user: Record<string, any>) => new User(user));
  },
};

// export default repository;
