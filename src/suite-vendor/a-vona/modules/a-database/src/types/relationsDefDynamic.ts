import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from './model.ts';
import type { TypeModelColumn } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeSymbolKeyEntity } from './relations.ts';
import type { IModelRelationOptionsMany, IModelRelationOptionsOne, TypeModelClassLike } from './relationsDef.ts';

// export type TypeModelRelationDynamic<MODELSelf extends BeanModelMeta | undefined, MODELTarget extends BeanModelMeta> =
//   IModelRelationHasOneDynamic<MODELTarget> |
//   IModelRelationBelongsToDynamic<MODELSelf, MODELTarget> |
//   IModelRelationHasManyDynamic<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOneDynamic<
  MODEL extends BeanModelMeta,
  OPTIONS extends IModelRelationOptionsOneDynamic<MODEL> = {},
> {
  type?: 'hasOne';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationBelongsToDynamic<
  MODELSelf extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  OPTIONS extends IModelRelationOptionsOneDynamic<MODEL> = {},
> {
  type?: 'belongsTo';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODELSelf[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationHasManyDynamic<
  MODEL extends BeanModelMeta,
  OPTIONS extends IModelRelationOptionsManyDynamic<MODEL, ModelJoins> = {},
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'hasMany';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationBelongsToManyDynamic<
  MODELMiddle extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  OPTIONS extends IModelRelationOptionsManyDynamic<MODEL, ModelJoins> = {},
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'belongsToMany';
  modelMiddle?: TypeModelClassLike<MODELMiddle>;
  model?: TypeModelClassLike<MODEL>;
  keyFrom?: keyof MODELMiddle[TypeSymbolKeyEntity];
  keyTo?: keyof MODELMiddle[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationOptionsOneDynamic<MODEL extends BeanModelMeta>
  extends IModelRelationIncludeWrapper<MODEL>, Omit<IModelRelationOptionsOne<MODEL, false, TypeModelColumn<MODEL[TypeSymbolKeyEntity]>>, 'autoload'> {}

export interface IModelRelationOptionsManyDynamic<
  MODEL extends BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>
  extends IModelRelationIncludeWrapper<MODEL>, Omit<IModelRelationOptionsMany<MODEL, false, TypeModelColumn<MODEL[TypeSymbolKeyEntity]>, ModelJoins>, 'autoload'> {}
