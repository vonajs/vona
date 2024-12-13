import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityMessageSync } from '../entity/messageSync.js';

@Model({ entity: EntityMessageSync, disableDeleted: false })
export class ModelMessageSync extends BeanModelBase<EntityMessageSync> {}
