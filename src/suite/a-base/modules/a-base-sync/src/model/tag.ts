import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aTag', options: { disableDeleted: false } })
export class ModelTag extends BeanModelBase {}
