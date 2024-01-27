import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aUserAgent', options: { disableDeleted: true } })
export class ModelUserAgent extends BeanModelBase {}
