import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationBelongsTo, IModelRelationHasOne } from '../types/relations.ts';

export function hasOne<MODEL extends BeanModelMeta>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL['$entityMeta'],
): IModelRelationHasOne {
  return { type: 'hasOne', model: classModel, key } as any;
}

export function belongsTo<MODELSelf extends BeanModelMeta, MODEL extends BeanModelMeta = BeanModelMeta>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf['$entityMeta'],
): IModelRelationBelongsTo {
  return { type: 'belongsTo', model: classModel, key } as any;
}

export const $relation = {
  hasOne,
  belongsTo,
};
