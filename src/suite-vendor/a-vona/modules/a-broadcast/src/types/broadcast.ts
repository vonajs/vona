import type { ILocalInfos, OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';

export interface IBroadcastEmitOptions {
  locale?: keyof ILocalInfos;
  instanceName?: string | null | undefined;
}

export interface IBroadcastExecute<DATA = unknown> {
  execute(data?: DATA, isEmitter?: boolean): Promise<void>;
}

export interface IBroadcastJobContext<DATA> {
  broadcastName: keyof IBroadcastRecord;
  data?: DATA;
  options?: IBroadcastEmitOptions;
  callerId?: string;
}

export interface IBroadcastRecord {}

export interface IDecoratorBroadcastOptions {
  transaction?: boolean;
  instance?: boolean;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    broadcast: ServiceOnion<IDecoratorBroadcastOptions, keyof IBroadcastRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    broadcast: OmitNever<IBroadcastRecord>;
  }

  export interface IBeanSceneRecord {
    broadcast: never;
  }
}
