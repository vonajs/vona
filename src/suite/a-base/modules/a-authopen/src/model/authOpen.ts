import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAuthOpen } from '../entity/authOpen.js';

@Model({ entity: EntityAuthOpen, disableDeleted: false })
export class ModelAuthOpen extends BeanModelBase<EntityAuthOpen> {}
