export type TypeEntityMeta<T, N = string> = Required<{
  [key in keyof T]: key;
}> & { $table: N; $comment: Required<{ [key in keyof T]: string }> & { $table: string } };

export const SymbolKeyFieldsMore = Symbol('$fieldsMore');
export type TypeSymbolKeyFieldsMore = typeof SymbolKeyFieldsMore;
