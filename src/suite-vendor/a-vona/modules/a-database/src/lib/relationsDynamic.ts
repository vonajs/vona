import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { TypeModelClassLike, TypeModelOfModelLike, TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationBelongsToDynamic, IModelRelationBelongsToManyDynamic, IModelRelationHasManyDynamic, IModelRelationHasOneDynamic, IModelRelationOptionsManyDynamic, IModelRelationOptionsOneDynamic } from '../types/relationsDefDynamic.ts';

function hasOne<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  OPTIONS extends IModelRelationOptionsOneDynamic<TypeModelOfModelLike<MODEL>>,
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
  OPTIONS extends IModelRelationOptionsOneDynamic<TypeModelOfModelLike<MODEL>>,
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
  OPTIONS extends IModelRelationOptionsManyDynamic<TypeModelOfModelLike<MODEL>, ModelJoins>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModel: TypeModelClassLike<MODEL>,
  key: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): IModelRelationHasManyDynamic<MODEL, OPTIONS, ModelJoins> {
  return { type: 'hasMany', model: classModel, key, options };
}

function belongsToMany<
  MODELMiddle extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  // not use `| undefined = undefined` or `= {}`
  OPTIONS extends IModelRelationOptionsManyDynamic<TypeModelOfModelLike<MODEL>, ModelJoins>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModelMiddle: TypeModelClassLike<MODELMiddle>,
  classModel: TypeModelClassLike<MODEL>,
  keyFrom: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
  keyTo: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): IModelRelationBelongsToManyDynamic<MODELMiddle, MODEL, OPTIONS, ModelJoins> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relationDynamic = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
