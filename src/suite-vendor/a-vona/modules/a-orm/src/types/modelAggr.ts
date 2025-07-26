import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelSelectParamsJoin } from './model.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeEntityTableColumnNamesOfGeneral, TypeEntityTableColumnsOfGeneral } from './relationsColumns.ts';
import type { TypeEntityTableNamesOfGeneral } from './relationsTables.ts';

export type TypeModelSelectAggrParamsAggrs<TRecord, Model extends BeanModelMeta | undefined = undefined> =
  Model extends BeanModelMeta ? {
    count?: TypeModelColumns<TRecord>;
    sum?: TypeEntityTableColumnNamesForAggrs<TRecord> | Array<TypeEntityTableColumnNamesForAggrs<TRecord>>;
    avg?: TypeEntityTableColumnNamesForAggrs<TRecord> | Array<TypeEntityTableColumnNamesForAggrs<TRecord>>;
    max?: TypeEntityTableColumnNamesForAggrs<TRecord> | Array<TypeEntityTableColumnNamesForAggrs<TRecord>>;
    min?: TypeEntityTableColumnNamesForAggrs<TRecord> | Array<TypeEntityTableColumnNamesForAggrs<TRecord>>;
  } : never;

export type TypeEntityTableColumnNamesForAggrs<Entity> = keyof TypeEntityTableColumnsForAggrs<Entity>;

export type TypeEntityTableColumnsForAggrs<Entity> =
  Omit<{
    [K in keyof Entity as Entity[K] extends number | undefined ? K : never ]: Entity[K]
  }, 'id' | 'iid'>;

export interface IBuildModelSelectAggrParams<
  TRecord,
  Model extends BeanModelMeta | undefined = undefined,
  TableNames = undefined,
  ColumnNames = keyof TRecord,
  Columns extends {} | undefined = undefined,
> extends IBuildModelSelectAggrParamsBasic<TRecord, Model, TableNames, ColumnNames, Columns> {}

export interface IBuildModelSelectAggrParamsBasic<
  TRecord,
  Model extends BeanModelMeta | undefined = undefined,
  TableNames = undefined,
  ColumnNames = keyof TRecord,
  Columns extends {} | undefined = undefined,
> {
  distinct?: boolean | (keyof TRecord) | (keyof TRecord)[];
  aggrs: TypeModelSelectAggrParamsAggrs<TRecord, Model>;
  where?: TypeModelWhere<TRecord, Columns>;
  joins?: IModelSelectParamsJoin<TRecord, TableNames, ColumnNames>[];
}

export type IModelSelectAggrParams<
  TRecord,
  // not use undefined as default value
  Model extends BeanModelMeta = BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> = IBuildModelSelectAggrParams<
  TRecord,
  Model,
  TypeEntityTableNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnNamesOfGeneral<ModelJoins, Model>,
  TypeEntityTableColumnsOfGeneral<ModelJoins, Model>
>;
