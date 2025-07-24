import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { TypeModelClassLike, TypeModelOfModelLike, TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationBelongsToDynamic, IModelRelationBelongsToManyDynamic, IModelRelationHasManyDynamic, IModelRelationHasOneDynamic } from '../types/relationsDefDynamic.ts';
import type { IModelRelationOptionsManyMutate, IModelRelationOptionsOneMutate } from '../types/relationsDefMutate.ts';

function hasOne<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  OPTIONS extends IModelRelationOptionsOneMutate<TypeModelOfModelLike<MODEL>>,
>(
  classModel: TypeModelClassLike<MODEL>,
  key: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity],
  options?: OPTIONS,
): IModelRelationHasOneDynamic<MODEL, OPTIONS> {
  return { type: 'hasOne', model: classModel, key, options };
}

function belongsTo<
  MODELSelf extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  OPTIONS extends IModelRelationOptionsOneMutate<TypeModelOfModelLike<MODEL>>,
>(
  _classModelSelf: TypeModelClassLike<MODELSelf>,
  classModel: TypeModelClassLike<MODEL>,
  key: keyof TypeModelOfModelLike<MODELSelf>[TypeSymbolKeyEntity],
  options?: OPTIONS,
): IModelRelationBelongsToDynamic<MODELSelf, MODEL, OPTIONS> {
  return { type: 'belongsTo', model: classModel, key, options };
}

function hasMany<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  // not use `| undefined = undefined` or `= {}`
  OPTIONS extends IModelRelationOptionsManyMutate<TypeModelOfModelLike<MODEL>>,
>(
  classModel: TypeModelClassLike<MODEL>,
  key: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity],
  options?: OPTIONS,
): IModelRelationHasManyDynamic<MODEL, OPTIONS> {
  return { type: 'hasMany', model: classModel, key, options };
}

function belongsToMany<
  MODELMiddle extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
>(
  classModelMiddle: TypeModelClassLike<MODELMiddle>,
  classModel: TypeModelClassLike<MODEL>,
  keyFrom: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
  keyTo: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
): IModelRelationBelongsToManyDynamic<MODELMiddle, MODEL> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo };
}

export const $relationMutate = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
