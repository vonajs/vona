import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationBelongsTo, IModelRelationBelongsToMany, IModelRelationHasMany, IModelRelationHasOne, IModelRelationOptionsMany, IModelRelationOptionsOne } from '../types/relationsDef.ts';

function hasOne<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>,
): IModelRelationHasOne<MODEL, AUTOLOAD> {
  return { type: 'hasOne', model: classModel, key, options };
}

function belongsTo<MODELSelf extends BeanModelMeta, MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  _classModelSelf: (() => Constructable<MODELSelf>) | Constructable<MODELSelf>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>,
): IModelRelationBelongsTo<MODELSelf, MODEL, AUTOLOAD> {
  return { type: 'belongsTo', model: classModel, key, options };
}

function hasMany<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  OPTIONS extends IModelRelationOptionsMany<MODEL, AUTOLOAD, ModelJoins> | undefined = undefined,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): IModelRelationHasMany<MODEL, AUTOLOAD> {
  const options2 = options ?? {};
  return { type: 'hasMany', model: classModel, key, ...options2 };
}

function belongsToMany<
  MODELMiddle extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  OPTIONS extends IModelRelationOptionsMany<MODEL, AUTOLOAD, ModelJoins> | undefined = undefined,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModelMiddle: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  keyFrom: keyof MODELMiddle[TypeSymbolKeyEntity],
  keyTo: keyof MODELMiddle[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): IModelRelationBelongsToMany<MODELMiddle, MODEL, AUTOLOAD> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relation = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
