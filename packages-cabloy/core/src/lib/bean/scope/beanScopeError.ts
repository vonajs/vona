interface IBeanScopeError {
  throw(...args: any[]): never;
}

export type TypeBeanScopeError<T> = {
  [prop in string & keyof T]: IBeanScopeError;
};
