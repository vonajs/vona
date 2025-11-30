import type { IModelSelectParamsJoinType, ITableRecord, TypeOpsNormal } from 'vona-module-a-orm';

export interface ISchemaObjectExtensionFieldFilterJoin {
  type?: IModelSelectParamsJoinType;
  table: keyof ITableRecord;
  on: [string, string];
}
export interface ISchemaObjectExtensionFieldFilter {
  table?: keyof ITableRecord;
  joinType?: IModelSelectParamsJoinType;
  joinOn?: [string, string];
  originalName?: string;
  op?: TypeOpsNormal;
  // transform?:
}
