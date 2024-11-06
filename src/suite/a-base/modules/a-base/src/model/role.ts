import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityRole } from '../entity/role.js';

@Model({ entity: EntityRole, disableDeleted: true })
export class ModelRole extends BeanModelBase<EntityRole> {}
