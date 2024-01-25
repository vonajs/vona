import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aCmsContent', options: { disableDeleted: false } })
export class ModelContent extends BeanModelBase {}
