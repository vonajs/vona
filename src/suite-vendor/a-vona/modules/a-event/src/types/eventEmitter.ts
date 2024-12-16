import { ServiceOnion } from 'vona-module-a-onion';

export interface IEventJobContext<DATA> {
  eventName: keyof IEventEmitterRecord;
  data: DATA;
}

export interface IEventEmitterRecord {}

export interface IDecoratorEventEmitterOptions {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    eventEmitter: ServiceOnion<IDecoratorEventEmitterOptions, keyof IEventEmitterRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    // eventEmitter: OmitNever<IEventEmitterRecord>;
  }

  export interface ISceneCustomRecord {
    eventEmitter: never;
  }
}
