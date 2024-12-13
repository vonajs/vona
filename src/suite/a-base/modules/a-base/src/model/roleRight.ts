import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRoleRight } from '../entity/roleRight.js';

@Model({ entity: EntityRoleRight, disableDeleted: true })
export class ModelRoleRight extends BeanModelBase<EntityRoleRight> {}
