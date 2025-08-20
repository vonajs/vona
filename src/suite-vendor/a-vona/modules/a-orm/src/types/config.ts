import type { Knex } from 'knex';
import type { VonaContext } from 'vona';
import type { IDatabaseClientDialectRecord, IDatabaseClientRecord } from './database.ts';

export type TypeDefaultClientNameFn = (ctx?: VonaContext) => keyof IDatabaseClientRecord;

export type TypeDefaultClientName = TypeDefaultClientNameFn | keyof IDatabaseClientRecord;

export interface ConfigDatabaseClient extends Omit<Knex.Config, 'client'> {
  client: keyof IDatabaseClientDialectRecord;
}
export interface ConfigDatabase {
  testDatabase: boolean;
  defaultClient: TypeDefaultClientName;
  clients: Record<keyof IDatabaseClientRecord, ConfigDatabaseClient>;
  base: ConfigDatabaseClient;
}
