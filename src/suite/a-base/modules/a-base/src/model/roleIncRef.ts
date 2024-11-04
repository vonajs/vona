import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityRoleIncRef } from '../entity/roleIncRef.js';

@Model({ table: 'aRoleIncRef', disableDeleted: true })
export class ModelRoleIncRef extends BeanModelBase<EntityRoleIncRef> {}
