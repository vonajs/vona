import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityTest } from '../entity/test.ts';

@Model({ entity: EntityTest })
export class ModelTest extends BeanModelBase<EntityTest> {}
