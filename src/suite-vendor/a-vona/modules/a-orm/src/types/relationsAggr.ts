export type TypeModelAggrRelationResult<TOptions> =
  TypeModelAggrRelationResultAggrs<TypeUtilGetAggrsOptions<TOptions>>;

export type TypeModelAggrRelationResultAggrs<Aggrs> =
Aggrs extends {} ?
  TypeRecordAggrsValues<
    { [K in keyof Aggrs]: K extends string ? TypeModelAggrRelationResultAggr<K, TypeUtilAggrPrepareColumns<Aggrs[K]>> : {} }
  > : undefined;

export type TypeModelAggrRelationResultAggr<Aggr extends string, Columns extends string | undefined> = [Columns] extends [string] ? {
  [K in Columns as `${Aggr}_${K extends '*' ? 'all' : K}` ]: BigNumber;
} : undefined;

export type TypeUtilGetAggrsOptions<TOptions> = TOptions extends { aggrs: infer Aggrs extends {} } ? Aggrs : undefined;
export type TypeUtilAggrPrepareColumns<TColumns> = TColumns extends string[] ? TColumns[number] : TColumns extends string ? TColumns : undefined;
export type TypeRecordAggrsValues<TRecord extends Record<string, {} | undefined>> = TRecord[keyof TRecord];
