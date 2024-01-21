import { IErrorObject } from '../../resource/error/errorObject.js';

export interface IBeanScopeError {
  throw(...args: any[]): never;
  parseFail(...args: any[]): IErrorObject;
}

export type TypeBeanScopeError<T> = {
  [prop in string & keyof T]: IBeanScopeError;
};
