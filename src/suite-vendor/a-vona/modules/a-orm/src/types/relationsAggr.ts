export type TypeModelAggrRelationResult<TOptions> =
  TypeModelAggrRelationResultAggrs<TypeUtilGetAggrsOptions<TOptions>>;

export type TypeModelAggrRelationResultAggrs<Aggrs> =
Aggrs extends {} ? { [K in keyof Aggrs]: K extends 'count' ? true : false } : undefined;

export type TypeUtilGetAggrsOptions<TOptions> = TOptions extends { aggrs: infer Aggrs extends {} } ? Aggrs : undefined;
