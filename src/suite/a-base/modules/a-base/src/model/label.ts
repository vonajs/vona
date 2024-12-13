import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityLabel } from '../entity/label.js';

@Model({ entity: EntityLabel, disableDeleted: true, cacheOptions: { preset: 'all' } })
export class ModelLabel extends BeanModelBase<EntityLabel> {}
