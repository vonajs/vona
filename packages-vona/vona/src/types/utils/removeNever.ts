export type FilteredKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];

export type RemoveNever<T> = {
  [K in FilteredKeys<T>]: T[K];
};
