import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aFile', options: { disableDeleted: false } })
export class ModelFile extends BeanModelBase {}
