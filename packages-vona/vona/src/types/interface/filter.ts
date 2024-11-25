import { IMiddlewareBase, NextSync } from './middleware.js';

export interface IFilterRecordGlobal {}
export interface IFilterRecordLocal {}
export type IFilterRecord = IFilterRecordGlobal & IFilterRecordLocal;

export interface IFilterJson {
  json(err: Error, options: IDecoratorFilterOptions, next: NextSync): boolean;
}

export interface IFilterLog {
  log(err: Error, options: IDecoratorFilterOptions, next: NextSync): boolean;
}

export interface IDecoratorFilterOptions {}

export interface IDecoratorFilterOptionsGlobal extends IMiddlewareBase {
  global: true;
  dependencies?: (keyof IFilterRecordGlobal)[] | keyof IFilterRecordGlobal;
  dependents?: (keyof IFilterRecordGlobal)[] | keyof IFilterRecordGlobal;
}

export const SymbolFilterComposeContext = Symbol('SymbolFilterComposeContext');

export interface IFilterComposeContext {
  err: Error;
  method: string;
}
