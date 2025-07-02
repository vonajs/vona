export type TypeEntityMeta<T, N = string> = Required<{
  [key in keyof T]: key;
}> & { $table: N };
