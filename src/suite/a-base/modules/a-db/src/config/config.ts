import knex from 'knex';

export const config = _app => {
  return {
    base: {
      pool: { min: 0, max: 10 },
      afterCreate,
    } as knex.Knex.Config,
    clients: {} as Record<string, knex.Knex.Config>,
  };
};

async function afterCreate(conn) {
  await sessionVariablesSet(conn);
}

async function sessionVariablesSet(conn) {
  await sessionVariableSet(conn, 'SET SESSION explicit_defaults_for_timestamp=ON');
}

async function sessionVariableSet(conn, sql) {
  await conn.query(sql);
}
