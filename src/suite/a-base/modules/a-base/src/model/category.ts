import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityCategory } from '../entity/category.js';

@Model({ entity: EntityCategory, disableDeleted: false, cacheOptions: { preset: 'all' } })
export class ModelCategory extends BeanModelBase<EntityCategory> {}
