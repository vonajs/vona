import type { Constructable, OmitNever, VonaContext } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDatabaseClientRecord } from '../database.ts';
import type { EntityBaseEmpty } from '../entityBaseEmpty.ts';
import type { IModelMethodOptionsGeneral } from '../model.ts';
import type { ITableRecord } from './table.ts';

export type TypeModelRelationType = 'hasOne' | 'BelongsTo' | 'hasMany' | 'BelongsToMany';
export type TypeModelRelations<RelationNames extends string = never> = {
  [key in ((RelationNames extends string ? RelationNames : never))]?: TypeModelRelation;
};

export interface TypeModelRelation<Model extends BeanModelMeta = BeanModelMeta> {
  type: 'hasOne';
  model: (() => Constructable<Model>) | Constructable<Model>;
  key: string;
}

export interface IModelRecord {}

export type TypeDynamicTableName<T extends EntityBaseEmpty = EntityBaseEmpty> =
  (
    ctx: VonaContext,
    defaultTable: keyof ITableRecord,
    modelInstance: BeanModelMeta<T>,
    method?: string,
    methodParams?: any[],
    methodOptions?: IModelMethodOptionsGeneral,
  ) => string;

export interface IDecoratorModelOptions<RelationNames extends string = never> {
  entity?: Constructable<EntityBaseEmpty>;
  table?: TypeDynamicTableName<EntityBaseEmpty> | keyof ITableRecord;
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableUpdateTime?: boolean;
  cacheOptions?: IDecoratorSummerCacheOptions | false;
  cacheKeyAux?: string;
  cacheNotKey?: boolean;
  clientName?: keyof IDatabaseClientRecord;
  relations?: TypeModelRelations<RelationNames>;
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
