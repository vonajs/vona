import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aDict', options: { disableDeleted: false } })
export class ModelDict extends BeanModelBase {}
