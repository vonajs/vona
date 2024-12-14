import { ConfigInstanceBase } from '../config/instance.js';
import { IOnionOptionsDeps, IOnionOptionsEnable } from './onion.js';

export interface IStartupRecord {}

export interface IStartupExecute {
  execute(options?: IInstanceStartupOptions): Promise<void>;
}

export interface IDecoratorStartupOptions extends IOnionOptionsEnable, IOnionOptionsDeps<IStartupRecord> {
  instance?: boolean;
  debounce?: boolean | number;
  transaction?: boolean;
  after?: boolean;
}

export interface IInstanceStartupOptions {
  force?: boolean;
  configInstanceBase?: ConfigInstanceBase;
}
