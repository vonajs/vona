import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelSelectParamsOrder } from './model.ts';
import type { TypeModelColumns, TypeModelWhere } from './modelPro.ts';
import type { TypeSymbolKeyEntity } from './relations.ts';

export type TypeModelRelationType = 'hasOne' | 'belongsTo' | 'hasMany' | 'belongsToMany';
export interface TypeModelRelations {
  [key: string]: TypeModelRelation<any, any>;
}

export type TypeModelRelation<MODELSelf extends BeanModelMeta = BeanModelMeta, MODELTarget extends BeanModelMeta = BeanModelMeta> =
  IModelRelationHasOne<MODELTarget> |
  IModelRelationBelongsTo<MODELSelf, MODELTarget> |
  IModelRelationHasMany<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOne<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasOne';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsTo<
  MODELSelf extends BeanModelMeta = BeanModelMeta,
  MODEL extends BeanModelMeta = BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsTo';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODELSelf[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>;
}

export interface IModelRelationHasMany<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasMany';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsToMany<
  MODELMiddle extends BeanModelMeta = BeanModelMeta,
  MODEL extends BeanModelMeta = BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsToMany';
  modelMiddle?: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>;
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  keyFrom?: keyof MODELMiddle[TypeSymbolKeyEntity];
  keyTo?: keyof MODELMiddle[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>;
}

export interface IModelRelationOptionsOne<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  autoload?: AUTOLOAD;
  columns?: TypeModelColumns<MODEL[TypeSymbolKeyEntity]>;
}

export interface IModelRelationOptionsMany<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  autoload?: AUTOLOAD;
  columns?: TypeModelColumns<MODEL[TypeSymbolKeyEntity]>;
  where?: TypeModelWhere<MODEL[TypeSymbolKeyEntity]>;
  orders?: IModelSelectParamsOrder<MODEL[TypeSymbolKeyEntity]>[];
  limit?: number;
  offset?: number;
}
