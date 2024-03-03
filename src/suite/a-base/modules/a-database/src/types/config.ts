import { Knex } from 'knex';

export interface ConfigDatabase {
  testDatabase: boolean;
  defaultClient: string;
  clients: Record<string, Knex.Config>;
  base: Knex.Config;
  bases: Record<string, Knex.Config>;
}
