import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDashboardFull } from '../entity/dashboardFull.js';

@Model({ table: 'aDashboardViewFull', options: { disableDeleted: false } })
export class ModelDashboardFull extends BeanModelBase<EntityDashboardFull> {}
