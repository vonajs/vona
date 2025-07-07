import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationBelongsTo, IModelRelationBelongsToMany, IModelRelationHasMany, IModelRelationHasOne, IModelRelationOptionsMany, IModelRelationOptionsOne, TypeSymbolKeyEntity } from '../types/relations.ts';

export function hasOne<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>,
): IModelRelationHasOne<MODEL, AUTOLOAD> {
  return { type: 'hasOne', model: classModel, key, options };
}

export function belongsTo<MODELSelf extends BeanModelMeta, MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  _classModelSelf: (() => Constructable<MODELSelf>) | Constructable<MODELSelf>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD>,
): IModelRelationBelongsTo<MODELSelf, MODEL, AUTOLOAD> {
  return { type: 'belongsTo', model: classModel, key, options };
}

export function hasMany<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>,
): IModelRelationHasMany<MODEL, AUTOLOAD> {
  options = options ?? {};
  return { type: 'hasMany', model: classModel, key, ...options };
}

export function belongsToMany<MODELMiddle extends BeanModelMeta, MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  classModelMiddle: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  keyFrom: keyof MODELMiddle[TypeSymbolKeyEntity],
  keyTo: keyof MODELMiddle[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsMany<MODEL, AUTOLOAD>,
): IModelRelationBelongsToMany<MODELMiddle, MODEL, AUTOLOAD> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relation = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
