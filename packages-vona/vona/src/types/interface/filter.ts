import { IMiddlewareBase, Next } from './middleware.js';

export interface IFilterRecordGlobal {}
export interface IFilterRecordLocal {}
export type IFilterRecord = IFilterRecordGlobal & IFilterRecordLocal;

export interface IFilterJson {
  json(err: Error, options: IDecoratorFilterOptions, next: Next): void;
}

export interface IFilterLog {
  log(err: Error, options: IDecoratorFilterOptions, next: Next): void;
}

export interface IDecoratorFilterOptions {}

export interface IDecoratorFilterOptionsGlobal extends IMiddlewareBase {
  global: true;
  dependencies?: (keyof IFilterRecordGlobal)[] | keyof IFilterRecordGlobal;
  dependents?: (keyof IFilterRecordGlobal)[] | keyof IFilterRecordGlobal;
}
