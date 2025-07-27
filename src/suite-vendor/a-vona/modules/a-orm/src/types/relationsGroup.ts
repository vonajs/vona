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
  // @ts-ignore ignore
  Columns extends string | string[] ? { [K in TypeUtilAggrPrepareColumns<Columns> ]: TRecord[K] } :
  // @ts-ignore ignore
  Groups extends string | string[] ? { [K in TypeUtilAggrPrepareColumns<Groups> ]: TRecord[K] } : {};
