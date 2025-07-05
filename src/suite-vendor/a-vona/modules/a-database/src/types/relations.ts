import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';

export type TypeModelRelationType = 'hasOne' | 'BelongsTo' | 'hasMany' | 'BelongsToMany';
export type TypeModelRelations<RelationNames extends string = never> = {
  [key in ((RelationNames extends string ? RelationNames : never))]?: TypeModelRelation;
};

export type TypeModelRelation<MODEL extends BeanModelMeta = BeanModelMeta> = IModelRelationHasOne<MODEL> & {};

export interface IModelRelationHasOne<MODEL extends BeanModelMeta = BeanModelMeta> {
  type: 'hasOne';
  model: (() => Constructable<MODEL>) | Constructable<MODEL>;
  key: keyof MODEL['$entityMeta'];
}
