import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch, ServiceOnion } from 'vona-module-a-onion';
import type { IEventRecord } from './event.ts';

// not use `data: DATA`
export type NextEvent<DATA = unknown, RESULT = unknown> = (data?: DATA) => Promise<RESULT>;

export interface IEventExecute<DATA = unknown, RESULT = unknown> {
  execute: (data: DATA, next: Next) => Promise<RESULT>;
}

export interface IEventListenerRecord {}

export interface IDecoratorEventListenerOptions
  extends IOnionOptionsEnable,
  IOnionOptionsMatch<keyof IEventRecord>,
  IOnionOptionsDeps<keyof IEventListenerRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    eventListener: ServiceOnion<IDecoratorEventListenerOptions, keyof IEventListenerRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    eventListener: OmitNever<IEventListenerRecord>;
  }

  export interface IBeanSceneRecord {
    eventListener: never;
  }
}
