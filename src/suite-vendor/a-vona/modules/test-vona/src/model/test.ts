import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityTest } from '../entity/test.ts';

export interface IModelOptionsTest extends IDecoratorModelOptions {}

@Model<IModelOptionsTest>({ entity: EntityTest, clientName: 'default' })
export class ModelTest extends BeanModelBase<EntityTest> {}
