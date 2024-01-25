import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aDashboard', options: { disableDeleted: false } })
export class ModelDashboard extends BeanModelBase {}
