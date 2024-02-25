import knex from 'knex';

export const config = _app => {
  return {
    base: {} as knex.Knex.Config,
    clients: {} as Record<string, knex.Knex.Config>,
  };
};
