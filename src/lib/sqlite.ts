export function sqlUpdate(table: string, model: any, id: number) {
  const columns = Object.keys(model);
  const values = Object.values(model);

  const sql: string = `UPDATE ${table} SET ${columns
    .map((col) => `${col}=?`)
    .join()} WHERE id=?`;

  return [sql, [...values, id]];
}

export function sqlInsert(table: string, model: any) {
  const columns = Object.keys(model);
  const values = Object.values(model);

  const sql: string = `INSERT INTO ${table} (${columns.join()}) VALUES(${[
    ...Array(values.length),
  ]
    .map(() => "?")
    .join()})`;
  return [sql, values];
}

export function sqlDelete(table: string, id: number) {
  const sql: string = `DELETE FROM ${table} WHERE id=?`;
  return [sql, [id]];
}

export function sqlSelect(
  table: string,
  where: Record<string, number | string> = {}
) {
  const keys = Object.keys(where);
  const values = Object.values(where);

  const fields = keys.map((key: string) => `${key}=?`).join(" AND ");

  let sql = `SELECT * FROM ${table}`;

  if (keys?.length) sql += ` WHERE ${fields}`;

  return [sql, values];
}
