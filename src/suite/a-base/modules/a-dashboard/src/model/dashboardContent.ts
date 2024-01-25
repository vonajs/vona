import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aDashboardContent', options: { disableDeleted: false } })
export class ModelDashboardContent extends BeanModelBase {}
