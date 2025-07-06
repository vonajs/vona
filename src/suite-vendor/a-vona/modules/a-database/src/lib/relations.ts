import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationBelongsTo, IModelRelationBelongsToOptions, IModelRelationHasOne, IModelRelationHasOneOptions } from '../types/relations.ts';

export function hasOne<MODEL extends BeanModelMeta>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL['$entity'],
  options?: IModelRelationHasOneOptions<MODEL>,
): IModelRelationHasOne {
  return { type: 'hasOne', model: classModel, key, options } as any;
}

export function belongsTo<MODELSelf extends BeanModelMeta, MODEL extends BeanModelMeta = BeanModelMeta>(
  _classModelSelf: (() => Constructable<MODELSelf>) | Constructable<MODELSelf>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf['$entity'],
  options?: IModelRelationBelongsToOptions<MODEL>,
): IModelRelationBelongsTo {
  return { type: 'belongsTo', model: classModel, key, options } as any;
}

export function hasMany<MODEL extends BeanModelMeta>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL['$entity'],
  options?: IModelRelationHasManyOptions<MODEL>,
): IModelRelationHasMany {
  options = options ?? {};
  return { type: 'hasMany', model: classModel, key, ...options } as any;
}

export const $relation = {
  hasOne,
  belongsTo,
};
