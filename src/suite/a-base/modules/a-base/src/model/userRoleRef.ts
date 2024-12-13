import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUserRoleRef } from '../entity/userRoleRef.js';

@Model({ entity: EntityUserRoleRef, disableDeleted: true })
export class ModelUserRoleRef extends BeanModelBase<EntityUserRoleRef> {}
