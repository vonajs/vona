import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aAuthSimple', options: { disableDeleted: true } })
export class ModelAuthSimple extends BeanModelBase {}
