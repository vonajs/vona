import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDashboard } from '../entity/dashboard.js';

@Model({ table: 'aDashboard', disableDeleted: false })
export class ModelDashboard extends BeanModelBase<EntityDashboard> {}
