import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationBelongsTo, IModelRelationBelongsToMany, IModelRelationHasMany, IModelRelationHasOne, IModelRelationOptionsMany, IModelRelationOptionsOne, TypeSymbolKeyEntity } from '../types/relations.ts';

export function hasOne<MODEL extends BeanModelMeta>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL>,
): IModelRelationHasOne<MODEL> {
  return { type: 'hasOne', model: classModel, key, options };
}

export function belongsTo<MODELSelf extends BeanModelMeta, MODEL extends BeanModelMeta>(
  _classModelSelf: (() => Constructable<MODELSelf>) | Constructable<MODELSelf>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL>,
): IModelRelationBelongsTo<MODELSelf, MODEL> {
  return { type: 'belongsTo', model: classModel, key, options };
}

export function hasMany<MODEL extends BeanModelMeta>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsMany<MODEL>,
): IModelRelationHasMany<MODEL> {
  options = options ?? {};
  return { type: 'hasMany', model: classModel, key, ...options };
}

export function belongsToMany<MODELMiddle extends BeanModelMeta, MODEL extends BeanModelMeta>(
  classModelMiddle: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  keyFrom: keyof MODELMiddle[TypeSymbolKeyEntity],
  keyTo: keyof MODELMiddle[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsMany<MODEL>,
): IModelRelationBelongsToMany<MODELMiddle, MODEL> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relation = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
