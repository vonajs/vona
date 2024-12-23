import { OmitNever } from 'vona';
import { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import { IDecoratorEntityOptions } from './entity.js';
import { ServiceOnion } from 'vona-module-a-onion';

export interface IModelRecord {}

// todo: 不再使用EntityBaseTemp之后，就需要使用这行代码
//export interface IDecoratorModelOptions<T extends IDecoratorEntityOptions = IDecoratorEntityOptions> {
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
