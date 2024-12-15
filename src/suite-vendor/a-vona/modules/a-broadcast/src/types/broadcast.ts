import { OmitNever } from 'vona';
import { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export interface IBroadcastExecute<DATA = unknown> {
  execute(data: DATA, sameAsCaller?: boolean): Promise<void>;
}

export interface IBroadcastJobContext<DATA> {
  broadcastName: keyof IBroadcastRecord;
  data: DATA;
  callerId: string;
}

export interface IBroadcastRecord {}

export interface IDecoratorBroadcastOptions extends IOnionOptionsEnable {
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

  export interface ISceneCustomRecord {
    broadcast: never;
  }
}
