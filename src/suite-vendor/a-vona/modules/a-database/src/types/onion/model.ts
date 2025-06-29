import type { Constructable, OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDatabaseClientRecord } from '../database.ts';
import type { EntityBaseEmpty } from '../entityBaseEmpty.ts';
import type { IModelMethodOptionsGeneral } from '../model.ts';
import type { ITableRecord } from './table.ts';

export interface IModelRecord {}

export type TypeDynamicTableName<T extends EntityBaseEmpty = EntityBaseEmpty> =
  (
    this: BeanModelMeta<T>,
    defaultTable?: keyof ITableRecord,
    method?: string,
    methodParams?: any[],
    methodOptions?: IModelMethodOptionsGeneral,
  ) => string;

export interface IDecoratorModelOptions<T extends EntityBaseEmpty = EntityBaseEmpty> {
  entity?: Constructable<T>;
  table?: TypeDynamicTableName<T> | keyof ITableRecord;
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
    model: ServiceOnion<IDecoratorModelOptions<EntityBaseEmpty>, keyof IModelRecord>;
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
