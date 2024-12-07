import { IMiddlewareBaseEnable } from './middleware.js';

export interface IStartupRecord {}

export interface IStartupExecute {
  execute(): Promise<void>;
}

export interface IDecoratorStartupOptions extends IMiddlewareBaseEnable {
  instance?: boolean;
  dependencies?: (keyof IStartupRecord)[] | keyof IStartupRecord;
  dependents?: (keyof IStartupRecord)[] | keyof IStartupRecord;
}
