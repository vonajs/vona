import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityRoleFieldsRight } from '../entity/roleFieldsRight.js';

@Model({ table: 'aRoleFieldsRight', options: { disableDeleted: true } })
export class ModelRoleFieldsRight extends BeanModelBase<EntityRoleFieldsRight> {}
