import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityCategory } from '../entity/category.js';

@Model({
  table: 'aCategory',
  disableDeleted: false,
})
export class ModelCategory extends BeanModelBase<EntityCategory> {}
