import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRoleRightRef } from '../entity/roleRightRef.js';

@Model({ entity: EntityRoleRightRef, disableDeleted: true })
export class ModelRoleRightRef extends BeanModelBase<EntityRoleRightRef> {}
