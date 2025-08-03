import type { Constructable, OmitNever, VonaContext } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type { IDatabaseClientRecord } from '../database.ts';
import type { EntityBaseEmpty } from '../entityBaseEmpty.ts';
import type { TypeModelColumnsStrict } from '../modelWhere.ts';
import type { TypeModelClassLikeGeneral } from '../relations.ts';
import type { ITableRecord } from './table.ts';

export interface IModelRecord {}
export interface IModelClassRecord {}

export type TypeDynamicTableName =
  (ctx: VonaContext, defaultTable: keyof ITableRecord, modelInstance: any) => string;

export type TypeDynamicClientName =
  (ctx: VonaContext, modelInstance: any) => keyof IDatabaseClientRecord;

export type TypeModelsClearedByFn =
  (ctx: VonaContext, modelInstance: any) => Promise<void>;

export type TypeSoftDeletionPruneHandler =
  (ctx: VonaContext, modelInstance: any, options: ISoftDeletionPruneHandlerOptions) => Promise<void>;

export interface ISoftDeletionPruneHandlerOptions {
  expired: number;
}

export interface ISoftDeletionPrune {
  handler?: TypeSoftDeletionPruneHandler;
  expired?: number;
}

export interface IDecoratorModelOptions<TRecord extends EntityBaseEmpty = EntityBaseEmpty> {
  entity?: Constructable<TRecord>;
  table?: TypeDynamicTableName | keyof ITableRecord;
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableCreateTime?: boolean;
  disableUpdateTime?: boolean;
  softDeletionPrune?: ISoftDeletionPrune | boolean;
  cache?: {
    query?: IDecoratorSummerCacheOptions | false;
    entity?: IDecoratorSummerCacheOptions | false;
    keysAux?: TypeModelColumnsStrict<TRecord>;
    modelsClear?: TypeModelClassLikeGeneral | TypeModelClassLikeGeneral[];
    modelsClearedBy?: keyof IModelClassRecord | (keyof IModelClassRecord)[];// TypeModelClassLikeGeneral | TypeModelClassLikeGeneral[];
    modelsClearedByFn?: TypeModelsClearedByFn;
  };
  client?: TypeDynamicClientName | keyof IDatabaseClientRecord;
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
