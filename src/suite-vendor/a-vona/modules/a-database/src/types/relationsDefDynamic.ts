import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from './model.ts';
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
  AUTOLOAD extends boolean = false,
  OPTIONS extends IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD> = {},
> {
  type?: 'hasOne';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODEL[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationBelongsToDynamic<
  MODELSelf extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  OPTIONS extends IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD> = {},
> {
  type?: 'belongsTo';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof MODELSelf[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationHasManyDynamic<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  OPTIONS extends IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD, ModelJoins> = {},
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
  AUTOLOAD extends boolean = false,
  OPTIONS extends IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD, ModelJoins> = {},
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'belongsToMany';
  modelMiddle?: TypeModelClassLike<MODELMiddle>;
  model?: TypeModelClassLike<MODEL>;
  keyFrom?: keyof MODELMiddle[TypeSymbolKeyEntity];
  keyTo?: keyof MODELMiddle[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationOptionsOneDynamic<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>
  extends IModelRelationIncludeWrapper<MODEL>, Omit<IModelRelationOptionsOne<MODEL, AUTOLOAD>, 'autoload'> {}

export interface IModelRelationOptionsManyDynamic<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>
  extends IModelRelationIncludeWrapper<MODEL>, Omit<IModelRelationOptionsMany<MODEL, AUTOLOAD, ModelJoins>, 'autoload'> {}
