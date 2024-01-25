import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aAppContent', options: { disableDeleted: false } })
export class ModelAppContent extends BeanModelBase {}
