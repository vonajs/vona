import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityResourceRole } from '../entity/resourceRole.js';

@Model({ table: 'aResourceRole', options: { disableDeleted: true } })
export class ModelResourceRole extends BeanModelBase<EntityResourceRole> {}
