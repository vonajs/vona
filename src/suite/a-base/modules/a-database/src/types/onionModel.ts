import { OmitNever, Onion } from 'vona';
import { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';

export interface IModelRecord {}

export interface IDecoratorModelOptions<T extends object = {}> {
  entity?: T;
  table?: string;
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableUpdateTime?: boolean;
  cacheOptions?: IDecoratorSummerCacheOptions | false;
  cacheKeyAux?: string;
  cacheNotKey?: boolean;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    model: Onion<IDecoratorModelOptions, keyof IModelRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    model: OmitNever<IModelRecord>;
  }

  export interface ISceneCustomRecord {
    model: never;
  }
}
