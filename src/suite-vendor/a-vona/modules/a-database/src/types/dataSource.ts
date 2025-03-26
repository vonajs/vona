import type { IDatabaseClientRecord } from './database.ts';

export interface IDataSourceSwitchOptions {
  clientName?: keyof IDatabaseClientRecord;
}
