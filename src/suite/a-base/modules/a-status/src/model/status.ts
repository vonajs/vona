import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityStatus } from '../entity/status.js';

@Model({ entity: EntityStatus, disableDeleted: true })
export class ModelStatus extends BeanModelBase<EntityStatus> {}
