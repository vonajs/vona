import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityStats } from '../entity/stats.js';

@Model({ entity: EntityStats, disableDeleted: true })
export class ModelStats extends BeanModelBase<EntityStats> {}
