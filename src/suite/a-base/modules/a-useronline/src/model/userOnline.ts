import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserOnline } from '../entity/userOnline.js';

@Model({
  table: 'aUserOnline',
  disableDeleted: false,
})
export class ModelUserOnline extends BeanModelBase<EntityUserOnline> {}
