import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aShare', options: { disableDeleted: false } })
export class ModelShare extends BeanModelBase {}
