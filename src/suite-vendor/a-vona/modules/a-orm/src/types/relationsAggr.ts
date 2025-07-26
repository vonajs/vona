export type TypeModelAggrRelationResult<TOptions> =
  TypeModelAggrRelationResultAggrs<TypeUtilGetAggrsOptions<TOptions>>;

export type TypeModelAggrRelationResultAggrs<Aggrs> =
Aggrs extends {} ?
  TypeRecordAggrsValuesToObject<TypeRecordAggrsValues<
    { [K in keyof Aggrs]: K extends string ? TypeModelAggrRelationResultAggr<K, TypeUtilAggrPrepareColumns<Aggrs[K]>> : never }
  >> : undefined;

export type TypeModelAggrRelationResultAggr<Aggr extends string, Columns extends string | undefined> = Columns extends string ? `${Aggr}_${Columns extends '*' ? 'all' : Columns}` : never;

export type TypeUtilGetAggrsOptions<TOptions> = TOptions extends { aggrs?: infer Aggrs extends {} } ? Aggrs : undefined;
export type TypeUtilAggrPrepareColumns<TColumns> = TColumns extends string[] ? TColumns[number] : TColumns extends string ? TColumns : undefined;
export type TypeRecordAggrsValues<TRecord extends Record<string, any>> = TRecord[keyof TRecord];
export type TypeRecordAggrsValuesToObject<AggrValues extends string> = { [K in AggrValues]: BigNumber };
