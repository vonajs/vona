import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityStats } from '../entity/stats.js';

@Model({
  table: 'aStats',
  options: {
    disableDeleted: true,
  },
})
export class ModelStats extends BeanModelBase<EntityStats> {}
