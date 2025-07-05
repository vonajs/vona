import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationHasOne } from '../types/relations.ts';

export function hasOne<MODEL extends BeanModelMeta>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL['$entityMeta'],
): IModelRelationHasOne<MODEL> {
  return { type: 'hasOne', model: classModel, key };
}

// function _prepareClassModel<T>(classModel: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
//   return classModel.name ? classModel as Constructable<T> : cast(classModel)();

export const $relation = {
  hasOne,
};
