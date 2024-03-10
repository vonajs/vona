import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityDashboard } from '../entity/dashboard.js';

@Model({ table: 'aDashboard', options: { disableDeleted: false } })
export class ModelDashboard extends BeanModelBase<EntityDashboard> {}
