import User from "../../../models/user";
import DB from "../../../lib/database";

export default {
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

  /*
  criar: (item: Item, callback: (id?: number) => void) => {
    const sql = "INSERT INTO itens (nome, descricao) VALUES (?, ?)";
    const params = [item.nome, item.descricao];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },

  lerTodos: (callback: (itens: Item[]) => void) => {
    const sql = "SELECT * FROM itens";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows));
  },

  ler: (id: number, callback: (item?: Item) => void) => {
    const sql = "SELECT * FROM itens WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row));
  },

  atualizar: (
    id: number,
    item: Item,
    callback: (notFound: boolean) => void
  ) => {
    const sql = "UPDATE itens SET nome = ?, descricao = ? WHERE id = ?";
    const params = [item.nome, item.descricao, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },

  apagar: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM itens WHERE id = ?";
    const params = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
  */
};

// export default repository;
