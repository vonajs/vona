import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityUserOnlineHistory } from '../entity/userOnlineHistory.js';

@Model({ table: 'aUserOnlineHistory', options: { disableDeleted: false } })
export class ModelUserOnlineHistory extends BeanModelBase<EntityUserOnlineHistory> {}
