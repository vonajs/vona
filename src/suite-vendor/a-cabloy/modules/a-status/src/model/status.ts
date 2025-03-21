import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityStatus } from '../entity/status.ts';

@Model({ entity: EntityStatus, disableDeleted: true, cacheOptions: { preset: 'allWithIgnoreNull' } })
export class ModelStatus extends BeanModelBase<EntityStatus> {}
