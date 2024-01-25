import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aAuth', options: { disableDeleted: true } })
export class ModelAuth extends BeanModelBase {}
