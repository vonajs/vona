import type { Constructable, TypeClassOfClassLike } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelSelectParamsOrder } from './model.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';
import type { IDecoratorModelOptions } from './onion/model.ts';

export type TypeModelRelationType = 'hasOne' | 'belongsTo' | 'hasMany' | 'belongsToMany';
export interface TypeModelRelations {
  [key: string]: TypeModelRelation<any, any>;
}

export type TypeModelRelation<MODELSelf extends BeanModelMeta = BeanModelMeta, MODELTarget extends BeanModelMeta = BeanModelMeta> =
  IModelRelationHasOne<MODELTarget> |
  IModelRelationBelongsTo<MODELSelf, MODELTarget> |
  IModelRelationHasMany<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOne<MODEL extends BeanModelMeta = BeanModelMeta> {
  type?: 'hasOne';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL['$entity'];
  options?: IModelRelationOptionsOne<MODEL>;
}

export interface IModelRelationBelongsTo<MODELSelf extends BeanModelMeta = BeanModelMeta, MODEL extends BeanModelMeta = BeanModelMeta> {
  type?: 'belongsTo';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODELSelf['$entity'];
  options?: IModelRelationOptionsOne<MODEL>;
}

export interface IModelRelationHasMany<MODEL extends BeanModelMeta = BeanModelMeta> {
  type?: 'hasMany';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL['$entity'];
  options?: IModelRelationOptionsMany<MODEL>;
}

export interface IModelRelationBelongsToMany<MODELMiddle extends BeanModelMeta = BeanModelMeta, MODEL extends BeanModelMeta = BeanModelMeta> {
  type?: 'belongsToMany';
  modelMiddle?: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>;
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  keyFrom?: keyof MODELMiddle['$entity'];
  keyTo?: keyof MODELMiddle['$entity'];
  options?: IModelRelationOptionsMany<MODEL>;
}

export interface IModelRelationOptionsOne<MODEL extends BeanModelMeta = BeanModelMeta> {
  autoload?: boolean;
  columns?: TypeModelColumns<MODEL['$entity']>;
}

export interface IModelRelationOptionsMany<MODEL extends BeanModelMeta = BeanModelMeta> {
  autoload?: boolean;
  columns?: TypeModelColumns<MODEL['$entity']>;
  where?: TypeModelWhere<MODEL['$entity']>;
  orders?: IModelSelectParamsOrder<MODEL['$entity']>[];
  limit?: number;
  offset?: number;
}

export type TypeModelParamsInclude<ModelOptions extends IDecoratorModelOptions | unknown> = ModelOptions extends IDecoratorModelOptions ? {
  [relationName in keyof ModelOptions['relations'] ]?: TypeModelParamsRelationOptions<ModelOptions['relations'][relationName]>;
} : never;

export type TypeModelParamsRelationOptions<Relation> =
  boolean
  | Omit<TypeUtilGetRelationOptions<Relation>, 'autoload'>
  & { include?: TypeModelParamsInclude<TypeUtilGetModelOptions<TypeUtilGetRelationModel<Relation>>> };

export type TypeUtilGetRelationType<Relation> = Relation extends { type?: infer TYPE } ? TYPE : unknown;
export type TypeUtilGetRelationModel<Relation> = TypeClassOfClassLike<Relation extends { model?: infer MODEL } ? MODEL : unknown>;
export type TypeUtilGetRelationOptions<Relation> = Relation extends { options?: infer OPTIONS } ? OPTIONS : unknown;
export type TypeUtilGetModelOptions<Model extends BeanModelMeta | unknown> = Model extends BeanModelMeta ? Model['$modelOptions'] : unknown;
