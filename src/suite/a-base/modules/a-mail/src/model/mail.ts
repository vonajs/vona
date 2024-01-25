import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aMail', options: { disableDeleted: false } })
export class ModelMail extends BeanModelBase {}
