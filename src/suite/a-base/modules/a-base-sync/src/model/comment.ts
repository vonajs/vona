import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aComment', options: { disableDeleted: false } })
export class ModelComment extends BeanModelBase {}
