import type { IModelSelectParamsJoinType, ITableRecord, TypeOpsNormal } from 'vona-module-a-orm';

export interface ISchemaObjectExtensionFieldFilterJoin {
  type?: IModelSelectParamsJoinType;
  table: keyof ITableRecord;
  on: [string, string];
}

export interface ISchemaObjectExtensionFieldFilterCapabilities {
  where?: boolean;
  // filter?: boolean;
  order?: boolean;
  // group?: boolean;
}

export interface ISchemaObjectExtensionFieldFilter {
  capabilities?: ISchemaObjectExtensionFieldFilterCapabilities;
  table?: keyof ITableRecord;
  joinType?: IModelSelectParamsJoinType;
  joinOn?: [string, string];
  originalName?: string;
  op?: TypeOpsNormal;
  // transform?:
}
