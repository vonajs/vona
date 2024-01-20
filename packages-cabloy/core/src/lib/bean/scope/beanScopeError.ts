interface IBeanScopeError {
  throw(string: 'a-version'): never;
}

export type TypeBeanScopeError<T> = {
  [prop in string & keyof T]: IBeanScopeError;
};
