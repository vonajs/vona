import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserRoleIncRef } from '../entity/userRoleIncRef.js';

@Model({ table: 'aUserRoleIncRef', options: { disableDeleted: true } })
export class ModelUserRoleIncRef extends BeanModelBase<EntityUserRoleIncRef> {}
