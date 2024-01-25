import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aUserOnlineHistory', options: { disableDeleted: false } })
export class ModelUserOnlineHistory extends BeanModelBase {}
