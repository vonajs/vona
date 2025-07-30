import type { Constructable, OmitNever, VonaContext } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDatabaseClientRecord } from '../database.ts';
import type { EntityBaseEmpty } from '../entityBaseEmpty.ts';
import type { TypeModelClassLikeGeneral } from '../relations.ts';
import type { ITableRecord } from './table.ts';

export interface IModelRecord {}
export interface IModelClassRecord {}

export type TypeDynamicTableName<T extends EntityBaseEmpty = EntityBaseEmpty> =
  (ctx: VonaContext, defaultTable: keyof ITableRecord, modelInstance: BeanModelMeta<T>) => string;

export type TypeDynamicClientName<T extends EntityBaseEmpty = EntityBaseEmpty> =
  (ctx: VonaContext, modelInstance: BeanModelMeta<T>) => keyof IDatabaseClientRecord;

export type TypeModelsClearedByFn<T extends EntityBaseEmpty = EntityBaseEmpty> =
  (ctx: VonaContext, modelInstance: BeanModelMeta<T>) => Promise<void>;

export interface IDecoratorModelOptions {
  entity?: Constructable<EntityBaseEmpty>;
  table?: TypeDynamicTableName<EntityBaseEmpty> | keyof ITableRecord;
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableUpdateTime?: boolean;
  cache?: {
    query?: IDecoratorSummerCacheOptions | false;
    entity?: IDecoratorSummerCacheOptions | false;
    keysAux?: string | string[];
    modelsClear?: TypeModelClassLikeGeneral | TypeModelClassLikeGeneral[];
    modelsClearedBy?: keyof IModelClassRecord | (keyof IModelClassRecord)[];// TypeModelClassLikeGeneral | TypeModelClassLikeGeneral[];
    modelsClearedByFn?: TypeModelsClearedByFn<EntityBaseEmpty>;
  };
  clientName?: TypeDynamicClientName<EntityBaseEmpty> | keyof IDatabaseClientRecord;
  // should not use TypeModelRelations or {}
  relations?: Record<never, never>;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    model: ServiceOnion<IDecoratorModelOptions, keyof IModelRecord>;
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
