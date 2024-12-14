import { IOnionOptionsEnable } from './onion.js';

export interface IAopRecord {}

export type TypeDecoratorAopOptionsMatch = string | RegExp | (string | RegExp)[];

export interface IDecoratorAopOptions extends IOnionOptionsEnable {
  match?: TypeDecoratorAopOptionsMatch;
  ignore?: TypeDecoratorAopOptionsMatch;
  dependencies?: (keyof IAopRecord)[] | keyof IAopRecord;
  dependents?: (keyof IAopRecord)[] | keyof IAopRecord;
}
