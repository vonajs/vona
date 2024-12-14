import { Next } from '../../lib/decorator/type/function.js';
import { IOnionOptionsBase, IOnionOptionsDeps } from './onion.js';

export interface ISocketConnectionRecord {}

export interface ISocketConnectionExecute {
  execute(options: IDecoratorSocketConnectionOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketConnectionOptions
  extends IOnionOptionsBase,
    IOnionOptionsDeps<keyof ISocketConnectionRecord> {}
