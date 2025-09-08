import type { IModelSelectParamsJoinType, ITableRecord, TypeOpsNormal } from 'vona-module-a-orm';

export interface ISchemaObjectExtensionFieldQueryJoin {
  type?: IModelSelectParamsJoinType;
  table: keyof ITableRecord;
  on: [string, string];
}
export interface ISchemaObjectExtensionFieldQuery {
  table?: string;
  join?: ISchemaObjectExtensionFieldQueryJoin;
  originalName?: string;
  op?: TypeOpsNormal;
}
