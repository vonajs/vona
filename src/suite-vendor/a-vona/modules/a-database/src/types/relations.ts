import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelSelectParamsOrder } from './model.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';

export type TypeModelRelationType = 'hasOne' | 'belongsTo' | 'hasMany' | 'belongsToMany';
export type TypeModelRelations<RelationNames extends string = never> = {
  [key in ((RelationNames extends string ? RelationNames : never))]?: TypeModelRelation;
};

export type TypeModelRelation<MODELSelf extends BeanModelMeta = BeanModelMeta, MODELTarget extends BeanModelMeta = BeanModelMeta> =
  IModelRelationHasOne<MODELTarget> | IModelRelationBelongsTo<MODELSelf, MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOne<MODEL extends BeanModelMeta = BeanModelMeta> {
  type?: 'hasOne';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL['$entity'] | string;
  options?: IModelRelationHasOneOptions<MODEL>;
}

export interface IModelRelationBelongsTo<MODELSelf extends BeanModelMeta = BeanModelMeta, MODEL extends BeanModelMeta = BeanModelMeta> {
  type?: 'belongsTo';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODELSelf['$entity'] | string;
  options?: IModelRelationBelongsToOptions<MODEL>;
}

export interface IModelRelationHasOneOptions<MODEL extends BeanModelMeta = BeanModelMeta> {
  autoload?: boolean;
  columns?: TypeModelColumns<MODEL['$entity']>;
}

export interface IModelRelationBelongsToOptions<MODEL extends BeanModelMeta = BeanModelMeta> {
  autoload?: boolean;
  columns?: TypeModelColumns<MODEL['$entity']>;
}

export interface IModelRelationHasManyOptions<MODEL extends BeanModelMeta = BeanModelMeta> {
  autoload?: boolean;
  columns?: TypeModelColumns<MODEL['$entity']>;
  where?: TypeModelWhere<MODEL['$entity']>;
  orders?: IModelSelectParamsOrder<MODEL['$entity']>[];
  limit?: number;
  offset?: number;
}
