import { IMiddlewareBase, Next } from './middleware.js';

export interface IInterceptorRecordGlobal {}
export interface IInterceptorRecordLocal {}
export type IInterceptorRecord = IInterceptorRecordGlobal & IInterceptorRecordLocal;

export interface IInterceptorExecute {
  execute(options: IDecoratorInterceptorOptions, next: Next): Promise<any>;
}

export interface IDecoratorInterceptorOptions {
  enable?: boolean;
}

export interface IDecoratorInterceptorOptionsGlobal extends IMiddlewareBase {
  global: true;
  dependencies?: (keyof IInterceptorRecordGlobal)[] | keyof IInterceptorRecordGlobal;
  dependents?: (keyof IInterceptorRecordGlobal)[] | keyof IInterceptorRecordGlobal;
}
