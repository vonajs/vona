import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityResourceRole } from '../entity/resourceRole.js';

@Model({ table: 'aResourceRole', disableDeleted: true })
export class ModelResourceRole extends BeanModelBase<EntityResourceRole> {}
