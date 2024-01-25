import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aAuthProvider', options: { disableDeleted: true } })
export class ModelAuthProvider extends BeanModelBase {}
