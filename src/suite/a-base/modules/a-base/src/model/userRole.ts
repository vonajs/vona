import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserRole } from '../entity/userRole.js';

@Model({ entity: EntityUserRole, disableDeleted: true })
export class ModelUserRole extends BeanModelBase<EntityUserRole> {}
