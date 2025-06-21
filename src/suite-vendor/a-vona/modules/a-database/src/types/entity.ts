export type TypeMetaEntity<T, N> = Required<{
  [key in keyof T]: key;
}> & { $table: N };
