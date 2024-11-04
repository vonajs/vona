import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityMessageSync } from '../entity/messageSync.js';

@Model({ table: 'aSocketIOMessageSync', disableDeleted: false })
export class ModelMessageSync extends BeanModelBase<EntityMessageSync> {}
