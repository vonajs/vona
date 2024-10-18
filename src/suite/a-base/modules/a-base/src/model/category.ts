import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityCategory } from '../entity/category.js';

@Model({
  table: 'aCategory',
  options: {
    disableDeleted: false,
  },
})
export class ModelCategory extends BeanModelBase<EntityCategory> {}
