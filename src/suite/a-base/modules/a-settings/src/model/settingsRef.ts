import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aSettingsRef', options: { disableDeleted: true } })
export class ModelSettingsRef extends BeanModelBase {}
