import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityTest } from '../entity/test.ts';

@Model({ entity: EntityTest, clientName: '_pg_' as any })
export class ModelTest extends BeanModelBase<EntityTest> {}
