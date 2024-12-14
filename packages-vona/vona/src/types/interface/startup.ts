import { ConfigInstanceBase } from '../config/instance.js';
import { IOnionSliceEnable } from './onion.js';

export interface IStartupRecord {}

export interface IStartupExecute {
  execute(options?: IInstanceStartupOptions): Promise<void>;
}

export interface IDecoratorStartupOptions extends IOnionSliceEnable {
  instance?: boolean;
  debounce?: boolean | number;
  transaction?: boolean;
  after?: boolean;
  dependencies?: (keyof IStartupRecord)[] | keyof IStartupRecord;
  dependents?: (keyof IStartupRecord)[] | keyof IStartupRecord;
}

export interface IInstanceStartupOptions {
  force?: boolean;
  configInstanceBase?: ConfigInstanceBase;
}
