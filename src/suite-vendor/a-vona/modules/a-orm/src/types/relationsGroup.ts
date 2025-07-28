import type { TypeEntityTableColumnNamesForAggrs } from './modelAggr.ts';
import type { TypeModelColumn, TypeModelColumnsStrict } from './modelWhere.ts';
import type { TypeUtilGetParamsAggrs, TypeUtilGetParamsColumns, TypeUtilGetParamsGroups } from './relations.ts';
import type { TypeModelAggrRelationResultAggr, TypeRecordAggrsValues, TypeRecordAggrsValuesToObject, TypeUtilAggrPrepareColumns } from './relationsAggr.ts';

export type TypeModelGroupRelationResult<TRecord, TOptions> =
  TypeModelGroupRelationResultGroups<
    TRecord,
    TypeUtilGetParamsAggrs<TOptions>,
    TypeUtilGetParamsGroups<TOptions>,
    TypeUtilGetParamsColumns<TOptions>
  >;

export type TypeModelGroupRelationResultGroups<TRecord, Aggrs, Groups, Columns> =
Groups extends string | string[] ?
TypeModelGroupRelationResultGroupsObject<TRecord, Groups, Columns> & (Aggrs extends {} ?
  TypeRecordAggrsValuesToObject<TypeRecordAggrsValues<
    { [K in keyof Aggrs]: K extends string ? TypeModelAggrRelationResultAggr<K, TypeUtilAggrPrepareColumns<Aggrs[K]>> : never }
  >> :
    {}) :
  undefined;

export type TypeModelGroupRelationResultGroupsObject<TRecord, Groups, Columns> =
  Columns extends string | string[] ? { [K in TypeUtilAggrPrepareColumns<Columns> ]: K extends keyof TRecord ? TRecord[K] : never } :
  Groups extends string | string[] ? { [K in TypeUtilAggrPrepareColumns<Groups> ]: K extends keyof TRecord ? TRecord[K] : never } : {};

export type TypeModelSelectGroupParamsColumnNames<
  TRecord,
  ColumnNames extends TypeModelColumnsStrict<TRecord> = TypeModelColumnsStrict<TRecord>,
  ColumnNamesAggrs
  extends TypeEntityTableColumnNamesForAggrs<TRecord>
    | Array<TypeEntityTableColumnNamesForAggrs<TRecord>> | undefined = TypeEntityTableColumnNamesForAggrs<TRecord> |
      Array<TypeEntityTableColumnNamesForAggrs<TRecord>>,
> =
 TypeUtilAggrPrepareColumns<ColumnNames> | TypeModelAggrRelationResultAggr<'count', TypeModelColumn<TRecord>> | TypeModelAggrRelationResultAggr<'sum' | 'avg' | 'max' | 'min', TypeUtilAggrPrepareColumns<ColumnNamesAggrs>>;
