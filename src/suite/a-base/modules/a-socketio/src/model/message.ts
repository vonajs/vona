import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aSocketIOMessage', options: { disableDeleted: false } })
export class ModelMessage extends BeanModelBase {}
