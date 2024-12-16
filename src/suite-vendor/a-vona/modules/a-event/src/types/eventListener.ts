import { OmitNever } from 'vona';
import { IOnionOptionsDeps, IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import { IEventEmitterRecord } from './eventEmitter.js';

export interface IEventExecute<DATA = unknown, RESULT = unknown> {
  execute(data: DATA): Promise<RESULT>;
}

export interface IEventListenerRecord {}

export type TypeDecoratorEventListenerOptionsMatch =
  | keyof IEventEmitterRecord
  | RegExp
  | (keyof IEventEmitterRecord | RegExp)[];

export interface IDecoratorEventListenerOptions
  extends IOnionOptionsEnable,
    IOnionOptionsDeps<keyof IEventListenerRecord> {
  match?: TypeDecoratorEventListenerOptionsMatch;
  ignore?: TypeDecoratorEventListenerOptionsMatch;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    eventListener: ServiceOnion<IDecoratorEventListenerOptions, keyof IEventListenerRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    eventListener: OmitNever<IEventListenerRecord>;
  }

  export interface ISceneCustomRecord {
    eventListener: never;
  }
}
