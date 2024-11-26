import { IMiddlewareBase, Next } from './middleware.js';

export interface IGuardRecordGlobal {}
export interface IGuardRecordLocal {}
export type IGuardRecord = IGuardRecordGlobal & IGuardRecordLocal;

export interface IGuardExecute {
  execute(options: IDecoratorGuardOptions, next: Next): Promise<boolean>;
}

export interface IDecoratorGuardOptions {}

export interface IDecoratorGuardOptionsGlobal extends IMiddlewareBase {
  global: true;
  dependencies?: (keyof IGuardRecordGlobal)[] | keyof IGuardRecordGlobal;
  dependents?: (keyof IGuardRecordGlobal)[] | keyof IGuardRecordGlobal;
}
