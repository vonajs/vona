import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityUserOnline } from '../entity/userOnline.js';

@Model({
  table: 'aUserOnline',
  options: {
    disableDeleted: false,
  },
})
export class ModelUserOnline extends BeanModelBase<EntityUserOnline> {}
