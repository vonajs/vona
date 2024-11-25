import { IMiddlewareBase, Next } from './middleware.js';

export interface IFilterRecordGlobal {}
export interface IFilterRecordLocal {}
export type IFilterRecord = IFilterRecordGlobal & IFilterRecordLocal;

export interface IFilterExecute {
  execute(options: IDecoratorFilterOptions, next: Next): Promise<any>;
}

export interface IDecoratorFilterOptions {}

export interface IDecoratorFilterOptionsGlobal extends IMiddlewareBase {
  global: true;
  dependencies?: (keyof IFilterRecordGlobal)[] | keyof IFilterRecordGlobal;
  dependents?: (keyof IFilterRecordGlobal)[] | keyof IFilterRecordGlobal;
}
