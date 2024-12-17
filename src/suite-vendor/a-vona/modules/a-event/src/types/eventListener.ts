import { Next, OmitNever } from 'vona';
import { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch, ServiceOnion } from 'vona-module-a-onion';
import { IEventRecord } from './event.js';

export interface IEventExecute<ARGS extends unknown[] = unknown[], RESULT = unknown> {
  execute(args: ARGS, next: Next): Promise<RESULT>;
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

  export interface ISceneCustomRecord {
    eventListener: never;
  }
}
