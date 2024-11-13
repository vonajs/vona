import { IMiddlewareBase, Next } from './middleware.js';

export interface IConnectionRecord {}

export interface IConnectionExecute {
  execute(options: IDecoratorConnectionOptions, next: Next): Promise<any>;
}

export interface IDecoratorConnectionOptions extends IMiddlewareBase {
  dependencies?: (keyof IConnectionRecord)[] | keyof IConnectionRecord;
  dependents?: (keyof IConnectionRecord)[] | keyof IConnectionRecord;
}
