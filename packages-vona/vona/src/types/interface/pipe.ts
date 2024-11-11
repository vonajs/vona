import { IMiddlewareBase, Next } from './middleware.js';

export interface IPipeRecordGlobal {}
export interface IPipeRecordLocal {}
export type IPipeRecord = IPipeRecordGlobal & IPipeRecordLocal;

export interface IPipeExecute {
  execute(options: IDecoratorPipeOptions, next: Next): Promise<any>;
}

export interface IDecoratorPipeOptions extends IMiddlewareBase {
  global?: boolean;
  dependencies?: (keyof IPipeRecordGlobal)[] | keyof IPipeRecordGlobal;
  dependents?: (keyof IPipeRecordGlobal)[] | keyof IPipeRecordGlobal;
}
