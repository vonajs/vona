import { IMiddlewareBase, Next } from './middleware.js';

export interface IInterceptorRecordGlobal {}
export interface IInterceptorRecordLocal {}
export type IInterceptorRecord = IInterceptorRecordGlobal & IInterceptorRecordLocal;

export interface IInterceptorExecute {
  execute(options: IDecoratorInterceptorOptions, next: Next): Promise<any>;
}

export interface IDecoratorInterceptorOptions extends IMiddlewareBase {
  global?: boolean;
  dependencies?: (keyof IInterceptorRecordGlobal)[] | keyof IInterceptorRecordGlobal;
  dependents?: (keyof IInterceptorRecordGlobal)[] | keyof IInterceptorRecordGlobal;
}
