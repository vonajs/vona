import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityDashboardUser } from '../entity/dashboardUser.js';

@Model({ entity: EntityDashboardUser, disableDeleted: false })
export class ModelDashboardUser extends BeanModelBase<EntityDashboardUser> {}
