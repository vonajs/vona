import type { Constructable, OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type { IDatabaseClientRecord } from '../database.ts';
import type { IDecoratorEntityOptions } from './entity.ts';

export interface IModelRecord {}

export interface IDecoratorModelOptions<T = unknown> {
  entity?: Constructable<T>;
  table?: string;
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableUpdateTime?: boolean;
  cacheOptions?: IDecoratorSummerCacheOptions | false;
  cacheKeyAux?: string;
  cacheNotKey?: boolean;
  clientName?: keyof IDatabaseClientRecord;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    model: ServiceOnion<IDecoratorModelOptions<IDecoratorEntityOptions>, keyof IModelRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    model: OmitNever<IModelRecord>;
  }

  export interface IBeanSceneRecord {
    model: never;
  }
}
