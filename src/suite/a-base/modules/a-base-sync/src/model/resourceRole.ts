import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aResourceRole', options: { disableDeleted: true } })
export class ModelResourceRole extends BeanModelBase {}
