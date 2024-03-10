import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityDashboardFull } from '../entity/dashboardFull.js';

@Model({ table: 'aDashboardViewFull', options: { disableDeleted: false } })
export class ModelDashboardFull extends BeanModelBase<EntityDashboardFull> {}
