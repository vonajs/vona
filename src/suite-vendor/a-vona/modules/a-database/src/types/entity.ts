export type TypeEntityMeta<T, N = string> = Required<{
  [key in keyof T]: key;
}> & { $table: N };

export const SymbolKeyFieldsMore = Symbol('$fieldsMore');
export type TypeSymbolKeyFieldsMore = typeof SymbolKeyFieldsMore;
