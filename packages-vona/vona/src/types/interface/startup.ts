import { ConfigInstanceBase } from '../config/instance.js';
import { IMiddlewareBaseEnable } from './middleware.js';

export interface IStartupRecord {}

export interface IStartupExecute {
  execute(options?: IInstanceStartupOptions): Promise<void>;
}

export interface IDecoratorStartupOptions extends IMiddlewareBaseEnable {
  instance?: boolean;
  debounce?: boolean | number;
  transaction?: boolean;
  dependencies?: (keyof IStartupRecord)[] | keyof IStartupRecord;
  dependents?: (keyof IStartupRecord)[] | keyof IStartupRecord;
}

export interface IInstanceStartupOptions {
  force?: boolean;
  configInstanceBase?: ConfigInstanceBase;
}
