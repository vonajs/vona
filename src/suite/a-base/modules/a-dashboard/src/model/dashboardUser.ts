import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDashboardUser } from '../entity/dashboardUser.js';

@Model({ table: 'aDashboardUser', options: { disableDeleted: false } })
export class ModelDashboardUser extends BeanModelBase<EntityDashboardUser> {}
