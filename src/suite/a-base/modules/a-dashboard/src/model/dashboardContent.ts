import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDashboardContent } from '../entity/dashboardContent.js';

@Model({ entity: EntityDashboardContent, disableDeleted: false })
export class ModelDashboardContent extends BeanModelBase<EntityDashboardContent> {}
