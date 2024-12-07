import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserOnline } from '../entity/userOnline.js';

@Model({
  entity: EntityUserOnline,
  disableDeleted: false,
  cacheOptions: {
    preset: 'all',
    mem: {
      ttl: 10 * 60 * 1000, // 10 minutes
    },
    redis: {
      ttl: 10 * 60 * 1000, // 10 minutes
    },
  },
})
export class ModelUserOnline extends BeanModelBase<EntityUserOnline> {}
