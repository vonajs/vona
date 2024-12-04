import { IMiddlewareBase, Next } from './middleware.js';

export interface ISocketConnectionRecord {}

export interface ISocketConnectionExecute {
  execute(options: IDecoratorSocketConnectionOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketConnectionOptions extends IMiddlewareBase {
  dependencies?: (keyof ISocketConnectionRecord)[] | keyof ISocketConnectionRecord;
  dependents?: (keyof ISocketConnectionRecord)[] | keyof ISocketConnectionRecord;
}
