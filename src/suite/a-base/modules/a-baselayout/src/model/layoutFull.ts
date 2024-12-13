import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityLayoutFull } from '../entity/layoutFull.js';

@Model({ entity: EntityLayoutFull, disableDeleted: false })
export class ModelLayoutFull extends BeanModelBase<EntityLayoutFull> {}
