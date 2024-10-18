import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityUserRole } from '../entity/userRole.js';

@Model({ table: 'aUserRole', options: { disableDeleted: true } })
export class ModelUserRole extends BeanModelBase<EntityUserRole> {}
