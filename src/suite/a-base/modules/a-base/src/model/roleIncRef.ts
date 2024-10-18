import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityRoleIncRef } from '../entity/roleIncRef.js';

@Model({ table: 'aRoleIncRef', options: { disableDeleted: true } })
export class ModelRoleIncRef extends BeanModelBase<EntityRoleIncRef> {}
