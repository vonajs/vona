import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUserOnlineHistory } from '../entity/userOnlineHistory.js';

@Model({ entity: EntityUserOnlineHistory, disableDeleted: false })
export class ModelUserOnlineHistory extends BeanModelBase<EntityUserOnlineHistory> {}
