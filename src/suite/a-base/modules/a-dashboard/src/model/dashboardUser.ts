import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aDashboardUser', options: { disableDeleted: false } })
export class ModelDashboardUser extends BeanModelBase {}
