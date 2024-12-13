import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityDashboardContent } from '../entity/dashboardContent.js';

@Model({ entity: EntityDashboardContent, disableDeleted: false })
export class ModelDashboardContent extends BeanModelBase<EntityDashboardContent> {}
