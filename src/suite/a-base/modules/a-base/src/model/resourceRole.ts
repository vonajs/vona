import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityResourceRole } from '../entity/resourceRole.js';

@Model({ entity: EntityResourceRole, disableDeleted: true })
export class ModelResourceRole extends BeanModelBase<EntityResourceRole> {}
