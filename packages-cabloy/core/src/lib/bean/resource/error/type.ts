import { IErrorObject } from './errorObject.js';

export interface IBeanScopeError {
  throw(...args: any[]): never;
  parseFail(...args: any[]): IErrorObject;
}

export type TypeBeanScopeError<T> = {
  [prop in string & keyof T]: IBeanScopeError;
};
