import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from './model.ts';
import type { TypeModelColumn } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeModelClassLike, TypeModelOfModelLike, TypeSymbolKeyEntity } from './relations.ts';
import type { IModelRelationOptionsMany, IModelRelationOptionsOne } from './relationsDef.ts';

// export type TypeModelRelationDynamic<MODELSelf extends BeanModelMeta | undefined, MODELTarget extends BeanModelMeta> =
//   IModelRelationHasOneDynamic<MODELTarget> |
//   IModelRelationBelongsToDynamic<MODELSelf, MODELTarget> |
//   IModelRelationHasManyDynamic<MODELTarget>;

// use optional ? for app config
export interface IModelRelationHasOneDynamic<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  OPTIONS extends IModelRelationOptionsOneDynamic<TypeModelOfModelLike<MODEL>> = {},
> {
  type?: 'hasOne';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationBelongsToDynamic<
  MODELSelf extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  OPTIONS extends IModelRelationOptionsOneDynamic<TypeModelOfModelLike<MODEL>> = {},
> {
  type?: 'belongsTo';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof TypeModelOfModelLike<MODELSelf>[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationHasManyDynamic<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  OPTIONS extends IModelRelationOptionsManyDynamic<TypeModelOfModelLike<MODEL>, ModelJoins> = {},
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'hasMany';
  model?: TypeModelClassLike<MODEL>;
  key?: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationBelongsToManyDynamic<
  MODELMiddle extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  OPTIONS extends IModelRelationOptionsManyDynamic<TypeModelOfModelLike<MODEL>, ModelJoins> = {},
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
> {
  type?: 'belongsToMany';
  modelMiddle?: TypeModelClassLike<MODELMiddle>;
  model?: TypeModelClassLike<MODEL>;
  keyFrom?: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity];
  keyTo?: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity];
  options?: OPTIONS;
}

export interface IModelRelationOptionsOneDynamic<MODEL extends BeanModelMeta>
  extends IModelRelationIncludeWrapper<MODEL>, Omit<IModelRelationOptionsOne<MODEL, false, TypeModelColumn<MODEL[TypeSymbolKeyEntity]>>, 'autoload'> {}

export interface IModelRelationOptionsManyDynamic<
  MODEL extends BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>
  extends IModelRelationIncludeWrapper<MODEL>, Omit<IModelRelationOptionsMany<MODEL, false, TypeModelColumn<MODEL[TypeSymbolKeyEntity]>, ModelJoins>, 'autoload'> {}
