import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserRole } from '../entity/userRole.js';

@Model({ table: 'aUserRole', disableDeleted: true })
export class ModelUserRole extends BeanModelBase<EntityUserRole> {}
