import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityStats } from '../entity/stats.js';

@Model({
  table: 'aStats',
  disableDeleted: true,
})
export class ModelStats extends BeanModelBase<EntityStats> {}
