import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationBelongsToDynamic, IModelRelationBelongsToManyDynamic, IModelRelationHasManyDynamic, IModelRelationHasOneDynamic, IModelRelationOptionsManyDynamic, IModelRelationOptionsOneDynamic } from '../types/relationsDefDynamic.ts';

function hasOne<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean,
  OPTIONS extends IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD>,
>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: OPTIONS,
): IModelRelationHasOneDynamic<MODEL, AUTOLOAD, OPTIONS> {
  return { type: 'hasOne', model: classModel, key, options };
}

function belongsTo<
  MODELSelf extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean,
  OPTIONS extends IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD>,
>(
  _classModelSelf: (() => Constructable<MODELSelf>) | Constructable<MODELSelf>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf[TypeSymbolKeyEntity],
  options?: OPTIONS,
): IModelRelationBelongsToDynamic<MODELSelf, MODEL, AUTOLOAD, OPTIONS> {
  return { type: 'belongsTo', model: classModel, key, options };
}

function hasMany<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean,
  // not use `| undefined = undefined` or `= {}`
  OPTIONS extends IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD, ModelJoins>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): IModelRelationHasManyDynamic<MODEL, AUTOLOAD, OPTIONS, ModelJoins> {
  return { type: 'hasMany', model: classModel, key, options };
}

function belongsToMany<
  MODELMiddle extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean,
  // not use `| undefined = undefined` or `= {}`
  OPTIONS extends IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD, ModelJoins>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModelMiddle: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  keyFrom: keyof MODELMiddle[TypeSymbolKeyEntity],
  keyTo: keyof MODELMiddle[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): IModelRelationBelongsToManyDynamic<MODELMiddle, MODEL, AUTOLOAD, OPTIONS, ModelJoins> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relationDynamic = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
