import { IOnionOptionsDeps, IOnionOptionsEnable } from './onion.js';

export interface IAopRecord {}

export type TypeDecoratorAopOptionsMatch = string | RegExp | (string | RegExp)[];

export interface IDecoratorAopOptions extends IOnionOptionsEnable, IOnionOptionsDeps<keyof IAopRecord> {
  match?: TypeDecoratorAopOptionsMatch;
  ignore?: TypeDecoratorAopOptionsMatch;
}
