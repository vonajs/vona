import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aDetailBase', options: { disableDeleted: false } })
export class ModelDetailBase extends BeanModelBase {}
