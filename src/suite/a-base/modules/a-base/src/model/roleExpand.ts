import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityRoleExpand } from '../entity/roleExpand.js';

@Model({ table: 'aRoleExpand', disableDeleted: true })
export class ModelRoleExpand extends BeanModelBase<EntityRoleExpand> {}
