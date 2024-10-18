import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityDashboardContent } from '../entity/dashboardContent.js';

@Model({ table: 'aDashboardContent', options: { disableDeleted: false } })
export class ModelDashboardContent extends BeanModelBase<EntityDashboardContent> {}
