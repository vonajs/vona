import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityCategory } from '../entity/category.js';

@Model({ entity: EntityCategory, disableDeleted: false })
export class ModelCategory extends BeanModelBase<EntityCategory> {}
