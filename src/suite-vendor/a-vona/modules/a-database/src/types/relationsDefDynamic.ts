import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from './model.ts';
import type { TypeSymbolKeyEntity } from './relations.ts';
import type { IModelRelationOptionsMany, IModelRelationOptionsOne } from './relationsDef.ts';

export type TypeModelRelationDynamic<MODELSelf extends BeanModelMeta = BeanModelMeta, MODELTarget extends BeanModelMeta = BeanModelMeta> =
  IModelRelationHasOneDynamic<MODELTarget> |
  IModelRelationBelongsToDynamic<MODELSelf, MODELTarget> |
  IModelRelationHasManyDynamic<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOneDynamic<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasOne';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsToDynamic<
  MODELSelf extends BeanModelMeta = BeanModelMeta,
  MODEL extends BeanModelMeta = BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsTo';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODELSelf[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD>;
}

export interface IModelRelationHasManyDynamic<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false> {
  type?: 'hasMany';
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD>;
}

export interface IModelRelationBelongsToManyDynamic<
  MODELMiddle extends BeanModelMeta = BeanModelMeta,
  MODEL extends BeanModelMeta = BeanModelMeta,
  AUTOLOAD extends boolean = false,
> {
  type?: 'belongsToMany';
  modelMiddle?: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>;
  model?: (() => Constructable<MODEL>) | Constructable<MODEL>;
  keyFrom?: keyof MODELMiddle[TypeSymbolKeyEntity];
  keyTo?: keyof MODELMiddle[TypeSymbolKeyEntity];
  options?: IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD>;
}

export interface IModelRelationOptionsOneDynamic<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false>
  extends IModelRelationIncludeWrapper<MODEL>, IModelRelationOptionsOne<MODEL, AUTOLOAD> {}

export interface IModelRelationOptionsManyDynamic<MODEL extends BeanModelMeta = BeanModelMeta, AUTOLOAD extends boolean = false>
  extends IModelRelationIncludeWrapper<MODEL>, IModelRelationOptionsMany<MODEL, AUTOLOAD> {}
