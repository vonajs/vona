import { Next } from '../../lib/decorator/type/function.js';
import { IOnionSliceBase } from './onion.js';

export interface ISocketConnectionRecord {}

export interface ISocketConnectionExecute {
  execute(options: IDecoratorSocketConnectionOptions, next: Next): Promise<any>;
}

export interface IDecoratorSocketConnectionOptions extends IOnionSliceBase {
  dependencies?: (keyof ISocketConnectionRecord)[] | keyof ISocketConnectionRecord;
  dependents?: (keyof ISocketConnectionRecord)[] | keyof ISocketConnectionRecord;
}
