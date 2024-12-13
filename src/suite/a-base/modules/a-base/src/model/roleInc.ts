import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRoleInc } from '../entity/roleInc.js';

@Model({ entity: EntityRoleInc, disableDeleted: true })
export class ModelRoleInc extends BeanModelBase<EntityRoleInc> {}
