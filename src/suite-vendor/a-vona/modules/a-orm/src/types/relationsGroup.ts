import type { TypeUtilGetParamsAggrs, TypeUtilGetParamsGroups } from './relations.ts';
import type { TypeModelAggrRelationResultAggr, TypeRecordAggrsValues, TypeRecordAggrsValuesToObject, TypeUtilAggrPrepareColumns } from './relationsAggr.ts';

export type TypeModelGroupRelationResult<TRecord, TOptions> =
  TypeModelGroupRelationResultGroups<TRecord, TypeUtilGetParamsAggrs<TOptions>, TypeUtilGetParamsGroups<TOptions>>;

export type TypeModelGroupRelationResultGroups<TRecord, Aggrs, Groups> =
Groups extends string | string[] ?
// @ts-ignore ignore
{ [K in TypeUtilAggrPrepareColumns<Groups> ]: TRecord[K] } & (Aggrs extends {} ?
  TypeRecordAggrsValuesToObject<TypeRecordAggrsValues<
    { [K in keyof Aggrs]: K extends string ? TypeModelAggrRelationResultAggr<K, TypeUtilAggrPrepareColumns<Aggrs[K]>> : never }
  >> :
    {}) :
  undefined;
