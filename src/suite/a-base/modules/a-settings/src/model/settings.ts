import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aSettings', options: { disableDeleted: true } })
export class ModelSettings extends BeanModelBase {}
