import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityDashboardUser } from '../entity/dashboardUser.js';

@Model({ table: 'aDashboardUser', options: { disableDeleted: false } })
export class ModelDashboardUser extends BeanModelBase<EntityDashboardUser> {}
