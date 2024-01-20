interface IBeanScopeError {
  throw(...args: any[]): never;
  parseFail(...args: any[]): Error;
}

export type TypeBeanScopeError<T> = {
  [prop in string & keyof T]: IBeanScopeError;
};
