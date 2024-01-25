import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aSocketIOMessageSync', options: { disableDeleted: false } })
export class ModelMessageSync extends BeanModelBase {}
