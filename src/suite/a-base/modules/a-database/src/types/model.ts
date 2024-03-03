import { Knex } from 'knex';

export interface IModelSelectParams {
  table?: Knex.TableDescriptor | Knex.AliasDict;
  where?: any;
  columns?: any;
  joins?: any;
  orders?: any;
  limit?: number;
  offset?: number;
}
