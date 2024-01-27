import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aResource', options: { disableDeleted: false } })
export class ModelResource extends BeanModelBase {}
