export type TypeMetaEntity<T, N = string> = Required<{
  [key in keyof T]: key;
}> & { $table: N };
