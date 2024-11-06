import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityLayoutFull } from '../entity/layoutFull.js';

@Model({ entity: EntityLayoutFull, disableDeleted: false })
export class ModelLayoutFull extends BeanModelBase<EntityLayoutFull> {}
