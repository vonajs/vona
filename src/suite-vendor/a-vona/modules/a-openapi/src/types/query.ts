import type { IModelSelectParamsJoinType, ITableRecord } from 'vona-module-a-orm';

export interface ISchemaObjectExtensionFieldQueryJoin {
  type: IModelSelectParamsJoinType;
  table: keyof ITableRecord;
  on: [string, string];
}
export interface ISchemaObjectExtensionFieldQuery {
  join?: ISchemaObjectExtensionFieldQueryJoin;
}
