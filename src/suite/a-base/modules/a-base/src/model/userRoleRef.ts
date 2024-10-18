import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserRoleRef } from '../entity/userRoleRef.js';

@Model({ table: 'aUserRoleRef', options: { disableDeleted: true } })
export class ModelUserRoleRef extends BeanModelBase<EntityUserRoleRef> {}
