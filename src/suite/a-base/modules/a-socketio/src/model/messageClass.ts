import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityMessageClass } from '../entity/messageClass.js';

@Model({ entity: EntityMessageClass, disableDeleted: false, cacheOptions: { preset: 'allWithIgnoreNull' } })
export class ModelMessageClass extends BeanModelBase<EntityMessageClass> {}
