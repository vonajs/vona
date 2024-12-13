import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRoleIncRef } from '../entity/roleIncRef.js';

@Model({ entity: EntityRoleIncRef, disableDeleted: true })
export class ModelRoleIncRef extends BeanModelBase<EntityRoleIncRef> {}
