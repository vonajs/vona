import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAppFull } from '../entity/appFull.js';

@Model({ entity: EntityAppFull, disableDeleted: false })
export class ModelAppFull extends BeanModelBase<EntityAppFull> {}
