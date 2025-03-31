import type { OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export interface ICacheMemRecord {}

export interface IDecoratorCacheMemOptions extends IOnionOptionsEnable {
  max?: number;
  ttl?: number;
  updateAgeOnGet?: boolean;
  updateAgeOnHas?: boolean;
  broadcastOnSet?: boolean | 'del';
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    cacheMem: ServiceOnion<IDecoratorCacheMemOptions, keyof ICacheMemRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    cacheMem: OmitNever<ICacheMemRecord>;
  }

  export interface IBeanSceneRecord {
    cacheMem: never;
  }
}
