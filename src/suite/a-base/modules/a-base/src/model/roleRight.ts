import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityRoleRight } from '../entity/roleRight.js';

@Model({ table: 'aRoleRight', disableDeleted: true })
export class ModelRoleRight extends BeanModelBase<EntityRoleRight> {}
