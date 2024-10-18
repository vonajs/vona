import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityUserRoleIncRef } from '../entity/userRoleIncRef.js';

@Model({ table: 'aUserRoleIncRef', options: { disableDeleted: true } })
export class ModelUserRoleIncRef extends BeanModelBase<EntityUserRoleIncRef> {}
