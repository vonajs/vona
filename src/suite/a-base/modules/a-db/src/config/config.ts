import knex from 'knex';

export const config = _app => {
  return {
    base: {
      pool: { min: 0, max: 10 },
    } as knex.Knex.Config,
    clients: {} as Record<string, knex.Knex.Config>,
  };
};
