import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDashboardUser } from '../entity/dashboardUser.js';

@Model({ table: 'aDashboardUser', disableDeleted: false })
export class ModelDashboardUser extends BeanModelBase<EntityDashboardUser> {}
