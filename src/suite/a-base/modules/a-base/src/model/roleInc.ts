import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityRoleInc } from '../entity/roleInc.js';

@Model({ table: 'aRoleInc', options: { disableDeleted: true } })
export class ModelRoleInc extends BeanModelBase<EntityRoleInc> {}
