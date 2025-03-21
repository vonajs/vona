import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityInstance } from '../entity/instance.ts';

@Model({ entity: EntityInstance, disableDeleted: false, disableInstance: true, cacheOptions: { preset: 'allWithIgnoreNull' } })
export class ModelInstance extends BeanModelBase<EntityInstance> {}
