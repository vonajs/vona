import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityDashboardFull } from '../entity/dashboardFull.js';

@Model({ entity: EntityDashboardFull, disableDeleted: false })
export class ModelDashboardFull extends BeanModelBase<EntityDashboardFull> {}
