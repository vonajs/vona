import { IMiddlewareBase } from './middleware.js';

export interface IGuardRecordGlobal {}
export interface IGuardRecordLocal {}
export type IGuardRecord = IGuardRecordGlobal & IGuardRecordLocal;

export interface IDecoratorGuardOptions extends IMiddlewareBase {
  global?: boolean;
  dependencies?: (keyof IGuardRecordGlobal)[] | keyof IGuardRecordGlobal;
  dependents?: (keyof IGuardRecordGlobal)[] | keyof IGuardRecordGlobal;
}
