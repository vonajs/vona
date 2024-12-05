import { IMiddlewareBaseEnable } from './middleware.js';

export interface IAopRecord {}

export type TypeDecoratorAopOptionsMatch = string | RegExp | (string | RegExp)[];

export interface IDecoratorAopOptions extends IMiddlewareBaseEnable {
  match?: TypeDecoratorAopOptionsMatch;
  ignore?: TypeDecoratorAopOptionsMatch;
  dependencies?: (keyof IAopRecord)[] | keyof IAopRecord;
  dependents?: (keyof IAopRecord)[] | keyof IAopRecord;
}
