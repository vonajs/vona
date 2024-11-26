import { IMiddlewareOptionsMeta } from './middleware.js';

export interface IAopRecord {}

type TypeDecoratorAopOptionsMatch = string | RegExp | (string | RegExp)[];

export interface IDecoratorAopOptions {
  enable?: boolean;
  match?: TypeDecoratorAopOptionsMatch;
  ignore?: TypeDecoratorAopOptionsMatch;
  meta?: IMiddlewareOptionsMeta;
  dependencies?: (keyof IAopRecord)[] | keyof IAopRecord;
  dependents?: (keyof IAopRecord)[] | keyof IAopRecord;
}
