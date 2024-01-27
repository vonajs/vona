import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aUserRole', options: { disableDeleted: true } })
export class ModelUserRole extends BeanModelBase {}
