import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aAppViewFull', options: { disableDeleted: false } })
export class ModelAppFull extends BeanModelBase {}
