import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aTagRef', options: { disableDeleted: true } })
export class ModelTagRef extends BeanModelBase {}
