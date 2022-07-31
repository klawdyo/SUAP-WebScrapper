import sqlite3 from "sqlite3";
import { sqlInsert, sqlSelect, sqlUpdate } from "./sqlite";

const DBSOURCE = "db.sqlite";

const SQL_ITENS_CREATE = `
	CREATE TABLE IF NOT EXISTS itens (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nome TEXT,
		descricao TEXT
	)`;

const SQL_USERS_CREATE = `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY, -- Matrícula
		name TEXT,
		image TEXT
	)`;

const SQL_TOKENS_CREATE = `
	CREATE TABLE IF NOT EXISTS tokens (
		id INTEGER PRIMARY KEY, -- Matrícula
		token TEXT,
		created_at DATETIME
	)`;

export default class DB {
  static _database: sqlite3.Database | null = null;
  static table: string = "";

  static init() {
    if (this._database) return;

    this._database = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      } else {
      }
    });
    this._database.run(SQL_ITENS_CREATE, handleError);
    this._database.run(SQL_USERS_CREATE, handleError);
    this._database.run(SQL_TOKENS_CREATE, handleError);
  }

  /**
   *
   * @param table
   */
  static setTable(table: string): void {
    this.table = table;
  }

  static async save(payload: any, id: number | null = null) {
    return new Promise((resolve, reject) => {
      if (id) {
        const [sql, values] = sqlUpdate(this.table, payload, id);
        this._database?.run(sql.toString(), values, function (_err) {
          if (_err) {
            reject(_err);
          }
          const result = DB.find(id);
          resolve(result);
        });
      } else {
        const [sql, values] = sqlInsert(this.table, payload);
        this._database?.run(sql.toString(), values, function (_err) {
          if (_err) {
            reject(_err);
          }
          const result = DB.find(this?.lastID);
          resolve(result);
        });
      }
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  static async find(id: number): Promise<Record<string, any> | null> {
    return new Promise((resolve, reject) => {
      this._database?.get(
        `select * from ${this.table} where id=?`,
        [id],
        (_err, row) => {
          if (_err) resolve(null);
          else resolve(row);
        }
      );
    });
  }

  /**
   *
   */
  static async search(
    where: Record<string, any> | null
  ): Promise<Record<string, any>[]> {
    const [sql, values] = sqlSelect(this.table, where || {});

    return new Promise((resolve, reject) => {
      this._database?.all(sql.toString(), values, (_err, row) => {
        if (_err) resolve([]);
        else resolve(row);
      });
    });

    // return [];
  }
} // class

function handleError(error: Error | null) {
  if (error) {
    console.log("Error:", error);

    // Possivelmente a tabela já foi criada
  } else {
    // console.log("Tabela criada com sucesso.");
  }
}

// export default database;;
