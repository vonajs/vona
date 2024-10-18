import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityStatus } from '../entity/status.js';

@Model({
  table: 'aStatus',
  options: {
    disableDeleted: true,
  },
})
export class ModelStatus extends BeanModelBase<EntityStatus> {}
