import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUserRoleIncRef } from '../entity/userRoleIncRef.js';

@Model({ entity: EntityUserRoleIncRef, disableDeleted: true })
export class ModelUserRoleIncRef extends BeanModelBase<EntityUserRoleIncRef> {}
