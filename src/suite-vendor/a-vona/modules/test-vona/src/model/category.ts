import type { IDecoratorModelOptions, IModelRelationHasMany } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityCategory } from '../entity/category.ts';

export interface IModelOptionsCategory extends IDecoratorModelOptions {
  relations: {
    children: IModelRelationHasMany<ModelCategory, true>;
  };
}

@Model<IModelOptionsCategory>({
  entity: EntityCategory,
  relations: {
    children: $relation.hasMany(() => ModelCategory, 'categoryIdParent', { autoload: true, columns: ['id', 'name'] }),
  },
})
export class ModelCategory extends BeanModelBase<EntityCategory> {}
