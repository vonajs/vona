import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAuthOpen } from '../entity/authOpen.js';

@Model({ entity: EntityAuthOpen, disableDeleted: false })
export class ModelAuthOpen extends BeanModelBase<EntityAuthOpen> {}
