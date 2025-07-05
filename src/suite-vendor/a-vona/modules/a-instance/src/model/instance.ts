import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityInstance } from '../entity/instance.ts';

export interface IModelOptionsInstance extends IDecoratorModelOptions {}

@Model<IModelOptionsInstance>({ entity: EntityInstance, disableDeleted: false, disableInstance: true, cacheOptions: { preset: 'allWithIgnoreNull' } })
export class ModelInstance extends BeanModelBase<EntityInstance> {}
