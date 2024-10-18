import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserOnlineHistory } from '../entity/userOnlineHistory.js';

@Model({ table: 'aUserOnlineHistory', options: { disableDeleted: false } })
export class ModelUserOnlineHistory extends BeanModelBase<EntityUserOnlineHistory> {}
