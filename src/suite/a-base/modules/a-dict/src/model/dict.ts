import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDict } from '../entity/dict.js';

@Model({ entity: EntityDict, disableDeleted: false })
export class ModelDict extends BeanModelBase<EntityDict> {}
