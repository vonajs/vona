import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserOnline } from '../entity/userOnline.js';

@Model({ entity: EntityUserOnline, disableDeleted: false })
export class ModelUserOnline extends BeanModelBase<EntityUserOnline> {}
