import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityRoleRightRef } from '../entity/roleRightRef.js';

@Model({ table: 'aRoleRightRef', options: { disableDeleted: true } })
export class ModelRoleRightRef extends BeanModelBase<EntityRoleRightRef> {}
