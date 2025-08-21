import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityInstance } from '../entity/instance.ts';

export interface IModelOptionsInstance extends IDecoratorModelOptions<EntityInstance> {}

@Model<IModelOptionsInstance>({
  entity: EntityInstance,
  disableDeleted: false,
  disableInstance: true,
  cache: {
    entity: {
      preset: 'allWithIgnoreNull',
      mem: {
        disableInstance: true,
      },
      redis: {
        disableInstance: true,
      },
    },
    query: {
      preset: 'allWithIgnoreNull',
      mem: {
        disableInstance: true,
      },
      redis: {
        disableInstance: true,
      },
    },
  },
})
export class ModelInstance extends BeanModelBase<EntityInstance> {}
